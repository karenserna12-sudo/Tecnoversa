/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Shield, Activity, Phone, ArrowUp } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Team from "./components/Team";
import GalleryCarousel from "./components/GalleryCarousel";
import RequestForm from "./components/RequestForm";

export default function App() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [preselectedService, setPreselectedService] = useState("");
  const [prefilledMessage, setPrefilledMessage] = useState("");

  const handleSelectService = (serviceName: string, actionType: "cotizar" | "solicitar") => {
    setPreselectedService(serviceName);
    if (actionType === "cotizar") {
      setPrefilledMessage(`Hola, me interesa cotizar el servicio de: ${serviceName}. Por favor, compártanme los detalles.`);
    } else {
      setPrefilledMessage(`Hola, quiero contratar el servicio de: ${serviceName}. ¿Cuáles son los siguientes pasos?`);
    }
    setActiveTab("solicitar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearPrefilled = () => {
    setPreselectedService("");
    setPrefilledMessage("");
  };

  const handleGoToRequest = () => {
    setActiveTab("solicitar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // WhatsApp configuration
  const whatsappUrl = "https://wa.me/573003509169?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Tecnoversa%20SOC";

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between text-brand-text relative selection:bg-brand-accent selection:text-brand-bg">
      
      {/* Glow ambient background elements */}
      <div className="fixed top-20 left-10 w-96 h-96 rounded-full bg-brand-accent/5 filter blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-brand-accent2/5 filter blur-3xl pointer-events-none -z-10" />

      <div>
        {/* Navigation Glass Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content Display Stage */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "inicio" && (
              <motion.div
                key="inicio"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Hero onSolicitar={handleGoToRequest} />
              </motion.div>
            )}

            {activeTab === "servicios" && (
              <motion.div
                key="servicios"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Services onSelectService={handleSelectService} />
              </motion.div>
            )}

            {activeTab === "equipo" && (
              <motion.div
                key="equipo"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <Team />
              </motion.div>
            )}

            {activeTab === "galeria" && (
              <motion.div
                key="galeria"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryCarousel />
              </motion.div>
            )}

            {activeTab === "solicitar" && (
              <motion.div
                key="solicitar"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <RequestForm
                  preselectedService={preselectedService}
                  prefilledMessage={prefilledMessage}
                  onClearPrefilled={handleClearPrefilled}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating WhatsApp Bubble */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-brand-bg hover:text-white p-4 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center cursor-pointer group"
        title="Chat de WhatsApp Soporte 24/7"
      >
        <span className="absolute right-full mr-3 px-3 py-1 bg-brand-panel text-brand-text border border-brand-border text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          ¿En qué podemos ayudarte?
        </span>
        <MessageSquare className="w-6 h-6 text-[#021410] group-hover:text-brand-bg transition-colors" />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse-slow" />
      </motion.a>

      {/* Footer Area */}
      <footer className="bg-brand-panel/40 border-t border-brand-border/60 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Col 1: Brand details */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-accent to-brand-accent2 flex items-center justify-center text-brand-bg font-bold">
                <Shield className="w-4 h-4 text-[#021410]" />
              </div>
              <span className="font-display font-bold text-lg text-brand-text">
                Tecno<span className="text-brand-accent">versa</span>
              </span>
            </div>
            <p className="text-xs text-brand-muted max-w-xs">
              Detección, análisis y respuesta en tiempo real. Protegiendo tu infraestructura crítica 24/7.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex justify-center gap-6 text-xs text-brand-muted font-medium">
            <button onClick={() => setActiveTab("inicio")} className="hover:text-brand-accent cursor-pointer">Inicio</button>
            <button onClick={() => setActiveTab("servicios")} className="hover:text-brand-accent cursor-pointer">Servicios</button>
            <button onClick={() => setActiveTab("equipo")} className="hover:text-brand-accent cursor-pointer">Equipo</button>
            <button onClick={() => setActiveTab("galeria")} className="hover:text-brand-accent cursor-pointer">Galería</button>
            <button onClick={() => setActiveTab("solicitar")} className="hover:text-brand-accent cursor-pointer">Contacto</button>
          </div>

          {/* Col 3: Copyright info */}
          <div className="flex flex-col items-center md:items-end space-y-1 text-xs text-brand-muted">
            <span>© 2026 Tecnoversa. Todos los derechos reservados.</span>
            <span className="font-mono text-[10px]">VERSIÓN 2.4.0 — PROTOTIPO DE PRODUCCIÓN</span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
