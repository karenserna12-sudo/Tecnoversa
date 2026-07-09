/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Calendar, 
  Phone, 
  Mail, 
  Briefcase, 
  Database, 
  MessageSquare, 
  Trash2, 
  ShieldAlert, 
  ArrowUpDown,
  Download
} from "lucide-react";
import { ServiceRequest } from "../types";

interface SolicitudesProps {
  token: string;
}

export default function Solicitudes({ token }: SolicitudesProps) {
  const [solicitudes, setSolicitudes] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbType, setDbType] = useState<string>("");
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const fetchSolicitudes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/solicitudes", {
        headers: {
          "x-admin-token": token,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSolicitudes(data.data || []);
        setDbType(data.db || "local");
      } else {
        setError(data.message || "Error al cargar las solicitudes.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("No se pudo conectar con el servidor para obtener los datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, [token]);

  // Filter and Search Logic
  const filteredSolicitudes = solicitudes
    .filter((req) => {
      const matchesSearch = 
        req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesService = selectedService === "" || req.service === selectedService;
      
      return matchesSearch && matchesService;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  // Extract unique services from actual requests for filtering
  const uniqueServices = Array.from(new Set(solicitudes.map((s) => s.service)));

  // Format Date ISO helper
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="bg-brand-bg px-6 py-16 md:py-24 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-brand-border/60 pb-8">
        <div className="space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Panel de Control Privado
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-text">
            Buzón de Solicitudes
          </h2>
          <p className="text-brand-muted text-sm max-w-xl">
            Monitoreo en tiempo real de consultas y solicitudes de servicios SOC de clientes.
          </p>
        </div>

        {/* DB Status Badge & Refresh */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {dbType && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-panel border border-brand-border text-brand-muted rounded-xl text-xs font-mono">
              <Database className={`w-3.5 h-3.5 ${dbType === "mongodb" ? "text-brand-accent" : "text-brand-accent2 animate-pulse"}`} />
              <span>BD: {dbType === "mongodb" ? "MongoDB Atlas" : "JSON Local"}</span>
            </div>
          )}

          <button
            onClick={fetchSolicitudes}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-brand-panel hover:bg-brand-border border border-brand-border text-brand-text text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
            title="Refrescar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-accent" : "text-brand-accent2"}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Query Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-brand-panel border border-brand-border/60 rounded-2xl p-4 md:p-6">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-muted/50 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, correo, teléfono o mensaje..."
            className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl pl-10 pr-4 py-3 text-sm text-brand-text placeholder-brand-muted/40 outline-hidden transition-all duration-200"
          />
        </div>

        {/* Filter by Service */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-muted/50 pointer-events-none">
            <Briefcase className="w-4 h-4" />
          </span>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full bg-brand-bg border border-brand-border focus:border-brand-accent focus:ring-1 focus:ring-brand-accent rounded-xl pl-10 pr-4 py-3 text-sm text-brand-text outline-hidden cursor-pointer appearance-none"
          >
            <option value="">Todos los servicios</option>
            {uniqueServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Date */}
        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="flex items-center justify-between px-4 py-3 bg-brand-bg hover:bg-brand-border border border-brand-border text-brand-muted hover:text-brand-text text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer text-left"
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-accent" />
            Ordenar por fecha
          </span>
          <span className="flex items-center gap-1 text-xs text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded-full border border-brand-accent/20">
            {sortOrder === "desc" ? "Reciente" : "Antiguo"}
            <ArrowUpDown className="w-3 h-3" />
          </span>
        </button>
      </div>

      {/* Main List Area */}
      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center max-w-xl mx-auto space-y-3">
          <ShieldAlert className="w-10 h-10 text-red-400 mx-auto" />
          <h4 className="font-bold text-red-400 text-lg">Error de Carga</h4>
          <p className="text-brand-muted text-sm">{error}</p>
          <button
            onClick={fetchSolicitudes}
            className="mt-2 px-5 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-400 cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      )}

      {!error && loading && (
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-brand-accent border-t-transparent animate-spin mx-auto" />
          <p className="text-brand-muted text-sm font-mono animate-pulse">Obteniendo solicitudes de mesa de servicio...</p>
        </div>
      )}

      {!error && !loading && (
        <>
          <div className="flex justify-between items-center text-xs font-mono text-brand-muted mb-4 px-2">
            <span>Resultados: <strong className="text-brand-accent">{filteredSolicitudes.length}</strong> de {solicitudes.length}</span>
            <span>Mesa SOC en línea</span>
          </div>

          {filteredSolicitudes.length === 0 ? (
            <div className="bg-brand-panel border border-brand-border/60 rounded-3xl p-12 text-center text-brand-muted space-y-2">
              <MessageSquare className="w-12 h-12 text-brand-border mx-auto mb-2" />
              <h3 className="font-display font-bold text-lg text-brand-text">Sin solicitudes registradas</h3>
              <p className="text-sm max-w-md mx-auto">
                No hay solicitudes que coincidan con los filtros de búsqueda actuales.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSolicitudes.map((req, idx) => (
                  <motion.div
                    key={req.id || idx}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-brand-panel border border-brand-border hover:border-brand-accent/25 rounded-2xl p-6 text-left flex flex-col justify-between shadow-md hover:shadow-brand-accent/5 hover:scale-[1.01] transition-all duration-300 relative group"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-4 border-b border-brand-border/50 pb-4 mb-4">
                        <div className="space-y-1">
                          <h4 className="font-display font-bold text-base md:text-lg text-brand-text group-hover:text-brand-accent transition-colors">
                            {req.fullName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                            <Calendar className="w-3.5 h-3.5 text-brand-accent2 shrink-0" />
                            <span>{formatDate(req.createdAt)}</span>
                          </div>
                        </div>

                        {/* Request ID */}
                        <span className="text-[10px] font-mono bg-brand-bg px-2.5 py-1 border border-brand-border text-brand-muted rounded-md shrink-0">
                          {req.id ? req.id.substring(0, 12) : `REQ_${idx}`}
                        </span>
                      </div>

                      {/* Card Info Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-brand-muted mb-4 font-mono">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          <span className="truncate" title={req.email}>{req.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          <span>{req.phone}</span>
                        </div>
                        <div className="sm:col-span-2 flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-brand-accent2 shrink-0" />
                          <span className="text-brand-text font-semibold">{req.service}</span>
                        </div>
                      </div>

                      {/* Message Box */}
                      <div className="bg-brand-bg/60 border border-brand-border/80 rounded-xl p-4 text-xs leading-relaxed text-brand-muted relative">
                        <span className="absolute -top-2.5 left-3 bg-brand-panel border border-brand-border px-1.5 py-0.5 text-[9px] text-brand-accent font-semibold uppercase tracking-wider">
                          Mensaje del Cliente
                        </span>
                        <p className="whitespace-pre-line pt-1 text-brand-text font-sans">
                          {req.message}
                        </p>
                      </div>
                    </div>

                    {/* Quick Action Footer */}
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-brand-border/50 text-brand-muted">
                      <a
                        href={`mailto:${req.email}?subject=Tecnoversa SOC: Respuesta a su solicitud de ${req.service}`}
                        className="px-3 py-1.5 bg-brand-bg hover:bg-brand-accent hover:text-brand-bg border border-brand-border text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Responder por Email
                      </a>
                      <a
                        href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-brand-bg border border-emerald-500/20 text-emerald-400 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Contactar WhatsApp
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </section>
  );
}
