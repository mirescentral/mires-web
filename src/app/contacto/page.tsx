import { createClient } from '@/utils/supabase/server';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import FormularioContacto from './FormularioContacto';

export const metadata = {
  title: "Contacto | mires",
};

export default async function ContactoPage() {
  const supabase = await createClient();

  // Traemos todas las sedes activas de la base de datos para alimentar el desplegable
  const { data: sedes } = await supabase
    .from('sedes')
    .select('*')
    .order('nombre');

  return (
    <div className="min-h-screen bg-eden-cream text-eden-black pt-32 pb-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* ENCABEZADO EDITORIAL */}
        <header className="mb-20 md:mb-28 max-w-4xl fade-in-up">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-eden-muted mb-4 block">
            Contacto
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] mb-8">
            Estamos aquí <br />para acompañarte.
          </h1>
          <p className="text-lg md:text-xl text-eden-muted font-light leading-relaxed max-w-2xl">
            ¿Tienes alguna pregunta, necesitas oración o deseas saber más sobre cómo involucrarte? Escríbenos y nuestro equipo se pondrá en contacto contigo.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO "DÉJANOS TUS DATOS" */}
          <div className="lg:col-span-7 bg-eden-white border border-eden-stone/60 p-8 md:p-12 shadow-sm">
            <FormularioContacto />
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN DE SEDES Y CONTACTO DIRECTO */}
          <div className="lg:col-span-5 space-y-16">
            
            {/* CANALES GENERALES */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl tracking-tight">Información General</h3>
              <div className="space-y-4 font-light text-sm text-eden-muted">
                <p className="flex items-center gap-4">
                  <Mail size={18} className="text-eden-black shrink-0" />
                  <span>contacto@mirescentral.org</span>
                </p>
                <p className="flex items-center gap-4">
                  <Phone size={18} className="text-eden-black shrink-0" />
                  <span>+56 2 2345 6789</span>
                </p>
              </div>
            </div>

            {/* CONGREGACIONES LOCALES */}
            <div className="space-y-8">
              <h3 className="font-serif text-2xl tracking-tight">Nuestras Casas</h3>
              <div className="space-y-8 border-t border-eden-stone/60 pt-6">
                {sedes?.map((sede) => (
                  <div key={sede.id} className="space-y-3">
                    <h4 className="font-serif text-xl text-eden-black">{sede.nombre}</h4>
                    <div className="space-y-2 font-light text-xs text-eden-muted leading-relaxed">
                      <p className="flex items-start gap-3">
                        <MapPin size={14} className="text-eden-black mt-0.5 shrink-0" />
                        <span>{sede.direccion || "Dirección por confirmar"}</span>
                      </p>
                      <p className="flex items-center gap-3">
                        <Clock size={14} className="text-eden-black shrink-0" />
                        <span>{sede.horarios || "Horarios por confirmar"}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}