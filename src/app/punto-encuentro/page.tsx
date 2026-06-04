import { Hammer } from 'lucide-react';
import Link from 'next/link';

export default function MinisterioEnConstruccion() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center p-6">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-[#E8863A]">
            <Hammer size={40} />
          </div>
        </div>
        <h1 className="text-3xl font-serif text-[#1A2E4A] font-bold mb-4">
          Próximamente
        </h1>
        <p className="text-gray-600 font-sans mb-8 leading-relaxed">
          Estamos construyendo este espacio para darte toda la información sobre este ministerio. ¡Vuelve muy pronto!
        </p>
        <Link 
          href="/ministerios" 
          className="inline-block bg-[#1A2E4A] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#0f1d30] transition-colors"
        >
          Volver a Ministerios
        </Link>
      </div>
    </main>
  );
}