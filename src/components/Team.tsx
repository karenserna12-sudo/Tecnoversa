/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldCheck, Mail, Linkedin, Terminal } from "lucide-react";
import { TEAM } from "../data";
import { TeamMember } from "../types";

export default function Team() {
  return (
    <section className="bg-brand-bg px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Estructura del Equipo SOC
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-text">
          Nuestro equipo de trabajo
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto text-sm md:text-base">
          Profesionales certificados con amplia experiencia en cada frente de la defensa digital y el hacking ético ofensivo.
        </p>
      </div>

      {/* Responsive Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {TEAM.map((member: TeamMember, index: number) => {
          return (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-brand-panel border border-brand-border hover:border-brand-accent/30 rounded-2xl p-6 text-center flex flex-col justify-between shadow-lg hover:shadow-brand-accent/5 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                {/* Photo with fallback */}
                <div className="relative w-28 h-28 rounded-full mb-6 p-1 bg-linear-to-tr from-brand-accent to-brand-accent2 shadow-md">
                  <div className="w-full h-full rounded-full overflow-hidden border border-brand-bg bg-brand-bg flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&background=0d1b35&color=00f2ea&size=200&bold=true`;
                      }}
                    />
                  </div>
                  {/* Small badge overlay */}
                  <span className="absolute bottom-1 right-1 bg-brand-bg text-brand-accent p-1.5 rounded-full border border-brand-border shadow-xs">
                    <Terminal className="w-3 h-3" />
                  </span>
                </div>

                {/* Info */}
                <h3 className="font-display font-bold text-base md:text-lg text-brand-text group-hover:text-brand-accent transition-colors">
                  {member.name}
                </h3>
                <span className="text-xs text-brand-accent font-semibold block mt-1 px-2.5 py-0.5 bg-brand-accent/10 rounded-full border border-brand-accent/20">
                  {member.role}
                </span>

                <p className="text-brand-muted text-xs leading-relaxed mt-4 line-clamp-4">
                  {member.bio}
                </p>
              </div>

              {/* Decorative social-like footer links */}
              <div className="flex justify-center gap-3 pt-6 mt-6 border-t border-brand-border/60 text-brand-muted">
                <button 
                  className="p-1.5 hover:text-brand-accent hover:bg-brand-bg rounded-lg transition-colors cursor-pointer"
                  title="Contactar vía Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button 
                  className="p-1.5 hover:text-brand-accent2 hover:bg-brand-bg rounded-lg transition-colors cursor-pointer"
                  title="Ver perfil"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
