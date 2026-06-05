import Link from "next/link";
import Image from "next/image"; 
import { createClient } from '@/utils/supabase/server';
import { ArrowRight, MapPin, Clock } from "lucide-react";
import fotoPrincipal from '@/app/foto principal.png'; 

export default async function Home() {
  const supabase = await createClient();
  
  // Mantenemos la lógica intacta para no romper la base de datos
  const [ { data: sedes }, { data: ministerios } ] = await Promise.all([
    supabase.from('sedes').select('*').order('nombre'),
    supabase.from('ministerios').select('*').limit(6)
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black">
      
      {/* SECCIÓN 1: HERO (Gigante, inmersivo y oscuro) */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Fondo fotográfico con filtro elegante */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={fotoPrincipal} 
            alt="Comunidad MIRES" 
            fill 
            sizes="100vw" 
            className="object-cover object-center grayscale opacity-70" 
            priority 
          />
          {/* Capa oscura para que el texto resalte siempre */}
          <div className="absolute inset-0 bg-eden-black/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center fade-in-up">
          <h1 className="font-serif-eden text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-eden-white leading-[0.95] tracking-tight mb-8 max-w-6xl drop-shadow-lg">
            Su gracia escribe nuevas historias.
          </h1>
          <p className="font-sans text-sm md:text-base text-eden-stone mb-12 max-w-xl font-light tracking-[0.2em] uppercase">
            Una iglesia para ti y tu familia en la ciudad.
          </p>
          <Link href="/soy-nuevo" className="inline-flex items-center justify-center gap-3 bg-eden-white text-eden-black px-10 py-5 rounded-full font-sans text-xs font-semibold tracking-widest uppercase hover:bg-eden-stone transition-colors duration-300">
            Planifica tu visita <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* SECCIÓN 2: MANIFIESTO (Blanco absoluto, mucho espacio) */}
      <section className="py-32 md:py-48 bg-eden-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="font-serif-eden text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight text-eden-black">
            Somos una iglesia de personas que se aman, que bendicen familias e influyen comunidades con el mensaje de Jesús.
          </h2>
          <p className="font-sans text-lg md:text-xl text-eden-muted leading-relaxed max-w-2xl mx-auto font-light">
            No importa dónde te encuentres en tu viaje espiritual, en MIRES hay un lugar preparado para ti. Descubre el propósito que Dios tiene para tu vida junto a una comunidad genuina.
          </p>
        </div>
      </section>

      {/* SECCIÓN 3: PREDICACIONES (Negro absoluto, contraste dramático) */}
      <section className="py-32 md:py-40 bg-eden-black text-eden-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="lg:w-5/12 space-y-8">
              <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-eden-muted">
                Mensaje Reciente
              </span>
              <h2 className="font-serif-eden text-5xl md:text-6xl leading-[1.1]">
                Escucha la voz de Dios hoy.
              </h2>
              <p className="font-sans text-eden-stone/80 text-lg font-light leading-relaxed">
                Cada semana compartimos mensajes basados en la Biblia, diseñados para traer esperanza, dirección y propósito a tu vida cotidiana.
              </p>
              <a href="https://www.youtube.com/@MiresCentral" target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 items-center gap-3 border border-eden-white/30 px-8 py-4 rounded-full font-sans text-xs font-semibold tracking-widest uppercase hover:bg-eden-white hover:text-eden-black transition-all duration-300">
                Ver en YouTube <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="lg:w-7/12 w-full">
              {/* Contenedor de video minimalista (sin bordes redondeados exagerados) */}
              <div className="aspect-video w-full bg-eden-white/5 relative overflow-hidden">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://www.youtube.com/embed/nuestro-video-aqui?si=placeholder" 
                  title="Predicación MIRES Central" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: SEDES (Minimalismo Editorial) */}
      <section className="py-32 md:py-40 bg-eden-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-serif-eden text-6xl md:text-7xl lg:text-8xl leading-none text-eden-black">
              Encuentra <br/>tu lugar.
            </h2>
            <p className="font-sans text-eden-muted font-semibold uppercase tracking-[0.2em] text-xs pb-4">
              Nuestras Congregaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {sedes?.map((sede) => (
              <div key={sede.id} className="group border-t border-eden-black/10 pt-8">
                <h3 className="font-serif-eden text-3xl md:text-4xl mb-6 text-eden-black">{sede.nombre}</h3>
                
                <div className="space-y-4 mb-10 font-sans text-eden-muted font-light text-sm">
                  <p className="flex items-center gap-3">
                    <Clock size={18} className="text-eden-black" /> 
                    {sede.horarios}
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin size={18} className="text-eden-black mt-0.5 shrink-0" /> 
                    <span className="leading-relaxed">{sede.direccion || 'Dirección por confirmar'}</span>
                  </p>
                </div>
                
                <a href={sede.map_url || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase text-eden-black group-hover:text-eden-muted transition-colors">
                  Cómo llegar <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300"/>
                </a>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}