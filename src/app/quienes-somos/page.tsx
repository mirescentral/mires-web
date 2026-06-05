import { Heart, Target, Check, Users } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export const metadata = { title: "Quiénes Somos | mires" };

export default async function QuienesSomosPage() {
  const supabase = await createClient();

  const { data: { publicUrl } } = supabase.storage.from('recursos_web').getPublicUrl('bg-quienes-somos.png');
  const cacheBuster = new Date().getTime();
  const urlFondo = `${publicUrl}?v=${cacheBuster}`;

  const creencias = [
    "Creemos y afirmamos en un solo Dios eterno.",
    "Creemos y afirmamos en la Trinidad de Dios: Padre, Hijo y Espíritu Santo.",
    "Creemos y afirmamos en la Biblia, inspirada por el Espíritu Santo, como la Palabra de Dios y guía para la vida.",
    "Creemos y afirmamos que todos los seres humanos hemos pecado y necesitamos la gracia y el perdón de Dios.",
    "Creemos y afirmamos en nuestro Señor Jesucristo como el único y suficiente Salvador, quien entregó su vida por la humanidad, murió por nuestros pecados y resucitó al tercer día.",
    "Creemos y afirmamos que toda persona que cree en Jesucristo como el Hijo de Dios y le recibe por fe tiene vida eterna.",
    "Creemos y afirmamos que los dones y ministerios del Espíritu Santo son otorgados por Dios a hombres y mujeres para servir, edificar y fortalecer a la Iglesia.",
    "Creemos y afirmamos el bautismo en el Espíritu Santo, así como su llenura, unción y poder, para vivir y servir conforme a la voluntad de Dios."
  ];

  const equipoPastoral = [
    "Patricio Gallardo", "Natalia Olivares y César Muñoz", "Carolina Soto y Cristian Andaur",
    "Marcos Vega y Geraldine Abarca", "Marcelo Flores y Miryam Henríquez", "Alejandro Geyssel"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black pt-32 font-sans">
      
      {/* SECCIÓN INTRODUCCIÓN CON FIGURA GEOMÉTRICA FUSIONADA CON IMAGEN */}
      <section className="py-20 px-6">
        <div className="container mx-auto px-6 max-w-5xl text-center relative overflow-hidden p-12 md:p-20 bg-[#F1EFEA] border border-eden-stone/40">
          
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <img 
              src={urlFondo} 
              alt="" 
              className="w-full h-full object-cover opacity-20 mix-blend-multiply"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
            {/* El degradado corre de arriba a abajo bloqueando los bordes duros */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1EFEA]/80 to-[#F1EFEA]" />
          </div>

          <div className="relative z-10">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-eden-muted mb-6 block">Nuestra Identidad</span>
            <h1 className="font-serif text-6xl md:text-8xl tracking-tighter leading-[0.95] mb-8">Nuestra <br/> Historia.</h1>
            <p className="text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl mx-auto">
              Conoce el corazón detrás de nuestra casa. Lo que nos mueve, lo que creemos y el equipo que sirve a nuestra comunidad con amor.
            </p>
          </div>
        </div>
      </section>

      {/* VISIÓN Y MISIÓN */}
      <section className="py-24 bg-eden-white border-y border-eden-stone/60">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center border border-eden-stone rounded-full mb-8">
                <Heart size={20} className="text-eden-black" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Visión</h2>
              <p className="text-lg md:text-xl font-light text-eden-muted leading-relaxed">
                Somos una iglesia de personas que se aman, que bendicen familias e influyen comunidades con el mensaje de Jesús.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center border border-eden-stone rounded-full mb-8">
                <Target size={20} className="text-eden-black" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Misión</h2>
              <div className="text-lg font-light text-eden-muted leading-relaxed space-y-4">
                <p><strong>Alcanzar</strong> a familias y personas que no han tenido una verdadera relación con Cristo.</p>
                <p><strong>Restaurando</strong> el plan original de Dios en sus vidas.</p>
                <p><strong>Consolidando</strong> la vida espiritual de cada integrante.</p>
                <p><strong>Sirviendo</strong> al prójimo por amor a Dios.</p>
                <p><strong>E influyendo</strong> en nuestras comunidades a través de lo que Dios ha hecho en nuestras vidas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EN QUÉ CREEMOS */}
      <section className="py-32 bg-eden-black text-eden-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mb-20">
            <h2 className="font-serif text-5xl md:text-7xl tracking-tight mb-8">En qué creemos.</h2>
            <p className="text-lg md:text-xl font-light text-eden-stone leading-relaxed">
              En Mires creemos que la fe tiene el poder de transformar vidas, fortalecer familias y generar un impacto positivo en la comunidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {creencias.map((creencia, index) => (
              <div key={index} className="flex items-start gap-4 border-t border-eden-stone/30 pt-6">
                <Check size={20} className="text-eden-stone shrink-0 mt-1" strokeWidth={2} />
                <p className="text-sm md:text-base font-light text-eden-stone leading-relaxed">{creencia}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO PASTORAL */}
      <section className="py-32 bg-eden-cream">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 border-t border-eden-stone pt-16">
            <div className="md:w-1/3">
              <div className="flex items-center gap-4 mb-6">
                <Users size={24} className="text-eden-black" strokeWidth={1.5} />
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight">Equipo Pastoral</h2>
              </div>
            </div>
            <div className="md:w-2/3 w-full space-y-16">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-eden-muted mb-4 block border-b border-eden-stone pb-2">Pastores Principales</span>
                <h3 className="font-serif text-3xl md:text-4xl text-eden-black">Marcelo Pino y Ester Gallardo</h3>
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-eden-muted mb-4 block border-b border-eden-stone pb-2">Equipo Pastoral</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                  {equipoPastoral.map((pastor, index) => (
                    <li key={index} className="font-sans text-lg font-light text-eden-black">{pastor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}