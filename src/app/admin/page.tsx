import { createClient } from '@/utils/supabase/server';
import { Users, Calendar as CalendarIcon, LogOut, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Admin Dashboard | MIRES",
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Traemos los últimos visitantes registrados en la base de datos
  const { data: visitantes } = await supabase
    .from('visitantes')
    .select('*')
    .order('created_at', { ascending: false });

  // Función interna para formatear la fecha a horario de Chile
  const formatearFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* BARRA LATERAL DE NAVEGACIÓN */}
      <aside className="w-64 bg-[#1A2E4A] text-white p-6 flex flex-col shrink-0">
        <div className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-[#E8863A] tracking-tight">MIRES Admin</h2>
          <p className="text-xs text-gray-400 mt-1 font-sans">Panel de Control Interno</p>
        </div>
        
        <nav className="flex-1 space-y-2 font-sans">
          <Link href="/admin" className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-semibold transition-all">
            <Users size={18} className="text-[#E8863A]" />
            Nuevos Visitantes
          </Link>
          <Link href="/admin/sedes" className="flex items-center gap-3 hover:bg-white/5 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all">
            <Building size={18} />
            Gestión de Sedes
          </Link>
          <Link href="/admin/eventos" className="flex items-center gap-3 hover:bg-white/5 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all">
            <CalendarIcon size={18} />
            Gestionar Eventos
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors font-sans px-4 py-2 text-sm">
            <LogOut size={16} />
            Volver a la Web
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-8 font-sans">
          <h1 className="text-3xl font-serif font-bold text-gray-950">Registro de Nuevos Visitantes</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y contacta a las personas que completaron el formulario "Soy Nuevo" en la web.
          </p>
        </header>

        {/* TABLA DE DATOS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5">Fecha de Registro</th>
                  <th className="p-5">Nombre Completo</th>
                  <th className="p-5">WhatsApp / Contacto</th>
                  <th className="p-5">Sede de Interés</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {!visitantes || visitantes.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400">
                      Aún no se han registrado nuevos visitantes en la base de datos.
                    </td>
                  </tr>
                ) : (
                  visitantes.map((visita) => (
                    <tr key={visita.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-5 text-gray-500 whitespace-nowrap">
                        {formatearFecha(visita.created_at)}
                      </td>
                      <td className="p-5 font-semibold text-gray-900">
                        {visita.nombre}
                      </td>
                      <td className="p-5 whitespace-nowrap">
                        <a 
                          href={`https://wa.me/${visita.whatsapp.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium group"
                        >
                          <Phone size={16} className="text-green-500" />
                          <span className="group-hover:underline">{visita.whatsapp}</span>
                        </a>
                      </td>
                      <td className="p-5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          <MapPin size={12} />
                          {visita.sede_interes || 'No especificada'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
    </div>
  );
}