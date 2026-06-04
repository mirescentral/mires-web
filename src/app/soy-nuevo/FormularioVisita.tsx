'use client'

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { registrarVisitante } from './actions';

// Definimos la forma de los datos que recibe el componente
interface Sede {
  id: string;
  nombre: string;
}

export default function FormularioVisita({ sedes }: { sedes: Sede[] }) {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Manejador del envío
  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await registrarVisitante(formData);
    setIsPending(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert("Hubo un problema al enviar los datos. Por favor, intenta de nuevo.");
    }
  }

  // Si ya se envió con éxito, mostramos un mensaje de agradecimiento
  if (isSuccess) {
    return (
      <div className="bg-mires-white p-8 md:p-10 rounded-2xl shadow-lg border border-mires-primary/10 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-display font-bold text-2xl text-mires-primary mb-2">¡Datos enviados!</h3>
        <p className="font-sans text-mires-textMuted">
          Nos alegra mucho que decidas visitarnos. Uno de nuestros coordinadores te escribirá pronto por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-mires-white p-8 md:p-10 rounded-2xl shadow-lg border border-mires-primary/10">
      <h3 className="font-display font-bold text-2xl text-mires-primary mb-2">Déjanos tus datos</h3>
      <p className="font-sans text-mires-textMuted text-sm mb-6">
        Nos encantaría saludarte, enviarte información y ayudarte en tus primeros pasos.
      </p>
      
      <form action={handleSubmit} className="space-y-4 font-sans">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-mires-textMain mb-1">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="w-full bg-mires-bg border border-mires-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mires-accent focus:ring-1 focus:ring-mires-accent transition-colors" placeholder="Tu nombre" required />
          </div>
          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-mires-textMain mb-1">Apellido</label>
            <input type="text" id="apellido" name="apellido" className="w-full bg-mires-bg border border-mires-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mires-accent focus:ring-1 focus:ring-mires-accent transition-colors" placeholder="Tu apellido" />
          </div>
        </div>
        
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-mires-textMain mb-1">WhatsApp</label>
          <input type="tel" id="whatsapp" name="whatsapp" className="w-full bg-mires-bg border border-mires-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mires-accent focus:ring-1 focus:ring-mires-accent transition-colors" placeholder="+56 9 1234 5678" required />
        </div>

        <div>
          <label htmlFor="sede_id" className="block text-sm font-medium text-mires-textMain mb-1">¿A qué sede te gustaría asistir?</label>
          <select id="sede_id" name="sede_id" className="w-full bg-mires-bg border border-mires-primary/10 rounded-lg px-4 py-3 focus:outline-none focus:border-mires-accent focus:ring-1 focus:ring-mires-accent transition-colors text-mires-textMain" required>
            <option value="">Selecciona una opción</option>
            {sedes.map(sede => (
              <option key={sede.id} value={sede.id}>{sede.nombre}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-mires-primary hover:bg-mires-primary/90 disabled:bg-mires-primary/50 text-mires-white px-6 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5 mt-4"
        >
          {isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {isPending ? 'Enviando...' : 'Enviar mis datos'}
        </button>
        <p className="text-xs text-mires-textMuted text-center mt-4">
          Tus datos están seguros con nosotros. No compartimos tu información.
        </p>
      </form>
    </div>
  );
}