/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Search, BarChart3, ShieldAlert, Award, Shield, Settings, Zap, ArrowRight } from "lucide-react";
import { SERVICES } from "../data";
import { Service } from "../types";

interface ServicesProps {
  onSelectService: (serviceName: string, actionType: "cotizar" | "solicitar") => void;
}

// Map the custom emojis to high quality React icons for a professional touch
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "🔍": Search,
  "📊": BarChart3,
  "🚨": ShieldAlert,
  "🧪": Award, // Ethical Hacker theme
  "🚑": Shield, // Incident Response
  "⚙️": Settings,
};

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section className="bg-brand-bg px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          Servicios Especializados del SOC
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-text">
          Nuestros servicios de seguridad
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto text-sm md:text-base">
          Ofrecemos soluciones avanzadas de monitoreo, detección y mitigación de incidentes, diseñadas para blindar tu infraestructura contra cualquier vector de ataque.
        </p>
      </div>

      {/* Bento Grid structure */}
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 md:gap-8">
        {SERVICES.map((service: Service, index: number) => {
          const IconComponent = iconMap[service.icon] || Search;

          let gridClasses = "md:col-span-3 lg:col-span-4";
          if (index === 0) {
            gridClasses = "md:col-span-3 lg:col-span-8";
          } else if (index === 5) {
            gridClasses = "md:col-span-6 lg:col-span-12 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-12";
          }

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-brand-panel border border-brand-border hover:border-brand-accent/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-lg shadow-black/20 hover:shadow-brand-accent/5 hover:translate-y-[-4px] transition-all duration-300 ${gridClasses}`}
            >
              <div className={index === 5 ? "lg:flex-1 text-left" : "text-left"}>
                {/* Glowing Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-bg group-hover:shadow-lg group-hover:shadow-brand-accent/30 transition-all duration-300 mb-6">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Service Tag */}
                <span className="text-[10px] font-mono text-brand-accent uppercase tracking-wider font-semibold block mb-2">
                  {service.category}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-lg md:text-2xl text-brand-text mb-3 group-hover:text-brand-accent transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-brand-muted text-sm leading-relaxed mb-6 lg:mb-0 max-w-3xl">
                  {service.description}
                </p>
              </div>

              {/* Actions Footer */}
              <div className={`flex items-center gap-3 pt-4 border-t border-brand-border/60 w-full ${index === 5 ? "lg:border-t-0 lg:pt-0 lg:w-72 shrink-0" : ""}`}>
                <button
                  onClick={() => onSelectService(service.name, "cotizar")}
                  className="flex-1 py-2.5 px-4 bg-brand-panel hover:bg-brand-border border border-brand-border hover:border-brand-muted/40 text-brand-text hover:text-brand-accent text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer text-center"
                >
                  Cotizar
                </button>
                <button
                  onClick={() => onSelectService(service.name, "solicitar")}
                  className="flex-1 py-2.5 px-4 bg-brand-accent/10 hover:bg-brand-accent hover:text-brand-bg border border-brand-accent/20 hover:border-transparent text-brand-accent text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Solicitar
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
