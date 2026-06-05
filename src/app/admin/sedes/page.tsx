import { createClient } from '@/utils/supabase/server';
import { actualizarSede } from './actions';
import { Building, Save, MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Gestión de Sedes | Admin mires",
};

export default async function AdminSedesPage({
  searchParams,
}: {
  searchParams: { success: string };
}) {
  const supabase = await createClient();
  
  // Traemos todas las sedes de la base de datos
  const { data: sedes } = await supabase
    .from('sedes')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div className="p-8 md:p-12 font-sans max-w-5xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-950 flex items-center gap-3">
            <Building className="text-[#E8863A]" />
            Gestión de Sedes
          </h1>
          <p className="text-gray-600 mt-2">
            Actualiza la información de contacto y horarios de las congregaciones. Los cambios se reflejarán inmediatamente en la web.
          </p>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-gray-500 hover:text-[#1A2E4A] transition-colors border border-gray-200 px-4 py-2 rounded-lg bg-white">
          Volver al Inicio
        </Link>
      </header>

      {searchParams?.success && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl font-medium text-sm flex items-center gap-2">
          ✓ Los datos de la sede se actualizaron correctamente en la web en vivo.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sedes?.map((sede) => (
          <div key={sede.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50/70 p-4 border-b border-gray-100">
              <h2 className="font-serif font-bold text-xl text-[#1A2E4A]">{sede.nombre}</h2>
            </div>
            
            <form action={actualizarSede} className="p-6 space-y-5">
              <input type="hidden" name="id" value={sede.id} />
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                   Nombre Público
                </label>
                <input 
                  type="text" 
                  name="nombre" 
                  defaultValue={sede.nombre}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-gray-900" 
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                  <MapPin size={14} /> Dirección Exacta
                </label>
                <input 
                  type="text" 
                  name="direccion" 
                  defaultValue={sede.direccion || ''}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-gray-900" 
                  placeholder="Ej: Av. Vicuña Mackenna 1234, La Florida"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                  <Clock size={14} /> Horarios de Reunión
                </label>
                <input 
                  type="text" 
                  name="horarios" 
                  defaultValue={sede.horarios || ''}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-gray-900" 
                  placeholder="Ej: Domingos 10:00 y 12:00 hrs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                  <Phone size={14} /> Enlace de WhatsApp
                </label>
                <input 
                  type="url" 
                  name="whatsapp" 
                  defaultValue={sede.whatsapp || ''}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all text-gray-900" 
                  placeholder="Ej: https://wa.me/56912345678"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#1A2E4A] text-white font-semibold py-3 rounded-xl hover:bg-[#0f1d30] transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}