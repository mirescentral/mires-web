import { createClient } from '@/utils/supabase/server';
import { Users, Calendar as CalendarIcon, LogOut, Mail, Building, Clock } from 'lucide-react';
import Link from 'next/link';


export const metadata = {
  title: "Bandeja de Entrada | Admin MIRES",
};

export const dynamic = 'force-dynamic';
export default async function AdminMensajesPage() {
  const supabase = await createClient();
  
  // Leemos los mensajes reales de la tabla mensajes_contacto que creamos en Supabase
  const { data: mensajes } = await supabase
    .from('mensajes_contacto')
    .select('*')
    .order('created_at', { ascending: false });

  const formatearFecha = (fechaString: string) => {
    return new Date(fechaString).toLocaleDateString('es-CL', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
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
          <Link href="/admin" className="flex items-center gap-3 hover:bg-white/5 text-gray-300 hover:text-white px-4 py-3 rounded-xl transition-all">
            <Users size={18} />
            Nuevos Visitantes
          </Link>
          <Link href="/admin/mensajes" className="flex items-center gap-3 bg-white/10 text-white px-4 py-3 rounded-xl font-semibold transition-all">
            <Mail size={18} className="text-[#E8863A]" />
            Bandeja de Entrada
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
      <main className="flex-1 p-8 md:p-12 overflow-y-auto font-sans">
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-950">Bandeja de Entrada</h1>
          <p className="text-gray-600 mt-2">
            Preguntas, comentarios y peticiones enviados desde el formulario de la página de Contacto.
          </p>
        </header>

        {/* LISTA DE MENSAJES ESTILO FEED */}
        <div className="space-y-4 max-w-4xl">
          {!mensajes || mensajes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
              No hay mensajes nuevos en la bandeja de entrada.
            </div>
          ) : (
            mensajes.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{msg.nombre}</h3>
                    <p className="text-sm text-[#E8863A] font-medium mt-0.5">{msg.email}</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1 w-fit h-fit">
                    <Clock size={12} /> {formatearFecha(msg.created_at)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.mensaje}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}