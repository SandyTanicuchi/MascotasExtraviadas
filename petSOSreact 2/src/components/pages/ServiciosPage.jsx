import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuMapPin, LuBell, LuUsers, LuPawPrint,
  LuStethoscope, LuShield, LuChevronDown, LuArrowRight
} from "react-icons/lu";
import "./ServiciosPage.css";

const servicios = [
  {
    id: "gps",
    icon: <LuMapPin />,
    titulo: "Localización GPS",
    subtitulo: "Ubica a tu mascota en tiempo real",
    descripcion: "Rastrea la ubicación exacta de tu mascota en cualquier momento desde tu teléfono. Con actualizaciones cada pocos segundos, nunca perderás de vista a tu compañero.",
    beneficios: ["Mapa en tiempo real con historial de rutas", "Alertas si tu mascota sale de una zona segura", "Funciona en toda la ciudad", "Compatible con iOS y Android"],
    color: "#2f6fd1",
    bg: "rgba(47,111,209,0.08)",
  },
  {
    id: "alertas",
    icon: <LuBell />,
    titulo: "Alertas de Mascota Perdida",
    subtitulo: "Notificaciones inmediatas a tu comunidad",
    descripcion: "Si tu mascota se pierde, envía una alerta instantánea a todos los usuarios de PetSOS cerca de tu zona. Mientras más ojos, más rápido la encuentras.",
    beneficios: ["Alerta masiva en un solo toque", "Notificaciones push a usuarios cercanos", "Perfil de la mascota visible para todos", "Sistema de confirmaciones de avistamiento"],
    color: "#e85d3d",
    bg: "rgba(232,93,61,0.08)",
  },
  {
    id: "comunidad",
    icon: <LuUsers />,
    titulo: "Comunidad de Dueños",
    subtitulo: "Conecta con personas que aman a los animales",
    descripcion: "Forma parte de una red de dueños de mascotas en tu ciudad. Comparte consejos, experiencias, y ayuda a otros cuando lo necesiten.",
    beneficios: ["Foro de preguntas y respuestas", "Grupos por especie o raza", "Eventos y actividades locales", "Red de apoyo en emergencias"],
    color: "#2e9e5b",
    bg: "rgba(46,158,91,0.08)",
  },
  {
    id: "registro",
    icon: <LuPawPrint />,
    titulo: "Registro de Mascotas",
    subtitulo: "Todo el historial de tu compañero en un lugar",
    descripcion: "Crea el perfil completo de tu mascota: fotos, raza, edad, vacunas, medicamentos y más. Siempre a mano cuando lo necesites.",
    beneficios: ["Ficha médica digital completa", "Recordatorios de vacunas y medicamentos", "Galería de fotos y momentos", "Compartible con tu veterinario"],
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
  {
    id: "veterinarios",
    icon: <LuStethoscope />,
    titulo: "Veterinarios Cercanos",
    subtitulo: "Encuentra atención profesional rápido",
    descripcion: "Localiza veterinarios, clínicas y tiendas de mascotas cerca de ti. Con calificaciones, horarios y contacto directo desde la app.",
    beneficios: ["Mapa de clínicas y veterinarias", "Reseñas y calificaciones reales", "Contacto directo y agenda de citas", "Atención de emergencia 24/7"],
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
  {
    id: "seguridad",
    icon: <LuShield />,
    titulo: "Zona Segura",
    subtitulo: "Define límites y recibe alertas al instante",
    descripcion: "Establece zonas seguras en el mapa. Si tu mascota sale de esa área, recibirás una notificación inmediata en tu teléfono.",
    beneficios: ["Zonas personalizables en el mapa", "Alertas en menos de 10 segundos", "Múltiples zonas por mascota", "Historial de salidas registrado"],
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function ServicioCard({ s, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="sv-card"
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ "--accent": s.color, "--accent-bg": s.bg }}
    >
      <div className="sv-card__top">
        <motion.div
          className="sv-card__icon"
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
        >
          {s.icon}
        </motion.div>
        <span className="sv-card__num">0{index + 1}</span>
      </div>

      <h3 className="sv-card__title">{s.titulo}</h3>
      <p className="sv-card__subtitle">{s.subtitulo}</p>
      <p className="sv-card__desc">{s.descripcion}</p>

      <button
        className="sv-card__toggle"
        onClick={() => setExpanded((p) => !p)}
      >
        Ver beneficios
        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <LuChevronDown />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            className="sv-card__benefits"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {s.beneficios.map((b, i) => (
              <motion.li key={b} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <LuArrowRight className="sv-check" /> {b}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ServiciosPage() {
  return (
    <div className="sv-page">

      <div className="sv-hero">
        <div className="sv-hero__bg" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="sv-hero__bubble"
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
              style={{ left: `${10 + i * 15}%`, width: `${40 + i * 20}px`, height: `${40 + i * 20}px` }}
            />
          ))}
        </div>

        <div className="container sv-hero__content">
          <motion.p className="sv-hero__eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Todo lo que necesitas
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Nuestros <span className="sv-hero__highlight">Servicios</span>
          </motion.h1>

          <motion.p className="sv-hero__sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Herramientas diseñadas para que tu mascota siempre esté segura, cerca y protegida.
          </motion.p>

          <motion.div className="sv-hero__stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
            {[{ num: "6", label: "Servicios" }, { num: "24/7", label: "Disponible" }, { num: "100%", label: "Gratuito" }].map((s) => (
              <div className="sv-stat" key={s.label}>
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container sv-grid-wrap">
        <motion.div
          className="sv-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicios.map((s, i) => (
            <ServicioCard key={s.id} s={s} index={i} />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="sv-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container sv-cta__inner">
          <h2>¿Listo para proteger a tu mascota?</h2>
          <p>Únete a la comunidad PetSOS y accede a todos los servicios de forma gratuita.</p>
          <motion.a href="/registro" className="sv-cta__btn" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            Crear cuenta gratis
          </motion.a>
        </div>
      </motion.div>

    </div>
  );
}

export default ServiciosPage;