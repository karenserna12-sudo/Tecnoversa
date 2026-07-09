/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Lock, User, AlertCircle, ShieldAlert, KeyRound } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Por favor complete todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLoginSuccess(data.token);
        setUsername("");
        setPassword("");
        onClose();
      } else {
        setError(data.message || "Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión con el servidor. Reintente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-brand-panel/95 border border-brand-border rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Ambient decorative glow */}
            <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-brand-accent/10 filter blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-brand-accent2/10 filter blur-xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-text p-1.5 hover:bg-brand-bg rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-brand-accent to-brand-accent2 flex items-center justify-center text-brand-bg font-bold mx-auto mb-4 shadow-lg shadow-brand-accent/20">
                <KeyRound className="w-6 h-6 text-[#021410]" />
              </div>
              <h3 className="font-display font-bold text-xl text-brand-text">
                Acceso Administrativo
              </h3>
              <p className="text-brand-muted text-xs mt-1">
                Ingrese sus credenciales de administrador de Tecnoversa SOC
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username Input */}
              <div className="flex flex-col space-y-1.5 text-left">
                <label className="text-xs font-semibold text-brand-muted">Usuario</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-muted/50">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(null);
                    }}
                    placeholder="Usuario administrador"
                    className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl pl-10 pr-4 py-3 text-sm text-brand-text outline-hidden transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col space-y-1.5 text-left">
                <label className="text-xs font-semibold text-brand-muted">Contraseña</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-muted/50">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    placeholder="••••••••••••"
                    className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl pl-10 pr-4 py-3 text-sm text-brand-text outline-hidden transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Security Banner Info */}
              <div className="p-3 bg-brand-bg/60 border border-brand-border rounded-xl flex items-center gap-2 text-brand-muted text-[10px] uppercase font-mono">
                <ShieldAlert className="w-4 h-4 text-brand-accent shrink-0 animate-pulse-slow" />
                <span>Solo personal SOC autorizado. Se registran las IPs.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 mt-2 py-3 bg-linear-to-r from-brand-accent to-brand-accent2 text-[#021410] font-bold text-sm rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-55"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-brand-bg border-t-transparent animate-spin" />
                    Autenticando...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
