/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, PhoneCall, AlertCircle, CheckCircle2, Copy, Sparkles, SendToBack } from "lucide-react";
import { ServiceRequest } from "../types";

interface RequestFormProps {
  preselectedService: string;
  prefilledMessage: string;
  onClearPrefilled: () => void;
}

export default function RequestForm({
  preselectedService,
  prefilledMessage,
  onClearPrefilled,
}: RequestFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  // Synchronize prefilled service intent from other components
  useEffect(() => {
    if (preselectedService || prefilledMessage) {
      setFormData((prev) => ({
        ...prev,
        service: preselectedService || prev.service,
        message: prefilledMessage || prev.message,
      }));
      // Clear parent memory so they don't overwrite manual edits on re-render
      onClearPrefilled();
    }
  }, [preselectedService, prefilledMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.fullName.trim()) return setError("El nombre completo es obligatorio.");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) return setError("Por favor, introduce un correo electrónico válido.");
    if (!formData.phone.trim()) return setError("El número de teléfono es obligatorio.");
    if (!formData.service) return setError("Por favor, selecciona un servicio de interés.");
    if (!formData.message.trim()) return setError("Por favor, déjanos un mensaje con tu consulta.");

    setLoading(true);

    try {
      const response = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(result);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setError(result.message || "Ocurrió un error al procesar tu solicitud.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("No se pudo establecer conexión con el servidor. Por favor, vuelve a intentarlo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!success) return;
    const { fullName, email, phone, service, message } = success.data;
    const textToCopy = `🧑‍💻 Solicitud Tecnoversa SOC:
Nombre: ${fullName}
Correo: ${email}
Teléfono: ${phone}
Servicio: ${service}
Detalles: ${message}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build url encoded whatsapp link
  const whatsappUrl = `https://wa.me/573003509169?text=${encodeURIComponent(
    "Hola, quiero solicitar información sobre los servicios de Tecnoversa SOC."
  )}`;

  return (
    <section className="bg-brand-bg px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 text-xs font-semibold">
          <SendToBack className="w-3.5 h-3.5" />
          Mesa de Servicio Activa
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-text">
          Solicitar servicio
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto text-sm md:text-base">
          Cuéntanos qué necesitas y un ingeniero especialista se pondrá en contacto contigo en menos de 5 minutos, o escríbenos directamente por WhatsApp.
        </p>
      </div>

      {/* Top WhatsApp Direct Banner */}
      <div className="max-w-xl mx-auto mb-10 text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-[#021410] font-bold text-base rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <PhoneCall className="w-5 h-5 animate-bounce" />
          Escribir directo por WhatsApp
        </a>
      </div>

      {/* Main Dynamic Panel */}
      <div className="max-w-xl mx-auto bg-brand-panel border border-brand-border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative visual elements */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-brand-accent/5 filter blur-xl" />
        <div className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-brand-accent2/5 filter blur-xl" />

        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              {/* Error Callout */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Nombre completo */}
              <div className="flex flex-col space-y-2 text-left">
                <label htmlFor="fullName" className="text-sm font-semibold text-brand-muted">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 outline-hidden transition-all duration-200"
                  required
                />
              </div>

              {/* Correo electrónico */}
              <div className="flex flex-col space-y-2 text-left">
                <label htmlFor="email" className="text-sm font-semibold text-brand-muted">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 outline-hidden transition-all duration-200"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="flex flex-col space-y-2 text-left">
                <label htmlFor="phone" className="text-sm font-semibold text-brand-muted">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Ej. +57 300 000 0000"
                  className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 outline-hidden transition-all duration-200"
                  required
                />
              </div>

              {/* Servicio de interés */}
              <div className="flex flex-col space-y-2 text-left">
                <label htmlFor="service" className="text-sm font-semibold text-brand-muted">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl px-4 py-3 text-sm text-brand-text outline-hidden transition-all duration-200 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Detección de intrusos (IDS)">Detección de intrusos (IDS)</option>
                  <option value="Monitoreo con Zabbix & Grafana">Monitoreo con Zabbix & Grafana</option>
                  <option value="Gestión de eventos con Wazuh (SIEM)">Gestión de eventos con Wazuh (SIEM)</option>
                  <option value="Hacking ético / Pentesting">Hacking ético / Pentesting</option>
                  <option value="Respuesta a incidentes">Respuesta a incidentes</option>
                  <option value="Hardening de infraestructura">Hardening de infraestructura</option>
                  <option value="Otro">Otro / No estoy seguro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="flex flex-col space-y-2 text-left">
                <label htmlFor="message" className="text-sm font-semibold text-brand-muted">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos brevemente qué necesitas..."
                  rows={4}
                  className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl px-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 outline-hidden resize-none transition-all duration-200"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-linear-to-r from-brand-accent to-brand-accent2 text-[#021410] font-bold text-base rounded-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-brand-bg border-t-transparent animate-spin" />
                    Enviando solicitud...
                  </span>
                ) : (
                  <>
                    Enviar solicitud
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-6 space-y-6 relative z-10"
            >
              <div className="w-16 h-16 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl md:text-2xl text-brand-text">
                  ¡Solicitud enviada con éxito!
                </h3>
                <p className="text-brand-muted text-sm max-w-md mx-auto">
                  {success.message}
                </p>
              </div>

              {/* Submitted Summary Card */}
              <div className="bg-brand-bg border border-brand-border rounded-xl p-5 text-left text-xs space-y-2 font-mono text-brand-muted">
                <div className="flex justify-between border-b border-brand-border pb-1.5 mb-1.5 text-brand-accent font-semibold text-[10px]">
                  <span>RESUMEN DE REGISTRO</span>
                  <span>{success.db === "mongodb" ? "PERSISTENTE_ATLAS" : "PERSISTENTE_LOCAL"}</span>
                </div>
                <div><span className="text-brand-text">Nombre:</span> {success.data.fullName}</div>
                <div><span className="text-brand-text">Servicio:</span> {success.data.service}</div>
                <div><span className="text-brand-text">Correo:</span> {success.data.email}</div>
                <div><span className="text-brand-text">Teléfono:</span> {success.data.phone}</div>
                <div className="pt-2 mt-2 border-t border-brand-border/40"><span className="text-brand-text">Mensaje:</span> {success.data.message}</div>
              </div>

              {/* Post-submit Options */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-3 px-4 bg-brand-panel hover:bg-brand-border border border-brand-border text-brand-text text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4 text-brand-accent" />
                  {copied ? "¡Copiado!" : "Copiar resumen"}
                </button>
                <button
                  onClick={() => setSuccess(null)}
                  className="flex-1 py-3 px-4 bg-brand-accent/10 hover:bg-brand-accent hover:text-brand-bg text-brand-accent font-bold text-sm rounded-xl border border-brand-accent/20 hover:border-transparent transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Nueva solicitud
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
