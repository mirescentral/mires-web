import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { ArrowLeft, Users, Phone, MapPin, Calendar, ExternalLink } from 'lucide-react';

export const metadata = {
  title: "Nuevos Visitantes | Admin MIRES",
};

export default async function AdminVisitantesPage() {
  const supabase = await createClient();

  // Traemos los visitantes ordenados por los más recientes y conectamos con la tabla sedes
  const { data: visitantes } = await supabase
    .from('visitantes')
    .select(`
      *,
      sedes ( nombre )
    `)
    .order('created_at', { ascending: false });

  // Función para limpiar el número y generar link directo de WhatsApp
  const generarLinkWhatsApp = (telefono: string) => {
    const numeroLimpio = telefono.replace(/\D/g, ''); // Quita espacios y símbolos
    return `https://wa.me/${numeroLimpio}`;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A0A0A] p-8 md:p-12 font-sans max-w-6xl mx-auto pt-32">
      
      {/* CABECERA */}
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E6E5E1]">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 block flex items-center gap-2">
            <Users size={14} /> CRM Consolidación
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            Nuevos Visitantes
          </h1>
          <p className="text-[#737373] font-light mt-4 text-sm max-w-xl">
            Base de datos en tiempo real de las personas que planificaron su visita a través de la plataforma web.
          </p>
        </div>
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors shrink-0"
        >
          <ArrowLeft size={14} /> Volver al Inicio
        </Link>
      </header>

      {/* LISTA DE VISITANTES */}
      <div className="bg-white border border-[#E6E5E1] shadow-sm">
        
        {/* Encabezado de Tabla (Visible solo en Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-[#E6E5E1] bg-[#F9F8F6] text-xs font-bold tracking-widest uppercase text-[#737373]">
          <div className="col-span-3">Nombre Completo</div>
          <div className="col-span-3">Sede de Interés</div>
          <div className="col-span-3">Fecha de Registro</div>
          <div className="col-span-3 text-right">Contacto</div>
        </div>

        {/* Filas de Datos */}
        <div className="divide-y divide-[#E6E5E1]">
          {visitantes && visitantes.length > 0 ? (
            visitantes.map((visitante) => (
              <div key={visitante.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center hover:bg-[#F9F8F6]/50 transition-colors">
                
                {/* Nombre */}
                <div className="col-span-3">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-[#737373] block mb-1">Nombre:</span>
                  <p className="font-serif text-xl md:text-lg text-[#0A0A0A]">{visitante.nombre}</p>
                </div>

                {/* Sede */}
                <div className="col-span-3">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-[#737373] block mb-1">Iglesia:</span>
                  <p className="text-sm font-light text-[#0A0A0A] flex items-center gap-2">
                    <MapPin size={14} className="text-[#737373]" />
                    {visitante.sedes?.nombre || 'Sede no especificada'}
                  </p>
                </div>

                {/* Fecha */}
                <div className="col-span-3">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-[#737373] block mb-1">Registro:</span>
                  <p className="text-sm font-light text-[#0A0A0A] flex items-center gap-2">
                    <Calendar size={14} className="text-[#737373]" />
                    {new Date(visitante.created_at).toLocaleDateString('es-CL', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                {/* Acción (WhatsApp) */}
                <div className="col-span-3 md:text-right mt-4 md:mt-0">
                  <a 
                    href={generarLinkWhatsApp(visitante.whatsapp)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#0A0A0A] text-white px-6 py-3 text-[10px] font-bold tracking-widest uppercase hover:bg-[#737373] transition-colors"
                  >
                    <Phone size={12} /> Contactar <ExternalLink size={12} className="ml-1 opacity-50" />
                  </a>
                </div>

              </div>
            ))
          ) : (
            <div className="p-12 text-center text-[#737373]">
              <Users size={32} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm font-light tracking-wide">Aún no hay registros de visitantes nuevos.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}