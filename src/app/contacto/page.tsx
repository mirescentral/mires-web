import { createClient } from '@/utils/supabase/server';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import FormularioContacto from './FormularioContacto';

export const metadata = {
  title: "Contacto | mires",
};

export default async function ContactoPage() {
  const supabase = await createClient();
  const { data: sedes } = await supabase.from('sedes').select('*').order('nombre');

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black pt-24 md:pt-32">
      <section className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center fade-in-up">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-eden-muted mb-6 block">
            Conecta con nosotros
          </span>
          <h1 className="font-serif-eden text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] mb-8 text-eden-black">
            Estamos aquí <br className="hidden md:block" /> para ti.
          </h1>
          <p className="font-sans text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl mx-auto">
            Ya sea que tengas una petición de oración o preguntas sobre nuestros ministerios, nos encantaría escucharte.
          </p>
        </div>
      </section>

      <section className="py-24 bg-eden-white border-t border-eden-stone">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            <FormularioContacto />
            
            <div>
              <h2 className="font-serif-eden text-4xl md:text-5xl mb-12">Nuestras Congregaciones</h2>
              <div className="space-y-12">
                {sedes?.map((sede) => (
                  <div key={sede.id} className="border-b border-eden-stone/50 pb-8">
                    <h3 className="font-sans text-xl font-medium tracking-wide mb-4 text-eden-black">{sede.nombre}</h3>
                    <div className="space-y-3 font-sans text-sm font-light text-eden-muted mb-6">
                      <p className="flex items-center gap-3"><Clock size={16} className="text-eden-black" /> {sede.horarios}</p>
                      <p className="flex items-start gap-3"><MapPin size={16} className="text-eden-black mt-1 shrink-0" /> <span className="leading-relaxed">{sede.direccion || 'Dirección por confirmar'}</span></p>
                    </div>
                    {sede.whatsapp && (
                      <a href={sede.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-eden-black hover:text-eden-muted transition-colors">
                        <MessageCircle size={16} /> Contactar por WhatsApp
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}