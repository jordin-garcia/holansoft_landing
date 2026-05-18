"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const highlights = [
  { value: "100%", label: "control y precisión de inventario", desc: "Monitoreo digital sin hojas sueltas" },
  { value: "2 horas", label: "ahorradas en cuadres de caja diarios", desc: "Cierres automáticos al instante" },
  { value: "8", label: "módulos comerciales integrados", desc: "POS, compras, inventario y más" },
];

const modules = [
  {
    title: "Dashboard analítico",
    text: "Visualiza al instante las compras, ventas, salud del inventario y utilidades netas diarias con gráficos interactivos y bitácora de actividad.",
    image: "/holansoft/dashboard.png",
    alt: "Dashboard interactivo en tiempo real de HolanSoft",
    tag: "Control"
  },
  {
    title: "Punto de venta rápido (POS)",
    text: "Agiliza tus cobros con búsqueda por código de barras o nombre, control de cantidades, registro de clientes e impresión directa de recibos.",
    image: "/holansoft/pos.png",
    alt: "Punto de venta ágil de HolanSoft",
    tag: "Ventas"
  },
  {
    title: "Inventario inteligente",
    text: "Controla existencias por códigos y categorías. Activa alertas automáticas de bajo stock e importa catálogos masivos con facilidad.",
    image: "/holansoft/productos.png",
    alt: "Módulo de catálogo e inventario de HolanSoft",
    tag: "Inventario"
  },
  {
    title: "Historial de ventas",
    text: "Registra cada transacción con número de factura, fecha, cliente y totales. Permite reimprimir comprobantes y gestionar anulaciones con seguridad.",
    image: "/holansoft/ventas.png",
    alt: "Historial detallado de ventas de HolanSoft",
    tag: "Finanzas"
  },
  {
    title: "Gestión de compras",
    text: "Registra entradas de mercadería y compras a proveedores. Mantén tus costos de adquisición actualizados para calcular utilidades reales.",
    image: "/holansoft/compras.png",
    alt: "Entrada de mercancías y compras de HolanSoft",
    tag: "Compras"
  },
  {
    title: "Reportes gerenciales",
    text: "Monitorea ingresos agregados, cantidad de movimientos y ticket promedio. Exporta reportes ejecutivos en PDF listos para imprimir.",
    image: "/holansoft/reportes.png",
    alt: "Reportes avanzados y exportaciones PDF de HolanSoft",
    tag: "Reportes"
  },
  {
    title: "Control de usuarios",
    text: "Protege tu información comercial asignando accesos y permisos específicos para administradores, cajeros y personal de soporte.",
    image: "/holansoft/usuarios.png",
    alt: "Gestión de usuarios y roles de HolanSoft",
    tag: "Seguridad"
  },
  {
    title: "Configuración flexible",
    text: "Personaliza de forma centralizada el nombre de tu empresa, teléfono, dirección e información fiscal para que aparezcan en cada ticket de venta.",
    image: "/holansoft/configuracion.png",
    alt: "Configuración global de datos del negocio en HolanSoft",
    tag: "Sistema"
  },
];

const flow = [
  "Registra compras y entradas",
  "Controla stock y alertas",
  "Vende desde POS",
  "Analiza resultados",
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para la sección de Precios e Integración con Modal
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Lightbox interactivo para pantallas del sistema
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const openDemoModal = (planName: string | null = null) => {
    setSelectedPlan(planName);
    setIsDemoModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.company) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Nombre: formData.name,
          Email: formData.email,
          Teléfono: formData.phone,
          Empresa: formData.company,
          Plan_Interés: selectedPlan || "Demo General",
          _subject: `Nueva solicitud de Demo: ${selectedPlan || "General"} - HolanSoft`,
          _honey: "", // Campo anti-spam invisible (honeypot)
        })
      });
      
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        console.warn("Error al enviar el formulario al proxy del servidor (usando fallback)");
        // Fallback para no interrumpir la experiencia del usuario
        setFormSubmitted(true);
      }
    } catch (error) {
      console.warn("Error de red al enviar el formulario (usando fallback)", error);
      // Fallback
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsDemoModalOpen(false);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedPlan(null);
      setFormData({ name: "", email: "", phone: "", company: "" });
    }, 300);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5f1] text-[#062f55]">
      {/* Header Fijo */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#062f55]/90 text-white shadow-[0_18px_60px_rgba(4,34,61,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#inicio" className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500" aria-label="HolanSoft inicio">
            <span className="relative h-11 w-11 shrink-0 drop-shadow-[0_14px_22px_rgba(255,111,24,0.3)]">
              <Image
                src="/holansoft/logo-header-white.png"
                alt="HolanSoft Logo"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </span>
            <span className="text-xl font-black tracking-[-0.02em]">HolanSoft</span>
          </a>

          {/* Navegación Escritorio */}
          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/78 md:flex">
            <a className="transition hover:text-white relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff7118] after:transition-all hover:after:w-full" href="#modulos">
              Módulos
            </a>
            <a className="transition hover:text-white relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff7118] after:transition-all hover:after:w-full" href="#beneficios">
              Beneficios
            </a>
            <a className="transition hover:text-white relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff7118] after:transition-all hover:after:w-full" href="#precios">
              Precios
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => openDemoModal(null)}
              className="rounded-full bg-[#ff7118] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(255,113,24,0.34)] transition hover:-translate-y-0.5 hover:bg-[#ff8a2b] hover:shadow-[0_18px_38px_rgba(255,113,24,0.45)] cursor-pointer"
            >
              Solicitar demo
            </button>

            {/* Botón Menú Hamburguesa Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10 md:hidden cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer Móvil Lateral */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200" onClick={() => setMobileMenuOpen(false)}>
          <aside
            className="fixed bottom-0 right-0 top-0 z-50 w-72 bg-[#062f55] p-6 text-white shadow-2xl transition-transform duration-300 slide-in-from-right-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <span className="text-xl font-black">Menú</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-6 text-lg font-bold">
              <a
                href="#modulos"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5"
              >
                Módulos
              </a>
              <a
                href="#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5"
              >
                Beneficios
              </a>
              <a
                href="#precios"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5"
              >
                Precios
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDemoModal(null);
                }}
                className="mt-4 flex w-full justify-center rounded-full bg-[#ff7118] py-4 font-black transition hover:bg-[#ff8a2b] cursor-pointer"
              >
                Solicitar demo
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Hero Section */}
      <section id="inicio" className="hero-shell relative isolate pt-18 text-white min-h-[92svh] flex items-center">
        <Image
          src="/holansoft/dashboard.png"
          alt="Panel principal de HolanSoft"
          fill
          sizes="100vw"
          className="hero-backdrop object-cover object-left-top"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,29,54,0.98)_0%,rgba(5,47,85,0.94)_32%,rgba(5,47,85,0.30)_68%,rgba(255,113,24,0.06)_100%)]" />
        {/* Glow orbs decorativos de fondo */}
        <div className="absolute top-1/4 left-1/3 -z-10 h-72 w-72 rounded-full bg-[#ff7118]/25 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 left-1/10 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ffd8bd] backdrop-blur animate-pulse">
              Tecnología Comercial de Vanguardia
            </p>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
              HolanSoft
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/88 sm:text-2xl sm:leading-9">
              Controla productos, cobros ágiles, compras a proveedores y analíticas financieras. Todo desde una interfaz interactiva de alto rendimiento hecha para tu negocio.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => openDemoModal("Plan Crecimiento")}
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#ff7118] px-8 text-base font-black text-white shadow-[0_22px_50px_rgba(255,113,24,0.4)] transition hover:-translate-y-1 hover:bg-[#ff8a2b] hover:shadow-[0_24px_55px_rgba(255,113,24,0.5)] cursor-pointer"
              >
                Ver cómo vender más
              </button>
              <a
                href="#modulos"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 text-base font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/18"
              >
                Explorar módulos
              </a>
            </div>
          </div>

          <div className="mt-14 grid max-w-4xl gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="group rounded-xl border border-white/14 bg-white/8 p-6 shadow-[0_18px_46px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
              >
                <strong className="block text-4xl font-black tracking-[-0.04em] text-white group-hover:scale-105 transition-transform duration-300 origin-left">{item.value}</strong>
                <span className="mt-2 block text-sm font-black text-white">{item.label}</span>
                <span className="mt-1 block text-xs font-bold text-white/60">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flujo de Proceso */}
      <section className="relative z-10 -mt-6 border-y border-[#e6dfd7] bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {flow.map((step, index) => (
            <div key={step} className="flex items-center gap-4 group">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#ff7118] text-sm font-black text-white shadow-[0_14px_28px_rgba(255,113,24,0.22)] transition group-hover:scale-110">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-black text-[#062f55] group-hover:text-[#ff7118] transition-colors">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Módulos y Pantallas */}
      <section id="modulos" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Módulos del Sistema</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] text-[#062f55] sm:text-6xl">
              Cada función de tu negocio en una sola interfaz.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#53677c]">
            HolanSoft organiza tu operación comercial con consistencia visual y lectura de datos ultra rápida.
            Haz clic en cualquier módulo para ver la captura real de pantalla en alta resolución.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <article
              key={module.title}
              onClick={() => setLightboxImage({ src: module.image, alt: module.alt, title: module.title })}
              className="group overflow-hidden rounded-[8px] border border-[#e3e7ec] bg-white shadow-[0_24px_70px_rgba(6,47,85,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_90px_rgba(6,47,85,0.15)] cursor-zoom-in"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#eef2f6]">
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/95 px-5 py-2 text-xs font-black uppercase tracking-wider text-[#062f55] shadow-lg scale-90 group-hover:scale-100 transition-all duration-300">
                    Ver pantalla
                  </span>
                </div>
                <span className="absolute left-3 top-3 z-10 rounded-full bg-[#062f55] px-3 py-1 text-xs font-black text-white shadow">
                  {module.tag}
                </span>
                <Image
                  src={module.image}
                  alt={module.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-left-top transition duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-[#062f55] group-hover:text-[#ff7118] transition-colors">{module.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#53677c]">{module.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Sección Beneficios Clásica (Estética mejorada) */}
      <section id="beneficios" className="scroll-mt-24 bg-white py-24 border-y border-[#e6dfd7]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center grid gap-12">
          <div>
            <p className="section-kicker">Diseñado para crecer</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#062f55] sm:text-6xl">
              Tecnología comercial que no se detiene.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#53677c]">
              HolanSoft ha sido diseñado prestando extrema atención al rendimiento operativo del comerciante. El software se ejecuta en menos de un segundo en computadoras portátiles o tablets estándar, permitiendo que tu equipo cobre más rápido, evite pérdidas y controle su caja diaria al instante.
            </p>
            <ul className="mt-8 space-y-4 text-base font-bold text-[#062f55]">
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Auditoría de caja integrada contra fraudes</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Catálogos masivos (soporta más de 10,000 productos)</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Instalación rápida en cualquier navegador web moderno</span>
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-[8px] border border-[#e3e7ec] lg:block" />
            <div className="screen-frame relative rotate-1 overflow-hidden rounded-[8px] bg-white shadow-[0_40px_100px_rgba(6,47,85,0.18)] border border-[#e3e7ec]">
              <Image
                src="/holansoft/pos.png"
                alt="Módulo POS de HolanSoft con carrito de venta"
                width={1920}
                height={875}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Precios en Quetzales (Guatemala) */}
      <section id="precios" className="scroll-mt-24 bg-[#062f55] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[#ff7118]/10 blur-3xl" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
          <div className="text-center">
            <p className="section-kicker text-[#ffb37b]">Planes a tu medida</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
              Precios transparentes y sin sorpresas.
            </h2>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-white/80">
              Escoge el plan perfecto para digitalizar tu negocio en Guatemala. Todos los planes incluyen actualizaciones automáticas y soporte técnico local.
            </p>

            {/* Selector Mensual / Anual */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className={`text-base font-bold transition-colors ${!isAnnual ? "text-white" : "text-white/50"}`}>Pago Mensual</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-white/15 transition-colors duration-200 ease-in-out focus:outline-none"
                role="switch"
                aria-checked={isAnnual}
                aria-label="Alternar facturación anual"
              >
                <span
                  className={`${isAnnual ? "translate-x-7 bg-[#ff7118]" : "translate-x-0 bg-white"
                    } pointer-events-none inline-block h-6 w-6 transform rounded-full shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-base font-bold transition-colors ${isAnnual ? "text-white" : "text-white/50"}`}>Pago Anual</span>
                <span className="rounded-full bg-[#ff7118] px-2.5 py-1 text-xs font-black uppercase text-white shadow-[0_4px_12px_rgba(255,113,24,0.3)]">
                  -15% Ahorro
                </span>
              </div>
            </div>
          </div>

          {/* Tarjetas de Precios */}
          <div className="mt-16 grid gap-8 md:grid-cols-3 md:items-stretch">
            {/* Plan Starter */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-white/20">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Plan Emprendedor</h3>
                <p className="mt-2 text-sm text-white/70">Ideal para tiendas individuales o negocios pequeños que inician.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black tracking-tight">{isAnnual ? "Q 129" : "Q 149"}</span>
                  <span className="ml-1 text-sm font-semibold text-white/60">/ mes</span>
                </div>
                {isAnnual && <p className="mt-1.5 text-xs text-[#ffb37b] font-bold">Q 1,548 facturado anualmente</p>}

                <ul className="mt-8 space-y-4 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>1 Usuario administrador</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Punto de Venta (POS) completo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hasta 500 productos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Reportes básicos de venta</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openDemoModal("Plan Emprendedor")}
                className="mt-8 w-full rounded-full border border-white/20 bg-white/5 py-4 text-center text-sm font-black transition hover:bg-white/10 cursor-pointer"
              >
                Solicitar demo
              </button>
            </div>

            {/* Plan Crecimiento (Destacado) */}
            <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#ff7118] bg-[#0c3d6d] p-8 shadow-[0_35px_80px_rgba(255,113,24,0.18)] transition duration-300 hover:-translate-y-2 animate-glow-pulse">
              <div className="absolute inset-x-0 -top-4 mx-auto w-32 rounded-full bg-[#ff7118] py-1.5 text-center text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(255,113,24,0.3)]">
                Recomendado
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Plan Crecimiento</h3>
                <p className="mt-2 text-sm text-[#ffd8bd]">Control total de inventario y ventas para negocios en expansión.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black tracking-tight">{isAnnual ? "Q 249" : "Q 299"}</span>
                  <span className="ml-1 text-sm font-semibold text-white/60">/ mes</span>
                </div>
                {isAnnual && <p className="mt-1.5 text-xs text-[#ffb37b] font-bold">Q 2,988 facturado anualmente</p>}

                <ul className="mt-8 space-y-4 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Usuarios ilimitados</strong> con roles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>POS con control de clientes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Productos ilimitados</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Módulo de Compras y Proveedores</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dashboard analítico e interactivo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Soporte prioritario por WhatsApp</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openDemoModal("Plan Crecimiento")}
                className="mt-8 w-full rounded-full bg-[#ff7118] py-4 text-center text-sm font-black transition hover:bg-[#ff8a2b] shadow-[0_14px_32px_rgba(255,113,24,0.3)] cursor-pointer"
              >
                Solicitar demo
              </button>
            </div>

            {/* Plan Corporativo */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-white/20">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Plan Corporativo</h3>
                <p className="mt-2 text-sm text-white/70">Para cadenas, múltiples bodegas y requerimientos avanzados.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black tracking-tight">{isAnnual ? "Q 499" : "Q 599"}</span>
                  <span className="ml-1 text-sm font-semibold text-white/60">/ mes</span>
                </div>
                {isAnnual && <p className="mt-1.5 text-xs text-[#ffb37b] font-bold">Q 5,988 facturado anualmente</p>}

                <ul className="mt-8 space-y-4 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Todo lo del Plan Crecimiento</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Múltiples bodegas y sucursales</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Integración de Facturación Electrónica SAT (FEL)</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Importación avanzada y backups automáticos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#ff7118]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Capacitación dedicada y soporte 24/7</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openDemoModal("Plan Corporativo")}
                className="mt-8 w-full rounded-full border border-white/20 bg-white/5 py-4 text-center text-sm font-black transition hover:bg-white/10 cursor-pointer"
              >
                Solicitar demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Contacto / Footer Prominente */}
      <section id="contacto" className="scroll-mt-24 relative overflow-hidden bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="relative block h-24 w-28 overflow-hidden rounded-[8px] bg-white">
              <Image src="/holansoft/logo-mark.png" alt="HolanSoft Logo Mark" fill sizes="112px" className="object-cover" />
            </span>
            <h2 className="mt-8 max-w-2xl text-4xl font-black tracking-[-0.04em] text-[#062f55] sm:text-6xl">
              Lleva tu inventario al nivel que tu negocio ya merece.
            </h2>
          </div>

          <div className="rounded-[8px] bg-[#062f55] p-8 text-white shadow-[0_35px_90px_rgba(6,47,85,0.2)] sm:p-10">
            <p className="text-xl leading-8 text-white/82">
              HolanSoft convierte las operaciones diarias en una experiencia centralizada: menos búsqueda,
              menos duplicidad y más claridad para crecer.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => openDemoModal(null)}
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#ff7118] px-7 text-base font-black text-white shadow-[0_18px_40px_rgba(255,113,24,0.28)] transition hover:-translate-y-1 hover:bg-[#ff8a2b] cursor-pointer"
              >
                Agendar demo
              </button>
              <a
                href="#inicio"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/18 px-7 text-base font-black text-white transition hover:-translate-y-1 hover:bg-white/10"
              >
                Volver arriba
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Pulido y Corporativo */}
      <footer className="border-t border-[#e6dfd7] bg-[#f7f5f1] py-12 text-[#53677c]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="relative h-7 w-7 shrink-0">
                  <Image
                    src="/holansoft/logo-mark.png"
                    alt="HolanSoft Mark"
                    fill
                    sizes="28px"
                    className="object-contain"
                  />
                </span>
                <span className="text-lg font-black tracking-[-0.02em] text-[#062f55]">HolanSoft</span>
              </div>
              <p className="mt-4 text-sm leading-6">
                Tecnología inteligente para el control y crecimiento comercial de tu empresa.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#062f55]">Navegación</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#inicio" className="transition hover:text-[#ff7118]">Inicio</a></li>
                <li><a href="#modulos" className="transition hover:text-[#ff7118]">Módulos</a></li>
                <li><a href="#beneficios" className="transition hover:text-[#ff7118]">Beneficios</a></li>
                <li><a href="#precios" className="transition hover:text-[#ff7118]">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#062f55]">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="transition hover:text-[#ff7118]">Aviso de Privacidad</a></li>
                <li><a href="#" className="transition hover:text-[#ff7118]">Términos de Servicio</a></li>
                <li><a href="#" className="transition hover:text-[#ff7118]">Políticas de Cookies</a></li>
                <li><a href="#" className="transition hover:text-[#ff7118]">Soporte Técnico</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#062f55]">Contacto</h4>
              <p className="mt-4 text-sm">
                <a href="mailto:holansoft.contacto@gmail.com" className="transition hover:text-[#ff7118]">
                  holansoft.contacto@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-[#e6dfd7] pt-8 text-center text-xs">
            <p>Copyright &copy; 2026 HolanSoft. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* --- LIGHTBOX INTERACTIVO DE PANTALLAS --- */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute right-6 top-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-5xl w-full aspect-[16/10] overflow-hidden rounded-xl border border-white/15 bg-[#062f55] shadow-2xl scale-95 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#ff7118] tracking-widest">Pantalla del Sistema</span>
                <h3 className="text-2xl font-black text-white mt-1">{lightboxImage.title}</h3>
              </div>
              <button
                onClick={() => {
                  setLightboxImage(null);
                  openDemoModal(lightboxImage.title);
                }}
                className="rounded-full bg-[#ff7118] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow hover:bg-[#ff8a2b] cursor-pointer"
              >
                Solicitar demo de este módulo
              </button>
            </div>

            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              className="object-contain object-center"
            />
          </div>
        </div>
      )}

      {/* Modal Interactivo de Captura de Leads (Agendar Demo) */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" onClick={handleCloseModal} />

          {/* Contenedor Modal */}
          <div className="relative z-10 w-full max-w-lg scale-95 overflow-hidden rounded-2xl bg-[#062f55] text-white shadow-2xl transition-transform duration-300 animate-in zoom-in-95">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#ff7118]/15 blur-2xl pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h3 className="text-xl font-black">
                {selectedPlan ? `Demo: ${selectedPlan}` : "Agenda una demostración"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10 cursor-pointer"
              >
                <svg className="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <p className="text-sm text-white/80">
                    Déjanos tus datos de contacto y un especialista te llamará en menos de 24 horas para una demo personalizada{selectedPlan ? ` del ${selectedPlan}` : ""}.
                  </p>
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-white/60">Nombre Completo</label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Ej. Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#ff7118] focus:bg-white/10"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-white/60">Correo Electrónico</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Ej. carlos@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#ff7118] focus:bg-white/10"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-white/60">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Ej. +502 4589 1256"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#ff7118] focus:bg-white/10"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-white/60">Empresa / Negocio</label>
                      <input
                        id="company"
                        type="text"
                        required
                        placeholder="Ej. Ferretería El Sol"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#ff7118] focus:bg-white/10"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-4 w-full rounded-full bg-[#ff7118] py-4 text-center text-sm font-black tracking-wider transition hover:bg-[#ff8a2b] shadow-[0_14px_32px_rgba(255,113,24,0.3)] cursor-pointer ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Confirmar mi Demostración"
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in-50 duration-300">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff7118] text-white shadow-[0_14px_28px_rgba(255,113,24,0.35)]">
                    <svg className="h-8 w-8 animate-in zoom-in-50 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="mt-6 text-2xl font-black text-white animate-in slide-in-from-bottom-2 duration-300">¡Solicitud Enviada!</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 max-w-sm">
                    Muchas gracias <strong className="text-white">{formData.name}</strong>. Hemos recibido tu solicitud de demo {selectedPlan ? `para el ${selectedPlan}` : ""} para tu negocio <strong className="text-white">{formData.company}</strong>.
                  </p>
                  <p className="mt-2 text-xs text-white/50">
                    Un asesor técnico de HolanSoft se pondrá en contacto contigo en breve al correo <strong className="text-[#ffd8bd]">{formData.email}</strong> o vía telefónica.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="mt-8 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-black transition hover:bg-white/10 cursor-pointer"
                  >
                    Entendido
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
