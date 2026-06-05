import { createClient } from '@/utils/supabase/server';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';

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
            <h2 className="font-serif text-3xl mb-8 tracking-tight">Déjanos tus datos</h2>
            
            {/* Formulario de contacto (puedes vincularlo a un Server Action para guardar en Supabase) */}
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-eden-muted">Nombre Completo</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ej. Juan Pérez"
                    className="bg-transparent border-b border-eden-stone focus:border-eden-black py-2 text-sm font-light outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-eden-muted">Correo Electrónico</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="juan@ejemplo.com"
                    className="bg-transparent border-b border-eden-stone focus:border-eden-black py-2 text-sm font-light outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-eden-muted">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="+56 9 1234 5678"
                    className="bg-transparent border-b border-eden-stone focus:border-eden-black py-2 text-sm font-light outline-none transition-colors"
                  />
                </div>

                {/* NUEVO CAMPO: SELECCIÓN DINÁMICA DE IGLESIA (SEDE) */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-eden-muted">¿A qué iglesia asistirás?</label>
                  <div className="relative">
                    <select 
                      name="sede_id"
                      required
                      defaultValue=""
                      className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 text-sm font-light outline-none appearance-none rounded-none cursor-pointer transition-colors text-eden-black"
                    >
                      <option value="" disabled className="text-eden-muted">Selecciona una sede</option>
                      {sedes?.map((sede) => (
                        <option key={sede.id} value={sede.id} className="bg-eden-cream text-eden-black">
                          {sede.nombre}
                        </option>
                      ))}
                    </select>
                    {/* Pequeña flecha geométrica decorativa para el menú desplegable */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-eden-muted">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-eden-muted">¿En qué podemos ayudarte?</label>
                <textarea 
                  rows={4}
                  placeholder="Escribe tu mensaje o petición aquí..."
                  className="bg-transparent border border-eden-stone focus:border-eden-black p-4 text-sm font-light outline-none transition-colors resize-none rounded-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-eden-black text-eden-white font-bold py-5 text-xs tracking-widest uppercase hover:bg-eden-muted transition-colors duration-300 flex items-center justify-center gap-3 rounded-none"
              >
                Enviar Mensaje <ArrowRight size={14} />
              </button>
            </form>
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