/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Shield, Menu, X, MessageSquare, PhoneCall } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab,
  isAdmin,
  onOpenLogin,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "inicio", label: "Inicio" },
    { id: "servicios", label: "Servicios" },
    { id: "equipo", label: "Equipo de trabajo" },
    { id: "galeria", label: "Galería" },
    { id: "solicitar", label: "Solicitar servicio" },
    ...(isAdmin ? [{ id: "solicitudes", label: "Solicitudes" }] : []),
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top of page when changing tabs
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-bg/85 backdrop-blur-md border-b border-brand-border px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleTabClick("inicio")} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-brand-accent to-brand-accent2 flex items-center justify-center text-brand-bg font-bold shadow-lg shadow-brand-accent/20 transition-transform duration-300 group-hover:scale-105">
            <Shield className="w-5 h-5 text-[#021410]" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-brand-text">
            Tecno<span className="text-brand-accent">versa</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer rounded-md ${
                  isActive ? "text-brand-accent" : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent rounded-full animate-pulse-slow" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Contact CTA & Status Badge */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent shadow-[0_0_8px_var(--color-brand-accent)]"></span>
            </span>
            SOC OPERACIONAL
          </div>

          {isAdmin ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-brand-bg text-xs font-bold rounded-lg border border-red-500/20 transition-all duration-200 cursor-pointer"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 px-3 py-1.5 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-brand-bg text-xs font-bold rounded-lg border border-brand-accent/20 transition-all duration-200 cursor-pointer"
            >
              Login Admin
            </button>
          )}

          <a
            href="https://wa.me/573003509169?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Tecnoversa%20SOC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold rounded-full border border-emerald-500/20 transition-all duration-200"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            +57 3003509169
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-brand-muted hover:text-brand-text cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-bg/95 border-b border-brand-border px-6 py-4 flex flex-col gap-3 backdrop-blur-lg animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive 
                    ? "bg-brand-panel text-brand-accent border-l-2 border-brand-accent" 
                    : "text-brand-muted hover:bg-brand-panel hover:text-brand-text"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-brand-border mt-2 flex flex-col gap-2">
            {isAdmin ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-brand-bg font-bold rounded-lg border border-red-500/20 transition-colors cursor-pointer text-sm"
              >
                Cerrar Sesión Admin
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent hover:text-brand-bg font-bold rounded-lg border border-brand-accent/20 transition-colors cursor-pointer text-sm"
              >
                Login Admin
              </button>
            )}

            <a
              href="https://wa.me/573003509169?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Tecnoversa%20SOC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-brand-bg hover:bg-emerald-400 font-bold rounded-lg transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4 text-brand-bg" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
