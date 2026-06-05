import { ArrowRight, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export const metadata = { title: "Planifica tu Visita | mires" };

export default async function SoyNuevoPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ success?: string, error?: string }> 
}) {
  const supabase = await createClient();
  const { data: sedes } = await supabase.from('sedes').select('*').order('nombre');

  const { data: { publicUrl } } = supabase.storage.from('recursos_web').getPublicUrl('bg-soy-nuevo.png');
  const cacheBuster = new Date().getTime();
  const urlFondo = `${publicUrl}?v=${cacheBuster}`;

  // Resolvemos la promesa en Next.js 15
  const params = await searchParams;

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

            <div className="relative overflow-hidden p-10 md:p-16 border border-eden-stone/40 bg-[#EDEBE6]">
              
              <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img 
                  src={urlFondo} 
                  alt="" 
                  className="w-full h-full object-cover opacity-25 mix-blend-multiply text-transparent"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#EDEBE6]/70 via-[#EDEBE6]/90 to-white/60" />
              </div>

              <div className="relative z-10">
                
                {/* Leemos de 'params' que ya fue resuelto arriba */}
                {params?.success ? (
                  <div className="bg-green-50 border border-green-200 p-8 text-center space-y-4 mb-8">
                    <CheckCircle2 size={40} className="mx-auto text-green-600" />
                    <h3 className="font-serif text-2xl text-green-900">¡Te esperamos!</h3>
                    <p className="text-sm font-light text-green-800">
                      Hemos recibido tus datos correctamente. Nuestro equipo se pondrá en contacto contigo muy pronto para recibirte este domingo.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-3xl mb-8">Déjanos tus datos</h2>
                    
                    {params?.error && (
                      <div className="mb-6 p-4 text-xs font-bold text-red-600 border border-red-200 bg-red-50 uppercase tracking-widest text-center">
                        Ocurrió un error. Por favor, intenta nuevamente.
                      </div>
                    )}

                    <form action="/api/visita" method="POST" className="space-y-8 font-sans">
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">Nombre Completo</label>
                        <input type="text" name="nombre" required placeholder="Ej. Ana Silva" className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">WhatsApp</label>
                        <input type="tel" name="whatsapp" required placeholder="+56 9 0000 0000" className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">¿A qué iglesia asistirás?</label>
                        <div className="relative">
                          <select 
                            name="sede_id" required defaultValue=""
                            className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none appearance-none rounded-none cursor-pointer transition-colors text-eden-black"
                          >
                            <option value="" disabled className="text-eden-muted">Selecciona una sede</option>
                            {sedes?.map((sede) => (
                              <option key={sede.id} value={sede.id} className="bg-eden-cream text-eden-black">{sede.nombre}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-eden-muted">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-eden-black text-eden-white font-semibold py-5 text-xs tracking-[0.2em] uppercase hover:bg-eden-muted transition-colors flex items-center justify-center gap-3 mt-4 rounded-none">
                        Confirmar Visita <ArrowRight size={16} />
                      </button>
                    </form>
                  </>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}