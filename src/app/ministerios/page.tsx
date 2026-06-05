import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export const metadata = { title: "Ministerios | MIRES" };

export default async function MinisteriosPage() {
  const supabase = await createClient();
  const { data: ministerios } = await supabase.from('ministerios').select('*').order('nombre');

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black pt-24 md:pt-32">
      
      {/* HEADER EDITORIAL */}
      <section className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center fade-in-up">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-eden-muted mb-6 block">Comunidad</span>
          <h1 className="font-serif-eden text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] mb-8">Diseñados para <br className="hidden md:block"/> conectar.</h1>
          <p className="font-sans text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl mx-auto">
            No fuiste creado para caminar solo. Únete a un espacio donde podrás crecer, servir y hacer amistades con propósito.
          </p>
        </div>
      </section>

      {/* LISTA MINIMALISTA */}
      <section className="py-24 bg-eden-white border-t border-eden-stone">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {ministerios?.map((min) => (
              <div key={min.id} className="group border-t border-eden-stone pt-8">
                <h2 className="font-serif-eden text-4xl mb-4 text-eden-black">{min.nombre}</h2>
                <p className="font-sans text-eden-muted font-light leading-relaxed mb-8">{min.descripcion}</p>
                <Link href={`/${min.slug || '#'}`} className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase text-eden-black group-hover:text-eden-muted transition-colors">
                  Conoce más <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300"/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}