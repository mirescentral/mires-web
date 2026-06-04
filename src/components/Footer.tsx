import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import { MapPin, MessageCircle, Mail } from 'lucide-react';

// Importamos el logo local
import logoMires from '@/app/Logo Mires simple.png';

export default async function Footer() {
  const supabase = await createClient();
  const { data: sedes } = await supabase.from('sedes').select('*').order('nombre');

  return (
    <footer className="bg-mires-primary text-mires-white pt-16 pb-8 border-t border-mires-primary/20">
      <div className="container mx-auto px-4">
        
        {/* Top: Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-mires-white/5 rounded-2xl p-8 mb-16 border border-mires-white/10">
          <div className="mb-6 md:mb-0">
            <h3 className="font-display font-bold text-2xl mb-2">Conéctate con nuestra comunidad</h3>
            <p className="font-sans text-mires-white/70">Suscríbete para recibir noticias, eventos y devocionales.</p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="font-sans bg-mires-primary border border-mires-white/20 rounded-full px-6 py-3 text-mires-white focus:outline-none focus:border-mires-accent w-full md:w-80"
              required
            />
            <button 
              type="submit" 
              className="font-sans bg-mires-accent hover:bg-[#d9782e] text-mires-white px-6 py-3 rounded-full font-bold transition-colors"
            >
              Unirme
            </button>
          </form>
        </div>

        {/* Middle: Grid de Enlaces e Información */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Columna 1: Marca y Redes */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 bg-mires-white p-2 rounded-lg">
              <Image 
                src={logoMires} 
                alt="Logo MIRES" 
                height={40} 
                className="w-auto h-10 object-contain"
              />
            </Link>
            <p className="font-sans text-mires-white/70 mb-6 max-w-sm leading-relaxed">
              Personas que se aman, bendicen familias e influyen comunidades. 
              Una iglesia diseñada para ti y tu familia.
            </p>
            <div className="flex items-center gap-4">
              {/* Instagram SVG */}
              <a href="https://www.instagram.com/mirescentral" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-mires-white/10 flex items-center justify-center hover:bg-mires-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* YouTube SVG */}
              <a href="https://www.youtube.com/@MiresCentral" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-mires-white/10 flex items-center justify-center hover:bg-[#FF0000] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="font-sans space-y-4 text-mires-white/70">
              <li><Link href="/soy-nuevo" className="hover:text-mires-accent transition-colors">Soy Nuevo</Link></li>
              <li><Link href="/ministerios" className="hover:text-mires-accent transition-colors">Ministerios</Link></li>
              <li><Link href="/sermones" className="hover:text-mires-accent transition-colors">Sermones</Link></li>
              <li><Link href="/devocionales" className="hover:text-mires-accent transition-colors">Devocionales</Link></li>
              <li><Link href="/ofrendas" className="hover:text-mires-accent font-medium text-mires-white transition-colors">Donaciones</Link></li>
            </ul>
          </div>

          {/* Columnas 3 y 4: Sedes Dinámicas */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {sedes?.map((sede) => (
              <div key={sede.id}>
                <h4 className="font-display font-bold text-lg mb-6 text-mires-accent">{sede.nombre}</h4>
                <ul className="font-sans space-y-4 text-sm text-mires-white/70">
                  <li className="flex items-start gap-3">
                    <MapPin size={18} className="shrink-0 mt-0.5" />
                    <span>{sede.direccion || 'Dirección por definir'}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle size={18} className="shrink-0" />
                    <span>WhatsApp disponible pronto</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-mires-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-sm text-mires-white/50">
          <p>© {new Date().getFullYear()} MIRES — Ministerio Restauración. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-mires-white transition-colors">Política de Privacidad</Link>
            <Link href="/contacto" className="hover:text-mires-white transition-colors">Contacto</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}