import { createClient } from '@/utils/supabase/server';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = { title: "Eventos | MIRES" };

export default async function EventosPage() {
  const supabase = await createClient();
  const { data: eventos } = await supabase
    .from('eventos')
    .select('*, sedes(nombre)')
    .gte('fecha', new Date().toISOString())
    .order('fecha', { ascending: true });

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-eden-black text-eden-white pt-24 md:pt-32">
      
      {/* HEADER OSCURO */}
      <section className="py-24 md:py-32 px-6 border-b border-eden-white/10">
        <div className="container mx-auto max-w-4xl text-center fade-in-up">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-eden-stone/60 mb-6 block">Cartelera</span>
          <h1 className="font-serif-eden text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tighter leading-[0.95]">Lo que está <br className="hidden md:block"/> pasando.</h1>
          <p className="font-sans text-lg md:text-xl text-eden-stone/80 font-light leading-relaxed max-w-2xl mx-auto">
            Mantente al día con nuestras próximas actividades, reuniones y eventos especiales.
          </p>
        </div>
      </section>

      {/* LISTA DE EVENTOS EN FILAS */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          {!eventos || eventos.length === 0 ? (
            <div className="text-center py-20 border border-eden-white/10">
              <p className="font-sans text-eden-stone/60 font-light tracking-widest uppercase text-sm">No hay eventos próximos programados.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {eventos.map((evento) => {
                const sedeData = evento.sedes as any;
                const nombreSede = Array.isArray(sedeData) ? sedeData[0]?.nombre : sedeData?.nombre;
                return (
                  <div key={evento.id} className="group border-b border-eden-white/10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-eden-white/5 transition-colors px-6">
                    <div>
                      <p className="font-sans text-eden-stone/60 text-xs font-semibold tracking-widest uppercase mb-3 flex items-center gap-2">
                        <Calendar size={14} /> {formatearFecha(evento.fecha)}
                      </p>
                      <h2 className="font-serif-eden text-3xl md:text-4xl text-eden-white">{evento.titulo}</h2>
                      {nombreSede && <p className="font-sans text-eden-stone font-light mt-3">{nombreSede}</p>}
                    </div>
                    {evento.registro_url && (
                      <a href={evento.registro_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-eden-white hover:text-eden-stone transition-colors border border-eden-white/30 px-6 py-3 rounded-full shrink-0">
                        Registrarse <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}