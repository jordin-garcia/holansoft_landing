import Image from "next/image";

const highlights = [
  { value: "94%", label: "salud de inventario" },
  { value: "Q 1,530", label: "ventas visibles al instante" },
  { value: "8", label: "modulos conectados" },
];

const modules = [
  {
    title: "Inventario vivo",
    text: "Productos, categorias, stock, estados y busqueda rapida en una vista pensada para operar todos los dias.",
    image: "/holansoft/productos.png",
    alt: "Catalogo de productos dentro de HolanSoft",
  },
  {
    title: "Punto de venta rapido",
    text: "Carrito, clientes, cantidades y totales listos para cerrar ventas con menos friccion en mostrador.",
    image: "/holansoft/pos.png",
    alt: "Punto de venta de HolanSoft",
  },
  {
    title: "Reportes accionables",
    text: "Lecturas claras para entender ventas, compras, alertas y movimiento del negocio sin hojas dispersas.",
    image: "/holansoft/reportes.png",
    alt: "Reportes de HolanSoft",
  },
];

const flow = [
  "Registra compras y entradas",
  "Controla stock y alertas",
  "Vende desde POS",
  "Analiza resultados",
];

const gallery = [
  { label: "Dashboard", image: "/holansoft/dashboard.png", alt: "Panel de control de HolanSoft" },
  { label: "Ventas", image: "/holansoft/ventas.png", alt: "Modulo de ventas de HolanSoft" },
  { label: "Compras", image: "/holansoft/compras.png", alt: "Modulo de compras de HolanSoft" },
  { label: "Usuarios", image: "/holansoft/usuarios.png", alt: "Gestion de usuarios de HolanSoft" },
  {
    label: "Configuracion",
    image: "/holansoft/configuracion.png",
    alt: "Configuracion del sistema HolanSoft",
  },
];

const benefits = [
  "Decision diaria con indicadores claros",
  "Operacion bilingue ES / ENG",
  "Catalogo, compras, ventas y usuarios en un solo lugar",
  "Interfaz moderna para equipos que necesitan velocidad",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5f1] text-[#062f55]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#062f55]/90 text-white shadow-[0_18px_60px_rgba(4,34,61,0.18)] backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="HolanSoft inicio">
            <span className="relative h-11 w-11 shrink-0 drop-shadow-[0_14px_22px_rgba(255,111,24,0.3)]">
              <Image
                src="/holansoft/logo-header-white.png"
                alt=""
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </span>
            <span className="text-xl font-black tracking-[-0.02em]">HolanSoft</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-white/78 md:flex">
            <a className="transition hover:text-white" href="#modulos">
              Modulos
            </a>
            <a className="transition hover:text-white" href="#beneficios">
              Beneficios
            </a>
            <a className="transition hover:text-white" href="#capturas">
              Capturas
            </a>
          </nav>
          <a
            className="rounded-full bg-[#ff7118] px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(255,113,24,0.34)] transition hover:-translate-y-0.5 hover:bg-[#ff8a2b]"
            href="#contacto"
          >
            Solicitar demo
          </a>
        </div>
      </header>

      <section id="inicio" className="hero-shell relative isolate pt-18 text-white">
        <Image
          src="/holansoft/dashboard.png"
          alt="Panel principal de HolanSoft"
          fill
          sizes="100vw"
          className="hero-backdrop object-cover object-left-top"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,29,54,0.97)_0%,rgba(5,47,85,0.92)_32%,rgba(5,47,85,0.24)_62%,rgba(255,113,24,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_20%,rgba(255,113,24,0.26),transparent_24%),linear-gradient(180deg,rgba(4,29,54,0.04),rgba(4,29,54,0.2))]" />

        <div className="relative mx-auto flex min-h-[clamp(565px,82svh,790px)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#ffd8bd] backdrop-blur">
              Gestion inteligente para inventarios
            </p>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
              HolanSoft
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/82 sm:text-2xl sm:leading-9">
              Controla productos, ventas, compras, alertas de stock y reportes desde una experiencia visual,
              rapida y lista para equipos que no pueden detenerse.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#ff7118] px-7 text-base font-black text-white shadow-[0_22px_50px_rgba(255,113,24,0.35)] transition hover:-translate-y-1 hover:bg-[#ff8a2b]"
              >
                Ver como vender mas
              </a>
              <a
                href="#capturas"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 text-base font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/16"
              >
                Explorar pantallas
              </a>
            </div>
          </div>

          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-[8px] border border-white/14 bg-white/12 p-5 shadow-[0_18px_46px_rgba(0,0,0,0.16)] backdrop-blur-md"
              >
                <strong className="block text-3xl font-black tracking-[-0.04em] text-white">{item.value}</strong>
                <span className="mt-1 block text-sm font-bold text-white/68">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 border-y border-[#e6dfd7] bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {flow.map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#ff7118] text-sm font-black text-white shadow-[0_14px_28px_rgba(255,113,24,0.22)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-black text-[#062f55]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="modulos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">Sistema completo</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.04em] text-[#062f55] sm:text-6xl">
              Cada movimiento del negocio en una sola vista.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#53677c]">
            HolanSoft organiza la operacion alrededor de lo que importa: disponibilidad, ventas, compras,
            usuarios y reportes. La interfaz usa jerarquia visual clara para que el equipo encuentre accion
            antes que ruido.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {modules.map((module) => (
            <article
              key={module.title}
              className="group overflow-hidden rounded-[8px] border border-[#e3e7ec] bg-white shadow-[0_24px_70px_rgba(6,47,85,0.09)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_34px_90px_rgba(6,47,85,0.16)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#eef2f6]">
                <Image
                  src={module.image}
                  alt={module.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-left-top transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-[#062f55]">{module.title}</h3>
                <p className="mt-3 text-base leading-7 text-[#53677c]">{module.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="beneficios" className="relative overflow-hidden bg-[#062f55] py-24 text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="section-kicker text-[#ffb37b]">Operacion con foco</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-6xl">
              Diseñado para vender, reponer y decidir sin perder el ritmo.
            </h2>
            <div className="mt-10 grid gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-4 rounded-[8px] bg-white/8 p-5">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#ff7118] shadow-[0_0_0_8px_rgba(255,113,24,0.12)]" />
                  <p className="text-lg font-bold leading-7 text-white/84">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-[8px] border border-white/14 lg:block" />
            <div className="screen-frame relative rotate-1 overflow-hidden rounded-[8px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.35)]">
              <Image
                src="/holansoft/pos.png"
                alt="Modulo POS de HolanSoft con carrito de venta"
                width={1920}
                height={875}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="capturas" className="bg-[#f7f5f1] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="section-kicker">Producto real</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.04em] text-[#062f55] sm:text-6xl">
                Pantallas listas para una operacion profesional.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-[#53677c]">
              Desde el login hasta la configuracion, la experiencia mantiene consistencia visual, acciones
              prominentes y lectura rapida de datos.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {gallery.map((item, index) => (
              <article
                key={item.label}
                className={`overflow-hidden rounded-[8px] border border-[#e1e5eb] bg-white shadow-[0_24px_70px_rgba(6,47,85,0.08)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between border-b border-[#e9edf2] px-5 py-4">
                  <h3 className="text-base font-black uppercase tracking-[0.14em] text-[#8b9ab0]">{item.label}</h3>
                  <span className="h-3 w-3 rounded-full bg-[#ff7118]" />
                </div>
                <div className="relative aspect-[16/7] bg-[#eef2f6]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover object-left-top"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative overflow-hidden bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="relative block h-24 w-28 overflow-hidden rounded-[8px] bg-white">
              <Image src="/holansoft/logo-mark.png" alt="" fill sizes="112px" className="object-cover" />
            </span>
            <h2 className="mt-8 max-w-2xl text-4xl font-black tracking-[-0.04em] text-[#062f55] sm:text-6xl">
              Lleva tu inventario al nivel que tu negocio ya merece.
            </h2>
          </div>

          <div className="rounded-[8px] bg-[#062f55] p-8 text-white shadow-[0_35px_90px_rgba(6,47,85,0.2)] sm:p-10">
            <p className="text-xl leading-8 text-white/82">
              HolanSoft convierte las operaciones diarias en una experiencia centralizada: menos busqueda,
              menos duplicidad y mas claridad para crecer.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:contacto@holansoft.com?subject=Demo%20HolanSoft"
                className="inline-flex h-14 items-center justify-center rounded-full bg-[#ff7118] px-7 text-base font-black text-white shadow-[0_18px_40px_rgba(255,113,24,0.28)] transition hover:-translate-y-1 hover:bg-[#ff8a2b]"
              >
                Agendar demo
              </a>
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
    </main>
  );
}
