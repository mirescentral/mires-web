import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Ticket } from "lucide-react";

export const metadata = {
  title: "Eventos | MIRES",
  description: "Descubre nuestros próximos eventos y actividades para toda la familia.",
};

export default async function EventosPage() {
  const supabase = await createClient();
  
  // Consultamos los eventos futuros y hacemos un "join" con la tabla sedes para obtener el nombre de la sede
  const { data: eventos } = await supabase
    .from('eventos')
    .select(`
      id,
      titulo,
      fecha,
      registro_url,
      sedes ( nombre )
    `)
    // Filtramos para mostrar solo eventos de hoy en adelante
    .gte('fecha', new Date().toISOString())
    .order('fecha', { ascending: true });

  // Función para formatear la fecha a un formato amigable en español
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    const opcionesFecha: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    
    return {
      dia: fecha.toLocaleDateString('es-ES', opcionesFecha),
      hora: fecha.toLocaleTimeString('es-ES', opcionesHora)
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-mires-bg">
      
      {/* HEADER DE SECCIÓN */}
      <section className="bg-mires-primary text-mires-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Próximos Eventos
          </h1>
          <p className="font-sans text-lg md:text-xl text-mires-white/80 leading-relaxed">
            Nuestra iglesia es una comunidad en constante movimiento. Únete a nuestras próximas actividades, conferencias y reuniones especiales.
          </p>
        </div>
      </section>

      {/* LISTADO DE EVENTOS */}
      <section className="py-20 bg-mires-white">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Si no hay eventos programados */}
          {(!eventos || eventos.length === 0) && (
            <div className="text-center py-20 bg-mires-bg rounded-3xl border border-mires-primary/10">
              <CalendarIcon size={48} className="mx-auto text-mires-primary/30 mb-4" />
              <h3 className="font-display font-bold text-2xl text-mires-primary mb-2">
                No hay eventos próximos
              </h3>
              <p className="font-sans text-mires-textMuted">
                Estamos preparando nuevas actividades. Vuelve a revisar pronto.
              </p>
            </div>
          )}

          {/* Grid dinámica de eventos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {eventos?.map((evento) => {
              const { dia, hora } = formatearFecha(evento.fecha);
              // Forzamos el tipo para evitar el bloqueo estricto de TypeScript en la compilación
              const sedeData = evento.sedes as any;
              const nombreSede = Array.isArray(sedeData) 
                ? sedeData[0]?.nombre 
                : sedeData?.nombre;

              return (
                <div key={evento.id} className="bg-mires-bg rounded-3xl border border-mires-primary/5 hover:border-mires-accent/30 hover:shadow-lg transition-all flex flex-col overflow-hidden group">
                  
                  {/* Cabecera de la tarjeta del evento */}
                  <div className="bg-mires-primary/5 p-8 border-b border-mires-primary/5 relative overflow-hidden">
                    {/* Elemento decorativo */}
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-mires-accent/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10">
                      <span className="font-sans inline-block bg-mires-white text-mires-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-mires-accent/10">
                        Destacado
                      </span>
                      <h3 className="font-display font-bold text-2xl text-mires-primary leading-tight">
                        {evento.titulo}
                      </h3>
                    </div>
                  </div>

                  {/* Cuerpo de la tarjeta */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start gap-3 text-mires-textMuted">
                        <CalendarIcon size={20} className="text-mires-accent shrink-0" />
                        <span className="font-sans font-medium capitalize text-mires-textMain">{dia}</span>
                      </div>
                      <div className="flex items-center gap-3 text-mires-textMuted">
                        <Clock size={20} className="text-mires-accent shrink-0" />
                        <span className="font-sans">{hora}</span>
                      </div>
                      <div className="flex items-center gap-3 text-mires-textMuted">
                        <MapPin size={20} className="text-mires-accent shrink-0" />
                        <span className="font-sans">{nombreSede || 'Sede por confirmar'}</span>
                      </div>
                    </div>

                    {/* Botón de Registro (se empuja al fondo con mt-auto) */}
                    <Link 
                      href={evento.registro_url || '/contacto'} 
                      className="font-sans mt-auto w-full inline-flex items-center justify-center gap-2 bg-mires-primary text-mires-white hover:bg-mires-primary/90 px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 shadow-md"
                    >
                      <Ticket size={18} />
                      Saber más / Registrarme
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}