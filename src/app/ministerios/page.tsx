import { createClient } from '@/utils/supabase/server';
import * as Icons from 'lucide-react';

export const metadata = { title: "Ministerios | mires" };

export default async function MinisteriosPage() {
  const supabase = await createClient();
  const { data: ministerios } = await supabase.from('ministerios').select('*').order('nombre');

  const { data: { publicUrl } } = supabase.storage.from('recursos_web').getPublicUrl('bg-ministerios.png');
  const cacheBuster = new Date().getTime();
  const urlFondo = `${publicUrl}?v=${cacheBuster}`;

  return (
    <div className="min-h-screen bg-eden-cream text-eden-black pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <header className="relative overflow-hidden mb-20 p-12 md:p-20 border border-eden-stone/50 bg-[#EDEAE2]">
          
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            {/* Eliminamos el onError y agregamos text-transparent */}
            <img 
              src={urlFondo} 
              alt="" 
              className="w-full h-full object-cover opacity-25 mix-blend-multiply text-transparent"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EDEAE2]/95 via-[#EDEAE2]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-eden-muted mb-4 block">Comunidad Activa</span>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tighter leading-none mb-6">Nuestros <br /> Ministerios.</h1>
            <p className="text-base md:text-lg text-eden-muted font-light leading-relaxed max-w-xl">
              Hay un lugar preparado para ti y tu familia. Descubre cómo puedes conectarte, crecer espiritualmente y servir al prójimo.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministerios?.map((min) => {
            const IconComponent = (Icons as any)[min.icono] || Icons.HelpCircle;
            return (
              <div key={min.id} className="bg-white border border-eden-stone/50 p-8 rounded-3xl flex flex-col justify-between h-full hover:border-eden-black transition-colors duration-300 shadow-sm">
                <div>
                  <div className="w-12 h-12 bg-eden-cream border border-eden-stone/40 rounded-2xl flex items-center justify-center mb-6 text-eden-black">
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-3 tracking-tight text-eden-black">{min.nombre}</h3>
                  <p className="text-xs font-light text-eden-muted leading-relaxed">{min.descripcion_corta}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-eden-stone/20 flex items-center justify-between text-xs font-bold tracking-widest uppercase text-eden-black group">
                  Saber más <Icons.ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}