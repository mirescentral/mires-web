import { createClient } from '@/utils/supabase/server';
import { actualizarSede, crearSede, eliminarSede } from './actions';
import { Building, Save, MapPin, Clock, Phone, PlusCircle, Trash2, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';
import BotonEliminarSede from '@/app/admin/sedes/BotonEliminarSede';

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
  // Resolviendo la promesa asíncrona (Esto elimina el Error 500)
  const params = await searchParams;

  const { data: sedes } = await supabase
    .from('sedes')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div className="p-8 md:p-12 font-sans max-w-7xl mx-auto pt-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E5E1] pb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 flex items-center gap-2">
            <Building size={14} /> Red de Congregaciones
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-950 tracking-tight">
            Gestión de Sedes
          </h1>
          <p className="text-[#737373] font-light mt-4 text-sm max-w-xl">
            Agrega nuevas sedes al sistema o actualiza los horarios y direcciones de las existentes.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-gray-500 hover:text-[#1A2E4A] transition-colors border border-gray-200 px-4 py-2 rounded-lg bg-white shrink-0">
          Volver al Inicio
        </Link>
      </header>

      {/* ALERTAS DE ÉXITO */}
      {params?.success === 'creado' && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase text-center rounded-xl">✓ Nueva sede agregada correctamente al sistema.</div>
      )}
      {params?.success === 'actualizado' && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide uppercase text-center rounded-xl">✓ Los datos de la sede se actualizaron en vivo.</div>
      )}
      {params?.success === 'eliminado' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold tracking-wide uppercase text-center rounded-xl">✓ Sede eliminada permanentemente del sistema.</div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: AGREGAR NUEVA SEDE */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-6">
            <h2 className="font-serif font-bold text-xl text-[#1A2E4A] mb-6 flex items-center gap-2">
              <PlusCircle size={20} className="text-[#E8863A]" />
              Agregar Nueva Sede
            </h2>
            <form action={crearSede} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Nombre Público</label>
                <input type="text" name="nombre" required placeholder="Ej: Mires La Florida" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Dirección</label>
                <input type="text" name="direccion" placeholder="Calle Ejemplo 123" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Horarios</label>
                <input type="text" name="horarios" placeholder="Domingos 10:00 AM" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">WhatsApp</label>
                <input type="url" name="whatsapp" placeholder="https://wa.me/56900000000" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">URL Google Maps</label>
                <input type="url" name="map_url" placeholder="https://maps.app.goo.gl/..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" />
              </div>
              <button type="submit" className="w-full bg-[#0A0A0A] text-white font-semibold py-3.5 text-xs tracking-widest uppercase hover:bg-[#737373] transition-colors mt-6 rounded-lg">
                Crear Congregación
              </button>
            </form>
          </div>
        </div>

        {/* COLUMNA DERECHA: EDITAR SEDES EXISTENTES */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sedes?.map((sede) => (
              <div key={sede.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
                
                {/* Botón Eliminar Oculto hasta hacer hover */}
                <form action={eliminarSede} className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={sede.id} />
                  <BotonEliminarSede nombre={sede.nombre} />
                </form>

                <div className="bg-[#F9F8F6] p-5 border-b border-gray-100 pr-14">
                  <h2 className="font-serif font-bold text-xl text-[#0A0A0A] truncate">{sede.nombre}</h2>
                </div>
              
                <form action={actualizarSede} className="p-6 space-y-5">
                  <input type="hidden" name="id" value={sede.id} />
                  
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Nombre</label>
                    <input type="text" name="nombre" defaultValue={sede.nombre} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors" required />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={12} /> Dirección</label>
                    <input type="text" name="direccion" defaultValue={sede.direccion || ''} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors" />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Clock size={12} /> Horarios</label>
                    <input type="text" name="horarios" defaultValue={sede.horarios || ''} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1"><Phone size={12} /> WhatsApp</label>
                      <input type="url" name="whatsapp" defaultValue={sede.whatsapp || ''} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1"><MapIcon size={12} /> Google Maps</label>
                      <input type="url" name="map_url" defaultValue={sede.map_url || ''} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="w-full bg-white border border-[#E6E5E1] text-[#0A0A0A] font-semibold py-3 text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors flex items-center justify-center gap-2 rounded-lg">
                      <Save size={16} strokeWidth={1.5} /> Actualizar
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