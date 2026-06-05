import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export const metadata = { title: "Planifica tu Visita | MIRES" };

export default async function SoyNuevoPage() {
  const supabase = await createClient();
  const { data: sedes } = await supabase.from('sedes').select('*').order('nombre');

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black pt-32">
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center fade-in-up">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-eden-muted mb-6 block">Bienvenido a Casa</span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] mb-8">Nos alegra <br/> que estés aquí.</h1>
          <p className="font-sans text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl mx-auto">
            Queremos que te sientas en familia desde el momento en que cruzas la puerta. Prepara tu visita este domingo.
          </p>
        </div>
      </section>

      <section className="py-24 bg-eden-white border-t border-eden-stone">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="font-serif text-4xl mb-12">Nuestras Reuniones</h2>
              <div className="space-y-12">
                {sedes?.map((sede) => (
                  <div key={sede.id} className="border-b border-eden-stone pb-8">
                    <h3 className="font-sans text-xl font-medium tracking-wide mb-4">{sede.nombre}</h3>
                    <div className="space-y-3 font-sans text-sm font-light text-eden-muted">
                      <p className="flex items-center gap-3"><Clock size={16} className="text-eden-black" /> {sede.horarios}</p>
                      <p className="flex items-start gap-3"><MapPin size={16} className="text-eden-black mt-1 shrink-0" /> <span>{sede.direccion}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-eden-cream p-10 md:p-16 border border-eden-stone/40">
              <h2 className="font-serif text-3xl mb-8">Déjanos tus datos</h2>
              <form action="/api/visita" method="POST" className="space-y-8 font-sans">
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">Nombre Completo</label>
                  <input type="text" name="nombre" required className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">WhatsApp</label>
                  <input type="tel" name="whatsapp" required className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none" />
                </div>
                <button type="submit" className="w-full bg-eden-black text-eden-white font-semibold py-5 text-xs tracking-[0.2em] uppercase hover:bg-eden-muted transition-colors flex items-center justify-center gap-3 mt-4">
                  Confirmar Visita <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}