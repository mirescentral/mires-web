import { createClient } from '@/utils/supabase/server';
import { MapPin, Clock, MessageCircle, Mail } from 'lucide-react';
import FormularioContacto from './FormularioContacto';

export const metadata = {
  title: "Contacto | MIRES",
  description: "Estamos aquí para ti. Envíanos un mensaje o contáctanos vía WhatsApp.",
};

export default async function ContactoPage() {
  const supabase = await createClient();
  
  const { data: sedes } = await supabase
    .from('sedes')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <main className="min-h-screen bg-[#F5F0E8] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A2E4A] mb-4 tracking-tight leading-none">
            Estamos aquí para ti
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-sans">
            Ya sea que tengas una petición de oración, preguntas sobre nuestros ministerios o simplemente quieras conversar, nos encantaría escucharte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Aquí inyectamos el nuevo Formulario Interactivo */}
          <FormularioContacto />

          {/* Información de Sedes (Dinámico desde Supabase) */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-[#1A2E4A] mb-6">Nuestras Congregaciones</h2>
            {sedes?.map((sede) => (
              <div key={sede.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-2xl font-serif text-[#1A2E4A] mb-4">{sede.nombre}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-[#E8863A] shrink-0 mt-1" />
                      <p>{sede.direccion || 'Dirección por confirmar'}</p>
                    </div>
                    <div className="flex items-start gap-3 text-gray-600">
                      <Clock className="w-5 h-5 text-[#E8863A] shrink-0 mt-1" />
                      <p>{sede.horarios}</p>
                    </div>
                  </div>
                </div>
                {sede.whatsapp ? (
                  <a href={sede.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    Contactar por WhatsApp
                  </a>
                ) : (
                  <p className="inline-flex items-center gap-2 text-gray-400 font-semibold">
                    <Mail className="w-5 h-5" />
                    Completa el formulario general
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}