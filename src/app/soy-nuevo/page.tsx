import { createClient } from '@/utils/supabase/server';
import { MapPin, Clock, Coffee, Music, BookOpen } from "lucide-react";
import FormularioVisita from './FormularioVisita'; // Importamos el formulario interactivo

export const metadata = {
  title: "Soy Nuevo | MIRES",
  description: "Bienvenido a casa. Planifica tu visita y conoce qué esperar en nuestra comunidad.",
};

export default async function SoyNuevoPage() {
  const supabase = await createClient();
  const { data: sedes } = await supabase.from('sedes').select('id, nombre, horarios').order('nombre');

  return (
    <div className="flex flex-col min-h-screen bg-mires-bg">
      
      {/* HEADER SIMPLE DE SECCIÓN */}
      <section className="bg-mires-primary text-mires-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Bienvenido a casa
          </h1>
          <p className="font-sans text-lg md:text-xl text-mires-white/80 leading-relaxed">
            Sabemos que visitar una iglesia por primera vez puede ser intimidante. 
            Queremos que te sientas en familia desde el momento en que cruzas la puerta.
          </p>
        </div>
      </section>

      {/* ¿QUÉ PASA EN UN CULTO? */}
      <section className="py-20 bg-mires-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-4">
              ¿Qué esperar en tu visita?
            </h2>
            <p className="font-sans text-mires-textMuted max-w-2xl mx-auto">
              Nuestras reuniones duran aproximadamente 90 minutos y están diseñadas para que conectes con Dios y con otras personas de forma genuina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-mires-bg border border-mires-primary/5 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-mires-white rounded-full flex items-center justify-center text-mires-accent mx-auto mb-6 shadow-sm">
                <Music size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-mires-primary mb-3">Alabanza Contemporánea</h3>
              <p className="font-sans text-mires-textMuted text-sm">Comenzamos con música en vivo. Eres libre de cantar, levantar tus manos o simplemente escuchar y reflexionar.</p>
            </div>

            <div className="p-8 rounded-2xl bg-mires-bg border border-mires-primary/5 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-mires-white rounded-full flex items-center justify-center text-mires-accent mx-auto mb-6 shadow-sm">
                <BookOpen size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-mires-primary mb-3">Mensaje Práctico</h3>
              <p className="font-sans text-mires-textMuted text-sm">Escucharás una predicación basada en la Biblia, con aplicaciones reales y directas para tu día a día.</p>
            </div>

            <div className="p-8 rounded-2xl bg-mires-bg border border-mires-primary/5 text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-mires-white rounded-full flex items-center justify-center text-mires-accent mx-auto mb-6 shadow-sm">
                <Coffee size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-mires-primary mb-3">Comunidad Cercana</h3>
              <p className="font-sans text-mires-textMuted text-sm">Antes y después del servicio, nos encanta conversar. Siempre habrá alguien dispuesto a saludarte y resolver tus dudas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HORARIOS Y SEDES */}
      <section className="py-20 bg-mires-bg">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-6">
                Planifica tu visita esta semana
              </h2>
              <p className="font-sans text-mires-textMuted mb-8">
                Elige la sede que te quede más cómoda. Tenemos equipos de bienvenida listos para recibirte, orientarte y mostrarte dónde puedes sentarte.
              </p>
              <div className="space-y-4">
                {sedes?.map((sede) => (
                  <div key={sede.id} className="bg-mires-white p-4 rounded-xl border border-mires-primary/10 flex items-center gap-4">
                    <div className="bg-mires-primary/10 p-3 rounded-lg text-mires-primary">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-mires-primary">{sede.nombre}</h4>
                      <p className="font-sans text-sm text-mires-textMuted flex items-center gap-1">
                        <Clock size={14} className="text-mires-accent" /> {sede.horarios}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AQUÍ INYECTAMOS NUESTRO FORMULARIO INTERACTIVO */}
            <div className="lg:w-1/2 w-full">
              <FormularioVisita sedes={sedes || []} />
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}