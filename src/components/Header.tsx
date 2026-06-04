import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { MapPin, ChevronDown } from 'lucide-react';
// Importamos el logo local directamente
import logoMires from '@/app/Logo Mires simple.png';

export default async function Header() {
  const supabase = await createClient();
  const { data: sedes } = await supabase.from('sedes').select('id, nombre, horarios').order('nombre');

  return (
    <header className="sticky top-0 z-50 w-full bg-mires-bg/90 backdrop-blur-md border-b border-mires-primary/10 shadow-sm transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Izquierda: Logo Optimizado y Selector de Sede */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Image 
              src={logoMires} 
              alt="Logo MIRES" 
              height={45} 
              className="w-auto h-11 object-contain"
              priority // Carga el logo con prioridad alta por estar en el viewport inicial
            />
          </Link>

          <div className="hidden md:flex group relative items-center gap-1 cursor-pointer text-sm font-medium text-mires-textMuted hover:text-mires-primary transition-colors">
            <MapPin size={16} />
            <span>Sedes</span>
            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            
            {/* Dropdown de Sedes */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-mires-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 p-2">
              {sedes?.map((sede) => (
                <div key={sede.id} className="p-3 hover:bg-mires-bg rounded-md transition-colors cursor-pointer">
                  <p className="font-semibold text-mires-primary text-sm">{sede.nombre}</p>
                  <p className="text-xs text-mires-textMuted mt-1">{sede.horarios}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Centro: Navegación Principal */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-mires-textMain">
          <Link href="/" className="hover:text-mires-accent transition-colors">Inicio</Link>
          <Link href="/soy-nuevo" className="hover:text-mires-accent transition-colors">Soy Nuevo</Link>
          <Link href="/ministerios" className="hover:text-mires-accent transition-colors">Ministerios</Link>
          <Link href="/eventos" className="hover:text-mires-accent transition-colors">Eventos</Link>
          <Link href="/sermones" className="hover:text-mires-accent transition-colors">Sermones</Link>
        </nav>

        {/* Derecha: CTA Principal */}
        <div className="flex items-center gap-4">
          <Link 
            href="/soy-nuevo" 
            className="bg-mires-primary hover:bg-mires-primary/90 text-mires-white px-6 py-2.5 rounded-full font-medium text-sm transition-all transform hover:-translate-y-0.5 shadow-md"
          >
            VISÍTANOS
          </Link>
        </div>

      </div>
    </header>
  );
}