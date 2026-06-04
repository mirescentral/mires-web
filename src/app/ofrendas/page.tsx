import { Heart, Building2, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Ofrendas y Donaciones | MIRES",
  description: "Tu generosidad transforma vidas. Conoce nuestras formas de dar.",
};

export default function OfrendasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-mires-bg">
      
      {/* HEADER DE SECCIÓN */}
      <section className="bg-mires-primary text-mires-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 bg-mires-accent/20 rounded-full flex items-center justify-center text-mires-accent mx-auto mb-6">
            <Heart size={32} />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
            Tu generosidad transforma vidas
          </h1>
          <p className="font-sans text-lg md:text-xl text-mires-white/80 leading-relaxed">
            Creemos que dar es una respuesta de adoración y gratitud. 
            Tus aportes nos permiten sostener la visión de la iglesia, bendecir a nuestra ciudad y extender el mensaje de gracia.
          </p>
        </div>
      </section>

      {/* MÉTODOS DE DONACIÓN */}
      <section className="py-20 bg-mires-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-mires-primary mb-4">
              Formas de dar
            </h2>
            <p className="font-sans text-mires-textMuted max-w-2xl mx-auto">
              Hemos habilitado diferentes canales seguros para facilitar tu aporte desde cualquier lugar de Chile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* MÉTODO 1: TRANSFERENCIA BANCARIA */}
            <div className="bg-mires-bg rounded-3xl p-8 border border-mires-primary/10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-mires-primary"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-mires-white rounded-xl shadow-sm flex items-center justify-center text-mires-primary shrink-0">
                  <Building2 size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-mires-primary">Transferencia Bancaria</h3>
              </div>
              
              <div className="bg-mires-white rounded-2xl p-6 font-sans text-mires-textMain space-y-4 border border-mires-primary/5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-mires-bg pb-3">
                  <span className="text-mires-textMuted text-sm">Banco</span>
                  <span className="font-bold text-mires-primary">Banco Estado</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-mires-bg pb-3">
                  <span className="text-mires-textMuted text-sm">Tipo de cuenta</span>
                  <span className="font-bold text-mires-primary">Cuenta Corriente</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-mires-bg pb-3">
                  <span className="text-mires-textMuted text-sm">Número de cuenta</span>
                  <span className="font-bold text-mires-primary">123456789</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-mires-bg pb-3">
                  <span className="text-mires-textMuted text-sm">Nombre</span>
                  <span className="font-bold text-mires-primary">Iglesia MIRES</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-mires-bg pb-3">
                  <span className="text-mires-textMuted text-sm">RUT</span>
                  <span className="font-bold text-mires-primary">65.000.000-0</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-mires-textMuted text-sm">Correo</span>
                  <span className="font-bold text-mires-accent">ofrendas@mires.cl</span>
                </div>
              </div>
            </div>

            {/* MÉTODO 2: PAGO ONLINE (Webpay / MercadoPago) */}
            <div className="bg-mires-bg rounded-3xl p-8 border border-mires-primary/10 shadow-sm relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-2 bg-mires-accent"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-mires-white rounded-xl shadow-sm flex items-center justify-center text-mires-accent shrink-0">
                  <Smartphone size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-mires-primary">Dar en Línea</h3>
              </div>
              
              <p className="font-sans text-mires-textMuted mb-8 flex-grow">
                Aporta de manera rápida y segura utilizando tus tarjetas de débito o crédito a través de nuestra pasarela de pago encriptada.
              </p>

              <div className="flex items-center gap-2 mb-8 text-sm font-sans text-mires-textMuted bg-mires-white p-4 rounded-xl border border-mires-primary/5">
                <ShieldCheck size={20} className="text-green-600 shrink-0" />
                <span>Transacción 100% segura y respaldada.</span>
              </div>

              {/* Botón que llevará a Khipu, Webpay o MercadoPago */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-sans w-full inline-flex items-center justify-center gap-2 bg-mires-accent text-mires-white hover:bg-[#d9782e] px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 shadow-md mt-auto"
              >
                Dar ahora con Webpay <ArrowRight size={18} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN DE TRANSPARENCIA / DESTINO */}
      <section className="py-20 bg-mires-primary/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display font-bold text-3xl text-mires-primary mb-6">
            ¿A dónde va mi ofrenda?
          </h2>
          <p className="font-sans text-mires-textMuted text-lg leading-relaxed mb-12">
            Administramos cada recurso con integridad y transparencia. Tus donaciones financian:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display font-bold text-xl text-mires-primary mb-2">Comunidad</h4>
              <p className="font-sans text-mires-textMuted text-sm">Mantenimiento de nuestras sedes para crear ambientes seguros para ti y tu familia.</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-mires-primary mb-2">Misiones</h4>
              <p className="font-sans text-mires-textMuted text-sm">Apoyo a la <i>Fundación Próximo</i> y proyectos de acción social en nuestras comunas.</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-xl text-mires-primary mb-2">Ministerios</h4>
              <p className="font-sans text-mires-textMuted text-sm">Recursos para el desarrollo de MiresKids, grupos pequeños y equipamiento pastoral.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}