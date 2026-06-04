import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { Users, Coffee, Smile, Heart, Music, Globe, ArrowRight, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Ministerios | MIRES",
  description: "Descubre dónde puedes conectar, crecer y servir en nuestra comunidad.",
};

// Mapa de iconos dinámicos (igual que en el Home)
const IconMap: Record<string, React.ElementType> = {
  Users, Coffee, Smile, Heart, Music, Globe
};

export default async function MinisteriosPage() {
  const supabase = await createClient();
  const { data: ministerios } = await supabase.from('ministerios').select('*').order('nombre');

  return (
    <div className="flex flex-col min-h-screen bg-mires-bg">
      
      {/* HEADER SIMPLE DE SECCIÓN */}
      <section className="bg-mires-primary text-mires-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Hay un lugar para ti
          </h1>
          <p className="font-sans text-lg md:text-xl text-mires-white/80 leading-relaxed">
            Creemos que la vida cristiana no se vive en aislamiento. Conoce nuestros ministerios y encuentra el espacio ideal para conectar, crecer y usar tus talentos.
          </p>
        </div>
      </section>

      {/* GRID DE MINISTERIOS */}
      <section className="py-20 bg-mires-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministerios?.map((min) => {
              const IconoComponente = IconMap[min.icono] || Users; // Fallback de seguridad
              
              return (
                <div key={min.id} className="bg-mires-bg rounded-3xl p-8 border border-mires-primary/5 hover:border-mires-accent/30 hover:shadow-lg transition-all group flex flex-col h-full">
                  <div className="w-14 h-14 bg-mires-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm mb-6 text-mires-primary group-hover:bg-mires-accent group-hover:text-mires-white transition-colors duration-300">
                    <IconoComponente size={28} />
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl text-mires-primary mb-3">
                    {min.nombre}
                  </h3>
                  
                  {/* Flex-grow empuja el enlace hacia abajo para que todas las tarjetas tengan la misma altura */}
                  <p className="font-sans text-mires-textMuted leading-relaxed mb-8 flex-grow">
                    {min.descripcion_corta}
                  </p>
                  
                  <Link 
                    href="/contacto" 
                    className="font-sans inline-flex items-center gap-2 text-mires-primary font-bold hover:text-mires-accent transition-colors mt-auto w-fit"
                  >
                    Quiero participar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="py-20 bg-mires-primary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-20 h-20 bg-mires-white rounded-full flex items-center justify-center text-mires-accent mx-auto mb-6 shadow-sm">
            <HeartHandshake size={40} />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-4">
            ¿No estás seguro por dónde empezar?
          </h2>
          <p className="font-sans text-mires-textMuted mb-8 text-lg">
            Si tienes dudas sobre qué ministerio es el mejor para ti o para tu familia, escríbenos. Nos encantaría orientarte y ayudarte a dar tu primer paso.
          </p>
          <Link 
            href="/contacto"
            className="font-sans inline-flex items-center justify-center gap-2 bg-mires-primary hover:bg-mires-primary/90 text-mires-white px-8 py-4 rounded-full font-bold text-base transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Hablar con un coordinador
          </Link>
        </div>
      </section>

    </div>
  );
}