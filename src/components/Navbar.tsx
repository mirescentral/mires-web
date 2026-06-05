'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled && !isOpen;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isTransparent 
        ? 'bg-transparent text-eden-white py-8' 
        : 'bg-eden-cream/95 backdrop-blur-md text-eden-black py-4 border-b border-eden-stone/40'
    }`}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="font-serif text-3xl tracking-tighter">
          MIRES
        </Link>

        <nav className="hidden lg:flex gap-10 font-sans text-[11px] font-semibold tracking-[0.25em] uppercase">
          <Link href="/soy-nuevo" className="hover:opacity-50 transition-opacity">Visítanos</Link>
          <Link href="/ministerios" className="hover:opacity-50 transition-opacity">Ministerios</Link>
          <Link href="/eventos" className="hover:opacity-50 transition-opacity">Eventos</Link>
          <Link href="/sermones" className="hover:opacity-50 transition-opacity">Mensajes</Link>
          <Link href="/ofrendas" className="hover:opacity-50 transition-opacity">Dar</Link>
          <Link href="/contacto" className="hover:opacity-50 transition-opacity">Contacto</Link>
        </nav>

        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-eden-cream border-t border-eden-stone p-8 flex flex-col gap-6 text-eden-black lg:hidden shadow-xl font-sans text-sm font-semibold tracking-widest uppercase">
          <Link href="/soy-nuevo" onClick={() => setIsOpen(false)}>Visítanos</Link>
          <Link href="/ministerios" onClick={() => setIsOpen(false)}>Ministerios</Link>
          <Link href="/eventos" onClick={() => setIsOpen(false)}>Eventos</Link>
          <Link href="/sermones" onClick={() => setIsOpen(false)}>Mensajes</Link>
          <Link href="/ofrendas" onClick={() => setIsOpen(false)}>Dar</Link>
          <Link href="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
        </div>
      )}
    </header>
  );
}