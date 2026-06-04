import { createClient } from '@/utils/supabase/server';
import { MapPin, Clock, MessageCircle, Mail, Send } from 'lucide-react';

export default async function ContactoPage() {
  const supabase = createClient();
  // Llamada a la base de datos para traer las sedes de forma asíncrona
  const { data: sedes } = await (await supabase)
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
          {/* Formulario de Contacto General */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-serif text-[#1A2E4A] mb-6">Envíanos un mensaje</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" 
                  placeholder="Ej: Juan Pérez" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" 
                  placeholder="juan@ejemplo.com" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                <textarea 
                  rows={4} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" 
                  placeholder="¿En qué podemos ayudarte?" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#E8863A] text-white font-semibold py-4 rounded-xl hover:bg-[#d1752f] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar mensaje
              </button>
            </form>
          </div>

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
                  <a 
                    href={sede.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                  >
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