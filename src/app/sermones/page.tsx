import { ArrowRight } from 'lucide-react';

export const metadata = { title: "Sermones | mires" };

export default function SermonesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-eden-cream text-eden-black pt-24 md:pt-32">
      
      <section className="py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-5xl text-center fade-in-up">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-eden-muted mb-6 block">Mensajes</span>
          <h1 className="font-serif-eden text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] mb-8">Escucha <br className="hidden md:block"/> Su Palabra.</h1>
          <p className="font-sans text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl mx-auto">
            Explora nuestras enseñanzas recientes. Encuentra dirección, paz y propósito para tu vida diaria.
          </p>
        </div>
      </section>

      <section className="py-24 bg-eden-white border-t border-eden-stone">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Tarjeta de Video 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-video w-full bg-eden-black relative overflow-hidden mb-8">
                <iframe className="absolute top-0 left-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" src="https://www.youtube.com/embed/nuestro-video-aqui?si=placeholder" title="Sermón 1" allowFullScreen></iframe>
              </div>
              <h2 className="font-serif-eden text-3xl mb-4 text-eden-black">El poder de la gracia</h2>
              <p className="font-sans text-eden-muted font-light leading-relaxed mb-6">Un mensaje sobre cómo el amor incondicional de Dios transforma nuestras realidades más oscuras.</p>
              <span className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase text-eden-black">Ver mensaje <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300"/></span>
            </div>

            {/* Tarjeta de Video 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-video w-full bg-eden-black relative overflow-hidden mb-8">
                <iframe className="absolute top-0 left-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" src="https://www.youtube.com/embed/nuestro-video-aqui?si=placeholder" title="Sermón 2" allowFullScreen></iframe>
              </div>
              <h2 className="font-serif-eden text-3xl mb-4 text-eden-black">Comunidad auténtica</h2>
              <p className="font-sans text-eden-muted font-light leading-relaxed mb-6">Descubre por qué fuimos diseñados para vivir en relación con otros y cómo construir vínculos sanos.</p>
              <span className="inline-flex items-center gap-3 font-sans text-xs font-semibold tracking-widest uppercase text-eden-black">Ver mensaje <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300"/></span>
            </div>

          </div>
          
          <div className="mt-20 text-center">
            <a href="https://www.youtube.com/@miresCentral" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-eden-black text-eden-white px-10 py-5 font-sans text-xs font-semibold tracking-widest uppercase hover:bg-eden-muted transition-colors duration-300">
              Ir al canal de YouTube <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}