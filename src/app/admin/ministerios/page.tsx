import { createClient } from '@/utils/supabase/server';
import { actualizarMinisterio, crearMinisterio, eliminarMinisterio } from './actions';
import { HeartHandshake, Save, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Gestión de Ministerios | Admin MIRES",
};

// Lista de íconos disponibles de lucide-react para los ministerios
const iconosDisponibles = [
  { valor: 'Heart', etiqueta: 'Corazón (Amor/Cuidado)' },
  { valor: 'Users', etiqueta: 'Usuarios (Comunidad/Jóvenes)' },
  { valor: 'Music', etiqueta: 'Música (Alabanza)' },
  { valor: 'BookOpen', etiqueta: 'Libro (Enseñanza/Escuela)' },
  { valor: 'Baby', etiqueta: 'Bebé (Kids/Infantil)' },
  { valor: 'HandHeart', etiqueta: 'Mano con Corazón (Ayuda/Fundación)' },
  { valor: 'Coffee', etiqueta: 'Café (Punto de Encuentro)' },
];

export default async function AdminMinisteriosPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams; // Blindaje Next.js 15

  const { data: ministerios } = await supabase
    .from('ministerios')
    .select('*')
    .order('nombre', { ascending: true });

  return (
    <div className="p-8 md:p-12 font-sans max-w-7xl mx-auto pt-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E5E1] pb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 flex items-center gap-2">
            <HeartHandshake size={14} /> Grupos de Conexión
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-950 tracking-tight">
            Gestión de Ministerios
          </h1>
          <p className="text-[#737373] font-light mt-4 text-sm max-w-xl">
            Crea, edita o elimina los ministerios y áreas de servicio de la iglesia.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-gray-500 hover:text-[#1A2E4A] transition-colors border border-gray-200 px-4 py-2 rounded-lg bg-white shrink-0">
          Volver al Inicio
        </Link>
      </header>

      {/* ALERTAS */}
      {params?.success === 'creado' && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase text-center rounded-xl">✓ Nuevo ministerio creado correctamente.</div>
      )}
      {params?.success === 'actualizado' && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide uppercase text-center rounded-xl">✓ Ministerio actualizado con éxito en la web.</div>
      )}
      {params?.success === 'eliminado' && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold tracking-wide uppercase text-center rounded-xl">✓ Ministerio eliminado permanentemente.</div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* IZQUIERDA: CREAR MINISTERIO */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-6">
            <h2 className="font-serif font-bold text-xl text-[#1A2E4A] mb-6 flex items-center gap-2">
              <PlusCircle size={20} className="text-[#E8863A]" />
              Nuevo Ministerio
            </h2>
            <form action={crearMinisterio} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Nombre del Ministerio</label>
                <input type="text" name="nombre" required placeholder="Ej: Mires Kids" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Descripción Corta</label>
                <textarea name="descripcion_corta" rows={3} required placeholder="Un espacio para que los niños conozcan a Dios..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6] resize-none"></textarea>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Ícono Referencial</label>
                <select name="icono" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-1 focus:ring-black outline-none text-sm bg-[#F9F8F6]" required>
                  {iconosDisponibles.map(ico => <option key={ico.valor} value={ico.valor}>{ico.etiqueta}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-[#0A0A0A] text-white font-semibold py-3.5 text-xs tracking-widest uppercase hover:bg-[#737373] transition-colors mt-6 rounded-lg">
                Crear Ministerio
              </button>
            </form>
          </div>
        </div>

        {/* DERECHA: EDITAR MINISTERIOS */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ministerios?.length === 0 ? (
               <p className="text-gray-500 text-sm">No hay ministerios creados aún.</p>
            ) : (
              ministerios?.map((min) => (
                <div key={min.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
                  
                  {/* Botón Eliminar Oculto hasta Hover */}
                  <form action={eliminarMinisterio} className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <input type="hidden" name="id" value={min.id} />
                    <button type="submit" onClick={(e) => {if(!confirm(`¿Seguro que deseas eliminar el ministerio ${min.nombre}?`)) e.preventDefault()}} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </form>

                  <div className="bg-[#F9F8F6] p-5 border-b border-gray-100 pr-14">
                    <h2 className="font-serif font-bold text-xl text-[#0A0A0A] truncate">{min.nombre}</h2>
                  </div>
                
                  <form action={actualizarMinisterio} className="p-6 space-y-5">
                    <input type="hidden" name="id" value={min.id} />
                    
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Nombre</label>
                      <input type="text" name="nombre" defaultValue={min.nombre} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors" required />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Descripción</label>
                      <textarea name="descripcion_corta" rows={3} defaultValue={min.descripcion_corta} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors resize-none" required></textarea>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Ícono</label>
                      <select name="icono" defaultValue={min.icono || 'Heart'} className="w-full border-b border-gray-200 focus:border-black py-2 outline-none text-sm text-[#0A0A0A] transition-colors">
                        {iconosDisponibles.map(ico => <option key={ico.valor} value={ico.valor}>{ico.etiqueta}</option>)}
                      </select>
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="w-full bg-white border border-[#E6E5E1] text-[#0A0A0A] font-semibold py-3 text-xs tracking-widest uppercase hover:border-[#0A0A0A] transition-colors flex items-center justify-center gap-2 rounded-lg">
                        <Save size={16} strokeWidth={1.5} /> Actualizar
                      </button>
                    </div>
                  </form>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}