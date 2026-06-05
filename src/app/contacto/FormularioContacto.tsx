'use client'

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { enviarMensaje } from './actions';

export default function FormularioContacto() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await enviarMensaje(formData);
    setIsPending(false);
    if (result.success) setIsSuccess(true);
    else alert("Hubo un problema. Por favor, intenta de nuevo.");
  }

  if (isSuccess) {
    return (
      <div className="bg-eden-cream p-10 md:p-16 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <CheckCircle2 size={40} className="text-eden-black mb-6" />
        <h3 className="font-serif-eden text-3xl mb-4">¡Mensaje enviado!</h3>
        <p className="font-sans text-sm font-light text-eden-muted">
          Gracias por escribirnos. Nuestro equipo te contactará a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-eden-cream p-10 md:p-16">
      <h2 className="font-serif-eden text-3xl mb-8">Envíanos un mensaje</h2>
      <form action={handleSubmit} className="space-y-8 font-sans">
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">Nombre completo</label>
          <input type="text" name="nombre" required className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none text-eden-black" />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">Correo electrónico</label>
          <input type="email" name="email" required className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none text-eden-black" />
        </div>
        <div>
          <label className="block text-xs font-semibold tracking-widest uppercase text-eden-muted mb-3">Mensaje</label>
          <textarea name="mensaje" rows={4} required className="w-full bg-transparent border-b border-eden-stone focus:border-eden-black py-2 outline-none transition-colors rounded-none text-eden-black resize-none"></textarea>
        </div>
        <button type="submit" disabled={isPending} className="w-full bg-eden-black text-eden-white font-semibold py-5 text-xs tracking-[0.2em] uppercase hover:bg-eden-muted disabled:bg-eden-stone transition-colors flex items-center justify-center gap-3 mt-4">
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
          {isPending ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  );
}