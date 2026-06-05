import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Dar | mires",
  description: "Tu generosidad transforma vidas.",
};

export default function OfrendasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-eden-black text-eden-white pt-32">
      <section className="py-24 px-6 border-b border-eden-white/10">
        <div className="container mx-auto max-w-4xl text-center fade-in-up">
          <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-eden-stone/60 mb-6 block">Adoración</span>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-8 tracking-tighter leading-[0.95]">El acto <br className="hidden md:block"/> de dar.</h1>
          <p className="font-sans text-lg md:text-xl text-eden-stone/80 font-light leading-relaxed max-w-2xl mx-auto">
            Creemos que dar es una respuesta natural de gratitud. Tus aportes sostienen la misión comunitaria y extienden el mensaje de gracia en nuestra ciudad.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="border border-eden-white/10 p-10 md:p-16 bg-transparent">
              <h2 className="font-serif text-4xl mb-8">Transferencia Bancaria</h2>
              <div className="space-y-4 font-sans text-eden-stone font-light text-sm tracking-wide">
                <div className="flex justify-between border-b border-eden-white/10 pb-3">
                  <span className="text-eden-stone/60 uppercase text-xs tracking-widest font-semibold">Banco</span>
                  <span>Banco Estado</span>
                </div>
                <div className="flex justify-between border-b border-eden-white/10 pb-3">
                  <span className="text-eden-stone/60 uppercase text-xs tracking-widest font-semibold">Tipo</span>
                  <span>Cuenta Corriente</span>
                </div>
                <div className="flex justify-between border-b border-eden-white/10 pb-3">
                  <span className="text-eden-stone/60 uppercase text-xs tracking-widest font-semibold">Número</span>
                  <span className="font-medium text-eden-white">123456789</span>
                </div>
                <div className="flex justify-between border-b border-eden-white/10 pb-3">
                  <span className="text-eden-stone/60 uppercase text-xs tracking-widest font-semibold">RUT</span>
                  <span>65.123.456-7</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-eden-stone/60 uppercase text-xs tracking-widest font-semibold">Email</span>
                  <span>finanzas@mires.cl</span>
                </div>
              </div>
            </div>

            <div className="border border-eden-white/10 p-10 md:p-16 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-4xl mb-6">Dar en Línea</h2>
                <p className="font-sans text-eden-stone/80 font-light leading-relaxed mb-10">
                  Realiza tus aportes de manera rápida y segura utilizando tarjetas de crédito o débito a través de nuestro portal de Webpay.
                </p>
              </div>
              <a href="#" className="inline-flex items-center justify-between bg-eden-white text-eden-black px-8 py-5 font-sans text-xs font-semibold tracking-[0.2em] uppercase hover:bg-eden-stone transition-colors w-full">
                Ir a Webpay <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}