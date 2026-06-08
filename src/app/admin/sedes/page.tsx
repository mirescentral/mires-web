import { createClient } from '@/utils/supabase/server';
import { actualizarSede, crearSede, eliminarSede } from './actions';
import { Building, Save, MapPin, Clock, Phone, PlusCircle, Trash2, Map } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Gestión de Sedes | Admin MIRES",
};

// Blindaje Next.js 15: searchParams como Promesa
export default async function AdminSedesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const { data: sedes } = await supabase
    .from('sedes')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div className="p-8 md:p-12 font-sans max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 flex items-center gap-3">
            <Building className="text-[#E8863A]" />
            Gestión de Sedes
          </h1>
          <p className="text-gray-600 mt-2">
            Agrega nuevas congregaciones o actualiza la información de las existentes.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-gray-500 hover:text-[#1A2E4A] transition-colors border border-gray-200 px-4 py-2 rounded-lg bg-white">
          Volver al Inicio
        </Link>
      </header>

      {/* MENSAJES DE ÉXITO */}
      {params?.success === 'creado' && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium text-sm">✓ Nueva sede agregada correctamente al sistema.</div>
      )}
      {params?.success === 'actualizado' && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-medium text-sm">✓ Los datos de la sede se actualizaron en vivo.</div>
      )}
      {params?.success === 'eliminado' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium text-sm">✓ Sede eliminada del sistema permanentemente.</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: AGREGAR NUEVA SEDE */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h2 className="font-serif font-bold text-xl text-[#1A2E4A] mb-6 flex items-center gap-2">
              <PlusCircle size={20} className="text-[#E8863A]" />
              Agregar Sede
            </h2>
            <form action={crearSede} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Nombre Público</label>
                <input type="text" name="nombre" required placeholder="Ej: Mires La Florida" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Dirección</label>
                <input type="text" name="direccion" placeholder="Calle Ejemplo 123" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Horarios</label>
                <input type="text" name="horarios" placeholder="Domingos 10:00 AM" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Link de WhatsApp</label>
                <input type="url" name="whatsapp" placeholder="https://wa.me/..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Link Google Maps (Opcional)</label>
                <input type="url" name="map_url" placeholder="https://maps.app.goo.gl/..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] outline-none text-sm" />
              </div>
              <button type="submit" className="w-full bg-[#1A2E4A] text-white font-semibold py-3 rounded-xl hover:bg-[#0f1d30] transition-colors mt-2 text-sm">
                Crear Sede
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: EDITAR SEDES EXISTENTES */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sedes?.map((sede) => (
              <div key={sede.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                
                {/* Botón Eliminar en la esquina */}
                <form action={eliminarSede} className="absolute top-4 right-4 z-10">
                  <input type="hidden" name="id" value={sede.id} />
                  <button type="submit" onClick={(e) => {if(!confirm('¿Seguro que deseas eliminar esta sede?')) e.preventDefault()}} className="text-gray-400 hover:text-red-500 transition-colors bg-white/80 rounded-full p-1">
                    <Trash2 size={16} />
                  </button>
                </form>

                <div className="bg-gray-50/70 p-4 border-b border-gray-100 pr-12">
                  <h2 className="font-serif font-bold text-lg text-[#1A2E4A] truncate">{sede.nombre}</h2>
                </div>
              
                <form action={actualizarSede} className="p-5 space-y-4">
                  <input type="hidden" name="id" value={sede.id} />
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Nombre</label>
                    <input type="text" name="nombre" defaultValue={sede.nombre} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#E8863A] outline-none text-sm" required />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12} /> Dirección</label>
                    <input type="text" name="direccion" defaultValue={sede.direccion || ''} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#E8863A] outline-none text-sm" />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={12} /> Horarios</label>
                    <input type="text" name="horarios" defaultValue={sede.horarios || ''} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#E8863A] outline-none text-sm" />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Phone size={12} /> WhatsApp</label>
                    <input type="url" name="whatsapp" defaultValue={sede.whatsapp || ''} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#E8863A] outline-none text-sm" />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Map size={12} /> Google Maps URL</label>
                    <input type="url" name="map_url" defaultValue={sede.map_url || ''} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-[#E8863A] outline-none text-sm" />
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full bg-[#1A2E4A] text-white font-semibold py-2 rounded-lg hover:bg-[#0f1d30] transition-colors flex items-center justify-center gap-2 text-sm">
                      <Save size={16} /> Actualizar
                    </button>
                  </div>
                </form>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}