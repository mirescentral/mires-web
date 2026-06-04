import Link from "next/link";
import Image from "next/image"; 
import { createClient } from '@/utils/supabase/server';
// Importamos más iconos para la carga dinámica de ministerios
import { Calendar, Play, MapPin, Users, BookOpen, HeartHandshake, ArrowRight, Clock, Map, Coffee, Smile, Heart, Music, Globe, MonitorPlay } from "lucide-react";

import fotoPrincipal from '@/app/foto principal.png'; 

// Mapa de iconos dinámicos para los ministerios
const IconMap: Record<string, React.ElementType> = {
  Users, Coffee, Smile, Heart, Music, Globe
};

export default async function Home() {
  const supabase = await createClient();
  
  // Consultamos sedes y ministerios en paralelo
  const [ { data: sedes }, { data: ministerios } ] = await Promise.all([
    supabase.from('sedes').select('*').order('nombre'),
    supabase.from('ministerios').select('*').limit(6)
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* BLOQUE 2: HERO PRINCIPAL */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={fotoPrincipal} alt="Comunidad MIRES" fill sizes="100vw" className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-mires-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-mires-bg via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl flex flex-col items-center">
          <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-mires-white leading-none md:leading-[1.05] tracking-tight mb-6 drop-shadow-md">
            Su gracia escribe nuevas historias
          </h1>
          <p className="font-sans text-lg md:text-xl text-mires-white/90 mb-10 max-w-2xl font-medium">
            Bienvenido a MIRES — una iglesia para ti y tu familia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/soy-nuevo" className="flex items-center justify-center gap-2 bg-mires-accent hover:bg-[#d9782e] text-mires-white px-8 py-4 rounded-full font-bold text-base transition-all transform hover:-translate-y-1 shadow-lg">
              <Calendar size={20} />
              Planifica tu visita
            </Link>
            <Link href="/sermones" className="flex items-center justify-center gap-2 bg-mires-white/10 hover:bg-mires-white/20 backdrop-blur-md border border-mires-white/30 text-mires-white px-8 py-4 rounded-full font-bold text-base transition-all transform hover:-translate-y-1 shadow-lg">
              <Play size={20} />
              Ver predicación en vivo
            </Link>
          </div>
        </div>
      </section>

      {/* BLOQUE 6: PRÓXIMOS PASOS */}
      <section className="py-20 bg-mires-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-4">
              Tu camino en MIRES
            </h2>
            <p className="font-sans text-mires-textMuted max-w-2xl mx-auto">
              No importa dónde te encuentres en tu viaje, hay un próximo paso diseñado especialmente para ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-mires-primary/10 -z-10" />
            
            {/* Tarjetas de pasos (minimizadas para legibilidad del código) */}
            {[
              { icon: MapPin, title: "1. Visítanos", desc: "Ven un domingo y experimenta nuestra comunidad." },
              { icon: Users, title: "2. Nuevos Hijos", desc: "Conoce la visión y el ADN de nuestra casa." },
              { icon: BookOpen, title: "3. Discipulado", desc: "Crece espiritualmente en un grupo pequeño." },
              { icon: HeartHandshake, title: "4. Servir", desc: "Usa tus talentos para bendecir a otros." }
            ].map((paso, i) => (
              <div key={i} className="bg-mires-white p-8 rounded-2xl shadow-sm border border-mires-primary/5 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-mires-bg rounded-full flex items-center justify-center text-mires-accent mb-6 group-hover:scale-110 transition-transform">
                  <paso.icon size={32} />
                </div>
                <h3 className="font-display font-bold text-xl text-mires-primary mb-2">{paso.title}</h3>
                <p className="font-sans text-mires-textMuted text-sm">{paso.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/soy-nuevo" className="font-sans inline-flex items-center gap-2 text-mires-primary font-bold hover:text-mires-accent transition-colors">
              Comenzar mi viaje <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOQUE 5: PREDICACIÓN RECIENTE (YouTube) */}
      <section className="py-20 bg-mires-primary text-mires-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-6">
                Escucha el mensaje de esta semana
              </h2>
              <p className="font-sans text-mires-white/80 mb-8 max-w-lg leading-relaxed">
                Cada semana compartimos mensajes basados en la Biblia, diseñados para traer esperanza, dirección y propósito a tu vida cotidiana.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {/* Botón actualizado hacia los devocionales */}
                <Link href="/devocionales" className="font-sans inline-flex items-center gap-2 bg-mires-white text-mires-primary px-8 py-3 rounded-full font-bold hover:bg-mires-bg transition-colors shadow-lg">
                  <BookOpen size={20} className="text-mires-accent" />
                  Ver nuestros devocionales
                </Link>
                
                {/* Botón directo al canal oficial */}
                <a 
                  href="https://www.youtube.com/@MiresCentral" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans inline-flex items-center gap-2 bg-transparent border border-mires-white/30 text-mires-white px-8 py-3 rounded-full font-bold hover:bg-mires-white/10 transition-colors"
                >
                  Ir al canal de YouTube
                </a>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              {/* Contenedor responsivo para YouTube */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-mires-white/10 bg-mires-primary/50">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  /* REEMPLAZA "ID_DEL_VIDEO_AQUI" por el código de tu último video */
                  src="https://www.youtube.com/embed/ID_DEL_VIDEO_AQUI" 
                  title="Predicación MIRES Central" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 7: MINISTERIOS (Dinámico) */}
      <section className="py-20 bg-mires-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-4">
              En MIRES hay un lugar para ti
            </h2>
            <p className="font-sans text-mires-textMuted max-w-2xl mx-auto">
              Conoce nuestros ministerios y encuentra el espacio ideal para conectar, crecer y servir junto a otros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministerios?.map((min) => {
              const IconoComponente = IconMap[min.icono] || Users; // Fallback a 'Users' si no encuentra el icono
              
              return (
                <Link key={min.id} href={`/ministerios/${min.slug}`} className="group bg-mires-bg rounded-2xl p-6 border border-mires-primary/5 hover:border-mires-accent/50 hover:shadow-md transition-all flex items-start gap-4 cursor-pointer">
                  <div className="w-12 h-12 bg-mires-white rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-mires-accent group-hover:text-mires-white transition-colors text-mires-primary">
                    <IconoComponente size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-mires-primary mb-1 group-hover:text-mires-accent transition-colors">{min.nombre}</h3>
                    <p className="font-sans text-mires-textMuted text-sm line-clamp-2">{min.descripcion_corta}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/ministerios" className="font-sans inline-flex items-center gap-2 text-mires-primary font-bold hover:text-mires-accent transition-colors">
              Ver todos los ministerios <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* BLOQUE 3: SELECTOR DE SEDE (Ubicado al final) */}
      <section className="py-20 bg-mires-bg border-t border-mires-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-4">
              ¿Cuál es la sede más cercana a ti?
            </h2>
            <p className="text-mires-textMuted max-w-2xl mx-auto font-sans">
              Encuentra tu lugar en nuestra familia. Tenemos reuniones presenciales en distintas comunas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sedes?.map((sede) => (
              <div key={sede.id} className="bg-mires-white rounded-2xl p-8 shadow-sm border border-mires-primary/5 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-mires-primary text-mires-white rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-mires-primary">{sede.nombre}</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-mires-textMuted">
                    <Clock size={20} className="text-mires-accent" />
                    <span className="font-sans font-medium text-mires-textMain">{sede.horarios}</span>
                  </div>
                  <div className="flex items-start gap-3 text-mires-textMuted">
                    <Map size={20} className="text-mires-accent shrink-0 mt-0.5" />
                    <span className="font-sans text-sm">{sede.direccion || 'Dirección exacta disponible pronto.'}</span>
                  </div>
                </div>

                <a href={sede.map_url || '#'} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-transparent border-2 border-mires-primary text-mires-primary hover:bg-mires-primary hover:text-mires-white px-6 py-3 rounded-full font-bold font-sans transition-colors">
                  Cómo llegar <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}