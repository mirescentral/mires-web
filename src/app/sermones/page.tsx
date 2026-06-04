import Link from "next/link";
import { MonitorPlay, Calendar, ArrowRight, BookOpen } from "lucide-react";

export const metadata = {
  title: "Sermones y Mensajes | MIRES",
  description: "Encuentra esperanza, dirección y propósito en nuestra biblioteca de predicaciones.",
};

export default function SermonesPage() {
  // Datos de ejemplo para la grilla de videos (En Fase B esto vendrá de YouTube API)
  const predicacionesRecientes = [
    { id: 1, titulo: "Caminando en Fe", fecha: "24 Mayo, 2026", serie: "Fundamentos" },
    { id: 2, titulo: "El poder de la gracia", fecha: "17 Mayo, 2026", serie: "Identidad" },
    { id: 3, titulo: "Restaurando la familia", fecha: "10 Mayo, 2026", serie: "Hogar" },
    { id: 4, titulo: "Superando la ansiedad", fecha: "3 Mayo, 2026", serie: "Salud Mental" },
    { id: 5, titulo: "Llamados a servir", fecha: "26 Abril, 2026", serie: "Propósito" },
    { id: 6, titulo: "El valor de la comunidad", fecha: "19 Abril, 2026", serie: "Fundamentos" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-mires-bg">
      
      {/* HEADER SIMPLE DE SECCIÓN */}
      <section className="bg-mires-primary text-mires-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Mensajes que transforman
          </h1>
          <p className="font-sans text-lg md:text-xl text-mires-white/80 leading-relaxed">
            Nuestra oración es que cada mensaje te acerque más a Dios y te dé herramientas prácticas para enfrentar los desafíos de cada día.
          </p>
        </div>
      </section>

      {/* VIDEO DESTACADO (ÚLTIMA PREDICACIÓN) */}
      <section className="py-20 bg-mires-white border-b border-mires-primary/5">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-mires-accent/10 text-mires-accent rounded-full flex items-center justify-center shrink-0">
              <MonitorPlay size={20} />
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-mires-primary">
              Mensaje más reciente
            </h2>
          </div>

          <div className="bg-mires-bg rounded-3xl overflow-hidden shadow-lg border border-mires-primary/10">
            <div className="aspect-video w-full bg-mires-primary/5 relative">
              {/* IFRAME DEL ÚLTIMO VIDEO */}
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/nuestro-video-aqui?si=placeholder" 
                title="Última Predicación MIRES Central" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="font-sans inline-block bg-mires-accent/10 text-mires-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  Serie Actual
                </span>
                <h3 className="font-display font-bold text-3xl text-mires-primary mb-2">
                  El inicio de algo nuevo
                </h3>
                <p className="font-sans text-mires-textMuted flex items-center gap-2">
                  <Calendar size={16} /> Domingo, 31 de Mayo, 2026
                </p>
              </div>
              <a 
                href="https://www.youtube.com/@MiresCentral" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-sans shrink-0 bg-mires-primary hover:bg-mires-primary/90 text-mires-white px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-md"
              >
                Suscribirse al canal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVO DE MENSAJES ANTERIORES */}
      <section className="py-20 bg-mires-bg">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
            <h2 className="font-display font-bold text-3xl text-mires-primary">
              Mensajes anteriores
            </h2>
            <Link href="/devocionales" className="font-sans inline-flex items-center gap-2 text-mires-accent font-bold hover:text-[#d9782e] transition-colors">
              <BookOpen size={18} /> Ver devocionales
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {predicacionesRecientes.map((predica) => (
              <a 
                key={predica.id}
                href="https://www.youtube.com/@MiresCentral" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-mires-white rounded-2xl overflow-hidden shadow-sm border border-mires-primary/5 hover:shadow-xl transition-all hover:-translate-y-1 block"
              >
                <div className="aspect-video bg-mires-primary/10 relative flex items-center justify-center overflow-hidden">
                  {/* Overlay oscuro al hacer hover */}
                  <div className="absolute inset-0 bg-mires-primary/0 group-hover:bg-mires-primary/40 transition-colors z-10 flex items-center justify-center">
                    <div className="w-16 h-16 bg-mires-white rounded-full flex items-center justify-center text-mires-accent opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                      <MonitorPlay size={24} className="ml-1" />
                    </div>
                  </div>
                  {/* Placeholder de miniatura (Thumbnail) */}
                  <div className="font-display font-bold text-mires-primary/20 text-4xl">MIRES</div>
                </div>
                
                <div className="p-6">
                  <span className="font-sans text-xs font-bold text-mires-accent uppercase tracking-wider mb-2 block">
                    {predica.serie}
                  </span>
                  <h3 className="font-display font-bold text-xl text-mires-primary mb-2 group-hover:text-mires-accent transition-colors">
                    {predica.titulo}
                  </h3>
                  <p className="font-sans text-sm text-mires-textMuted flex items-center gap-2">
                    <Calendar size={14} /> {predica.fecha}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://www.youtube.com/@MiresCentral" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-sans inline-flex items-center gap-2 text-mires-primary font-bold hover:text-mires-accent transition-colors px-6 py-3 border-2 border-mires-primary/10 rounded-full hover:border-mires-accent"
            >
              Ver biblioteca completa en YouTube <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}