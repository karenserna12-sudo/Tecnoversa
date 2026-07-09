/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, TeamMember, GalleryImage } from "./types";

export const SERVICES: Service[] = [
  {
    id: "ids",
    name: "Detección de intrusos (IDS)",
    description: "Análisis de tráfico de red en tiempo real con Suricata para identificar actividad sospechosa, escaneos y patrones de ataque conocidos.",
    icon: "🔍",
    category: "Monitoreo & Detección",
  },
  {
    id: "zabbix_grafana",
    name: "Monitoreo con Zabbix & Grafana",
    description: "Supervisión continua de servidores, servicios y tráfico de red, con dashboards visuales y alertas automáticas ante fallas o anomalías.",
    icon: "📊",
    category: "Métricas & Visualización",
  },
  {
    id: "wazuh_siem",
    name: "Gestión de eventos con Wazuh (SIEM)",
    description: "Centralización y correlación de logs de toda tu infraestructura para detectar amenazas y cumplir normativas de seguridad.",
    icon: "🚨",
    category: "Seguridad & Cumplimiento",
  },
  {
    id: "hacking_etico",
    name: "Hacking ético / Pentesting",
    description: "Pruebas de penetración controladas para identificar vulnerabilidades reales en tus sistemas antes de que sean explotadas.",
    icon: "🧪",
    category: "Evaluación Ofensiva",
  },
  {
    id: "respuesta_incidentes",
    name: "Respuesta a incidentes",
    description: "Equipo dedicado para contener, mitigar y remediar incidentes de seguridad con tiempos de respuesta menores a 5 minutos.",
    icon: "🚑",
    category: "Defensa Activa",
  },
  {
    id: "hardening",
    name: "Hardening de infraestructura",
    description: "Recomendaciones y aplicación de configuraciones seguras en servidores, redes y servicios expuestos.",
    icon: "⚙️",
    category: "Fortalecimiento de Sistemas",
  },
];

export const TEAM: TeamMember[] = [
  {
    name: "Alex Piedrahíta",
    role: "Especialista en Grafana & Zabbix",
    bio: "Experto en análisis de tráfico de red y diseño de tableros avanzados para visualización de métricas críticas e infraestructura en tiempo real.",
    image: "/img/alex.jpg",
  },
  {
    name: "Santiago Monterrosa",
    role: "Analista de Detección de Intrusos (IDS)",
    bio: "Especializado en la implementación y afinamiento de reglas en Suricata, identificando patrones anómalos de ataque y brechas de red.",
    image: "/img/santiago.jpg",
  },
  {
    name: "Emanuel Restrepo",
    role: "Analista SOC (Wazuh / SIEM)",
    bio: "Encargado de la centralización y correlación de eventos de seguridad, análisis de incidentes críticos y respuesta proactiva desde el SOC.",
    image: "/img/emanuel.jpg",
  },
  {
    name: "Efraín Hoyos",
    role: "Líder del equipo & Hacking Ético",
    bio: "Especialista en pruebas de penetración ofensivas y auditoría de seguridad para descubrir brechas lógicas y fortalecer defensas.",
    image: "/img/efrain.jpg",
  },
  {
    name: "Karen Flórez",
    role: "Encargada de Infraestructura Web",
    bio: "Administradora de plataformas y servidores cloud, garantizando alta disponibilidad, seguridad y rendimiento de la plataforma.",
    image: "/img/karen.jpg",
  },
];

export const GALLERY: GalleryImage[] = [
  {
    url: "/img/equipo-grupal.jpg",
    alt: "Equipo Tecnoversa SOC",
    caption: "Equipo completo de Tecnoversa colaborando en el Centro de Operaciones de Seguridad",
  },
  {
    url: "/img/accion1.jpg",
    alt: "Analista monitoreando dashboard",
    caption: "Analista SOC supervisando paneles e identificando vectores de ataque en tiempo real",
  },
  {
    url: "/img/accion2.jpg",
    alt: "Analista revisando Grafana",
    caption: "Auditoría de rendimiento y tráfico inusual mediante tableros avanzados de Grafana",
  },
];
