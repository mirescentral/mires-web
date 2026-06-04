import { createClient } from '@/utils/supabase/server';
import { crearEvento, eliminarEvento } from './actions';
import { CalendarIcon, Trash2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Gestión de Eventos | Admin MIRES",
};

export default async function AdminEventosPage({
  searchParams,
}: {
  searchParams: { success: string };
}) {
  const supabase = await createClient();
  
  // 1. Traemos los eventos futuros ordenados por fecha
  const { data: eventos } = await supabase
    .from('eventos')
    .select('*, sedes(nombre)')
    .gte('fecha', new Date().toISOString())
    .order('fecha', { ascending: true });

  // 2. Traemos las sedes para el menú desplegable del formulario
  const { data: sedes } = await supabase.from('sedes').select('id, nombre');

  const formatearFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-CL', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="p-8 md:p-12 font-sans max-w-6xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 flex items-center gap-3">
            <CalendarIcon className="text-[#E8863A]" />
            Cartelera de Eventos
          </h1>
          <p className="text-gray-600 mt-2">
            Agrega o elimina actividades. Los cambios se reflejarán inmediatamente en la sección "Eventos".
          </p>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-gray-500 hover:text-[#1A2E4A] transition-colors border border-gray-200 px-4 py-2 rounded-lg bg-white">
          Volver al Inicio
        </Link>
      </header>

      {searchParams?.success && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium text-sm flex items-center gap-2">
          ✓ El evento se publicó correctamente en la web.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: Formulario para crear evento */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="font-serif font-bold text-xl text-[#1A2E4A] mb-6 flex items-center gap-2">
              <PlusCircle size={20} className="text-[#E8863A]" />
              Nuevo Evento
            </h2>
            <form action={crearEvento} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Título del Evento</label>
                <input 
                  type="text" name="titulo" required
                  placeholder="Ej: Noche de Adoración"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-sm" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Fecha y Hora</label>
                <input 
                  type="datetime-local" name="fecha" required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-sm" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Sede</label>
                <select name="sede_id" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] outline-none text-sm bg-white">
                  <option value="">Selecciona una sede...</option>
                  {sedes?.map(sede => (
                    <option key={sede.id} value={sede.id}>{sede.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Link de Registro (Opcional)</label>
                <input 
                  type="url" name="registro_url"
                  placeholder="https://forms.gle/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-sm" 
                />
              </div>
              <button type="submit" className="w-full bg-[#1A2E4A] text-white font-semibold py-3 rounded-xl hover:bg-[#0f1d30] transition-colors mt-2 text-sm">
                Publicar Evento
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: Lista de eventos activos */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-serif font-bold text-xl text-[#1A2E4A] mb-4">Eventos Activos</h2>
          
          {!eventos || eventos.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-500 text-sm">
              No hay eventos futuros programados.
            </div>
          ) : (
            eventos.map((evento) => {
              // Manejo seguro de la relación de sede
              const nombreSede = Array.isArray(evento.sedes) ? evento.sedes[0]?.nombre : evento.sedes?.nombre;
              
              return (
                <div key={evento.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{evento.titulo}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded-md">{formatearFecha(evento.fecha)}</span>
                      {nombreSede && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{nombreSede}</span>}
                    </div>
                  </div>
                  
                  <form action={eliminarEvento}>
                    <input type="hidden" name="id" value={evento.id} />
                    <button type="submit" className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold" title="Eliminar Evento" onClick={(e) => {
                      if(!confirm('¿Estás seguro de eliminar este evento?')) e.preventDefault();
                    }}>
                      <Trash2 size={18} />
                      <span className="sm:hidden">Eliminar</span>
                    </button>
                  </form>
                </div>
              )
            })
          )}
        </div>

      </div>
    </div>
  );
}