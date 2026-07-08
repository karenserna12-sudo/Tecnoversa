/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldCheck, Activity, Terminal, Clock, Users, ArrowRight } from "lucide-react";
import NetworkBackground from "./NetworkBackground";

interface HeroProps {
  onSolicitar: () => void;
}

export default function Hero({ onSolicitar }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-brand-bg px-6 py-12 md:py-20 border-b border-brand-border">
      {/* Interactive Cyber Particle Background */}
      <NetworkBackground />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 text-xs font-semibold uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            🛡️ Centro de Operaciones SOC 24/7
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-text leading-tight"
          >
            Tecno<span className="text-brand-accent">versa</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-brand-muted mt-2">
              Centro de Operaciones de Seguridad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-muted text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            Detección, análisis y respuesta a incidentes de seguridad en tiempo real.
            Protegemos de forma proactiva la infraestructura crítica de tu empresa contra amenazas avanzadas y emergentes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onSolicitar}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-brand-accent to-brand-accent2 text-[#021410] font-bold rounded-lg shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-base"
            >
              Solicitar evaluación
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://wa.me/573003509169?text=Hola%2C%20quiero%20solicitar%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Tecnoversa%20SOC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-panel text-brand-text hover:text-brand-accent hover:bg-brand-panel/80 font-semibold rounded-lg border border-brand-border hover:border-brand-accent/20 transition-all duration-200"
            >
              <Terminal className="w-5 h-5 text-brand-accent" />
              Escribir por WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Right Column: Premium Cyber building and terminal graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative w-full flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-brand-border bg-brand-panel/40 p-4 shadow-2xl shadow-black/60 group">
            <div className="absolute inset-0 bg-linear-to-tr from-brand-accent/5 to-brand-accent2/5 opacity-50 group-hover:opacity-80 transition-all duration-500" />
            
            {/* The Building Image requested by the user */}
            <img
              src="/img/logo_building.jpg"
              alt="Tecnoversa Headquarters"
              className="w-full h-full object-cover rounded-xl border border-brand-border/60 shadow-lg"
              onError={(e) => {
                // Beautiful fallback design if the image is still being generated or missing
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />

            {/* Glowing futuristic UI overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-brand-bg/90 border border-brand-border backdrop-blur-md rounded-xl p-4 flex flex-col gap-2 shadow-xl animate-pulse-slow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-ping" />
                  <span className="text-xs font-mono text-brand-accent font-semibold uppercase tracking-wider">
                    Sistemas Online
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-muted">SOC_ID: TV-8850</span>
              </div>
              <div className="h-1 bg-brand-border rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-linear-to-r from-brand-accent to-brand-accent2 rounded-full" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-brand-muted">
                <span>INCIDENTES AMORTIGUADOS</span>
                <span className="text-brand-accent font-bold">99.98%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Area */}
      <div className="max-w-7xl mx-auto w-full mt-12 relative z-10 pt-8 border-t border-brand-border/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "24/7", label: "Monitoreo continuo", desc: "Supervisión activa del SOC", icon: Activity },
            { value: "< 5 min", label: "Tiempo de respuesta", desc: "Contención ultrarrápida", icon: Clock },
            { value: "IDS/IPS", label: "Detección de intrusos", desc: "Filtros basados en Suricata", icon: ShieldCheck },
            { value: "SENA", label: "Equipo Certificado", desc: "Expertos en ciberseguridad", icon: Users },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="flex flex-col items-center p-4 bg-brand-panel/30 border border-brand-border/40 rounded-xl hover:border-brand-accent/20 transition-colors"
            >
              <stat.icon className="w-5 h-5 text-brand-accent mb-2" />
              <span className="font-display font-bold text-2xl md:text-3xl text-brand-accent tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-brand-text mt-1">{stat.label}</span>
              <span className="text-xs text-brand-muted mt-0.5">{stat.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
