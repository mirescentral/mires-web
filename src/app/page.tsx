import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { ArrowRight, MapPin, Clock } from "lucide-react";

// Función optimizada para obtener estrictamente el ÚLTIMO VIDEO SUBIDO (no transmisiones en vivo)
async function getLatestUploadedVideo() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  
  if (!API_KEY || !CHANNEL_ID) return null;

  try {
    // Paso A: Convertimos el Channel ID (UC...) al ID de la lista de reproducción de subidas (UU...)
    // Esta lista contiene única y exclusivamente los videos subidos tradicionalmente.
    const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, 'UU');

    // Paso B: Pedimos el primer elemento de esa lista específica de subidas
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=1`;
    
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cacheado por 1 hora
    const data = await res.json();
    
    return data.items?.[0] || null;
  } catch (error) {
    console.error("Error al obtener el video cargado desde YouTube:", error);
    return null;
  }
}

export default async function Home() {
  const supabase = await createClient();
  
  const [ { data: sedes }, latestVideoItem ] = await Promise.all([
    supabase.from('sedes').select('*').order('nombre'),
    getLatestUploadedVideo()
  ]);

  // URL dinámica de la portada con Supabase Storage
  const { data: { publicUrl } } = supabase
    .storage
    .from('recursos_web')
    .getPublicUrl('foto-principal-hero.png');
    
  const cacheBuster = new Date().getTime();
  const urlFinalImagen = `${publicUrl}?v=${cacheBuster}`;

  // Extraemos el ID del video real (en playlistItems viene dentro de snippet.resourceId)
  const videoId = latestVideoItem?.snippet?.resourceId?.videoId || '';
  const videoTitle = latestVideoItem?.snippet?.title || 'Mensaje Reciente';

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black">
      
      {/* SECCIÓN 1: HERO */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-eden-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={urlFinalImagen} 
            alt="mires portada" 
            className="w-full h-full object-cover object-center grayscale opacity-60 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-eden-black/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center fade-in-up">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-eden-white leading-[0.95] tracking-tight mb-8 max-w-6xl">
            Su gracia escribe nuevas historias.
          </h1>
          <p className="font-sans text-sm md:text-base text-eden-stone mb-12 max-w-xl font-light tracking-[0.2em] uppercase">
            Una iglesia para ti y tu familia en la ciudad.
          </p>
          <Link href="/soy-nuevo" className="inline-flex items-center justify-center gap-3 bg-eden-white text-eden-black px-10 py-5 font-sans text-xs font-bold tracking-widest uppercase hover:bg-eden-stone transition-colors duration-300">
            Planifica tu visita <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* SECCIÓN 2: MANIFIESTO */}
      <section className="py-32 md:py-48 bg-eden-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-10 leading-tight text-eden-black tracking-tight">
            Personas que se aman, bendicen familias e influyen comunidades.
          </h2>
          <p className="font-sans text-lg md:text-xl text-eden-muted leading-relaxed max-w-2xl mx-auto font-light">
            No importa dónde te encuentres en tu viaje espiritual, en mires hay un lugar preparado para ti. Descubre el propósito que Dios tiene para tu vida junto a una comunidad genuina.
          </p>
        </div>
      </section>

      {/* SECCIÓN 3: PREDICACIONES (Filtrado estricto para Videos subidos) */}
      <section className="py-32 md:py-40 bg-eden-black text-eden-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-5/12 space-y-8">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-eden-muted">
                Mensaje Reciente
              </span>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] tracking-tight">
                Escucha la voz de Dios hoy.
              </h2>
              <p className="font-sans text-eden-stone/80 text-lg font-light leading-relaxed">
                Cada semana compartimos mensajes basados en la Biblia, diseñados para traer esperanza, dirección y propósito a tu vida cotidiana.
              </p>
              <a href="https://www.youtube.com/@miresCentral/videos" target="_blank" rel="noopener noreferrer" className="inline-flex mt-4 items-center gap-3 border border-eden-white/30 px-8 py-4 font-sans text-xs font-bold tracking-widest uppercase hover:bg-eden-white hover:text-eden-black transition-all duration-300">
                Ver más videos <ArrowRight size={16} />
              </a>
            </div>
            
            <div className="lg:w-7/12 w-full">
              <div className="aspect-video w-full bg-eden-white/5 relative overflow-hidden border border-eden-white/10">
                {videoId ? (
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`} 
                    title={videoTitle}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-eden-stone/50 text-sm tracking-widest uppercase">
                    Cargando último video...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: SEDES */}
      <section className="py-32 md:py-40 bg-eden-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-none text-eden-black tracking-tight">
              Encuentra <br/>tu lugar.
            </h2>
            <p className="font-sans text-eden-muted font-bold uppercase tracking-[0.2em] text-xs pb-4">
              Nuestras Congregaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {sedes?.map((sede) => (
              <div key={sede.id} className="group border-t border-eden-stone pt-8">
                <h3 className="font-serif text-3xl md:text-4xl mb-6 text-eden-black">{sede.nombre}</h3>
                <div className="space-y-4 mb-10 font-sans text-eden-muted font-light text-sm">
                  <p className="flex items-center gap-3"><Clock size={18} className="text-eden-black" /> {sede.horarios}</p>
                  <p className="flex items-start gap-3"><MapPin size={18} className="text-eden-black mt-0.5 shrink-0" /> <span className="leading-relaxed">{sede.direccion}</span></p>
                </div>
                {sede.map_url && (
                  <a href={sede.map_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-sans text-xs font-bold tracking-widest uppercase text-eden-black group-hover:text-eden-muted transition-colors">
                    Cómo llegar <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300"/>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}