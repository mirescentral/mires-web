import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: "Privacidad | MIRES",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#F5F0E8] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
          <ShieldCheck size={40} className="text-[#E8863A]" />
          <h1 className="text-3xl md:text-4xl font-serif text-[#1A2E4A] font-bold">
            Política de Privacidad
          </h1>
        </div>
        
        <div className="space-y-6 font-sans text-gray-700 leading-relaxed">
          <p>
            En <strong>Ministerio Restauración (MIRES)</strong> valoramos y respetamos tu privacidad. Esta página contiene información sobre cómo manejamos los datos de nuestra comunidad.
          </p>
          
          <h2 className="text-xl font-semibold text-[#1A2E4A] mt-8 mb-4">1. Recopilación de Datos</h2>
          <p>
            Al completar nuestros formularios de "Soy Nuevo", contacto o inscripción a eventos, únicamente solicitamos la información estrictamente necesaria (como nombre y WhatsApp) para poder comunicarnos contigo de manera efectiva y brindarte apoyo pastoral.
          </p>

          <h2 className="text-xl font-semibold text-[#1A2E4A] mt-8 mb-4">2. Uso de la Información</h2>
          <p>
            Los datos proporcionados son de uso exclusivo e interno de la iglesia. No vendemos, alquilamos ni compartimos tu información personal con terceros ajenos a nuestra organización bajo ninguna circunstancia.
          </p>

          <p className="mt-10 text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">
            Si tienes alguna duda sobre el manejo de tu información o deseas que eliminemos tus datos de nuestros registros, por favor comunícate con nosotros a través de la página de Contacto.
          </p>
        </div>
      </div>
    </main>
  );
}