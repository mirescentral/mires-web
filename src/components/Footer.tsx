import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-eden-black text-eden-white py-24 md:py-32 border-t border-eden-stone/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-md">
            <h2 className="font-logo-mires text-5xl font-bold lowercase tracking-tighter mb-6">mires</h2>
            <p className="font-sans text-eden-stone/70 font-light leading-relaxed text-base">
              Amamos ver a las personas restauradas por el amor y la gracia de Jesús.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 font-sans text-xs tracking-[0.2em] uppercase font-semibold">
            <div className="flex flex-col gap-6">
              <Link href="/soy-nuevo" className="text-eden-stone hover:text-eden-white transition-colors">Planifica tu Visita</Link>
              <Link href="/ministerios" className="text-eden-stone hover:text-eden-white transition-colors">Ministerios</Link>
              <Link href="/eventos" className="text-eden-stone hover:text-eden-white transition-colors">Eventos</Link>
            </div>
            <div className="flex flex-col gap-6">
              <Link href="/sermones" className="text-eden-stone hover:text-eden-white transition-colors">Mensajes</Link>
              <Link href="/ofrendas" className="text-eden-stone hover:text-eden-white transition-colors">Dar</Link>
              <Link href="/contacto" className="text-eden-stone hover:text-eden-white transition-colors">Contacto</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-eden-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-sans text-eden-stone/50 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Ministerio Restauración. Todos los derechos reservados.</p>
          <div className="flex gap-8">
            <a href="https://instagram.com/mirescentral" target="_blank" rel="noopener noreferrer" className="hover:text-eden-white">Instagram</a>
            <a href="https://youtube.com/@miresCentral" target="_blank" rel="noopener noreferrer" className="hover:text-eden-white">YouTube</a>
            <Link href="/admin" className="hover:text-eden-white">Acceso Equipo</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}