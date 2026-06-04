import { BookOpen } from 'lucide-react';

export const metadata = {
  title: "Devocionales | MIRES",
  description: "Reflexiones y recursos espirituales para tu crecimiento.",
};

export default function DevocionalesPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] py-32 px-6 flex flex-col items-center justify-center text-center">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-[#1A2E4A]">
            <BookOpen size={40} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A2E4A] mb-4 font-bold tracking-tight">
          Devocionales
        </h1>
        <p className="text-lg text-gray-600 font-sans leading-relaxed">
          Estamos preparando este espacio para compartir reflexiones diarias y recursos espirituales que bendecirán tu vida. ¡Vuelve muy pronto!
        </p>
      </div>
    </main>
  );
}