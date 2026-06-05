import Link from 'next/link';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Image as ImageIcon, 
  HeartHandshake, 
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';

export const metadata = {
  title: "Panel de Administración | MIRES",
};

export default function AdminDashboardPage() {
  const modulos = [
    { 
      nombre: "Nuevos Visitantes", 
      descripcion: "Revisa la base de datos de las personas que llenaron el formulario 'Soy Nuevo'.", 
      icono: Users, 
      href: "/admin/visitantes" 
    },
    { 
      nombre: "Gestión de Eventos", 
      descripcion: "Agrega, edita o elimina actividades del calendario de la iglesia.", 
      icono: Calendar, 
      href: "/admin/eventos" 
    },
    { 
      nombre: "Archivo Multimedia", 
      descripcion: "Actualiza la fotografía de portada principal y otros recursos.", 
      icono: ImageIcon, 
      href: "/admin/multimedia" 
    },
    { 
      nombre: "Ministerios", 
      descripcion: "Administra los grupos de conexión y la información de cada ministerio.", 
      icono: HeartHandshake, 
      href: "/admin/ministerios" 
    },
    { 
      nombre: "Sedes y Horarios", 
      descripcion: "Actualiza las direcciones, enlaces de mapas y horarios de reuniones.", 
      icono: MapPin, 
      href: "/admin/sedes" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A0A0A] p-8 md:p-12 font-sans pt-32">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA DEL PANEL */}
        <header className="mb-16 border-b border-[#E6E5E1] pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#0A0A0A] flex items-center justify-center text-white rounded-none">
              <LayoutDashboard size={24} strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#737373] block mb-1">
                Workspace Privado
              </span>
              <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
                Centro de Mando MIRES
              </h1>
            </div>
          </div>
          <p className="text-[#737373] font-light mt-4 max-w-2xl text-sm md:text-base">
            Bienvenido al panel de administración. Selecciona el módulo que deseas gestionar para mantener la plataforma web actualizada en tiempo real.
          </p>
        </header>

        {/* GRID DE MÓDULOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulos.map((modulo, index) => {
            const Icono = modulo.icono;
            return (
              <Link 
                key={index} 
                href={modulo.href}
                className="group bg-white border border-[#E6E5E1] p-8 hover:border-[#0A0A0A] transition-colors duration-300 flex flex-col justify-between min-h-[240px]"
              >
                <div>
                  <div className="w-10 h-10 bg-[#F9F8F6] flex items-center justify-center mb-6 text-[#0A0A0A] group-hover:scale-110 transition-transform duration-300">
                    <Icono size={20} strokeWidth={1.5} />
                  </div>
                  <h2 className="font-serif text-2xl mb-3 text-[#0A0A0A]">
                    {modulo.nombre}
                  </h2>
                  <p className="font-sans text-xs font-light text-[#737373] leading-relaxed">
                    {modulo.descripcion}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#0A0A0A]">
                  Gestionar <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}