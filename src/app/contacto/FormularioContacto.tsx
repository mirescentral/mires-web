'use client'

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { enviarMensaje } from './actions';

export default function FormularioContacto() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    const result = await enviarMensaje(formData);
    setIsPending(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert("Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo.");
    }
  }

  // Si el mensaje se envió con éxito, mostramos esta pantalla de agradecimiento
  if (isSuccess) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-serif text-[#1A2E4A] mb-4">¡Mensaje enviado!</h3>
        <p className="font-sans text-gray-600 max-w-sm">
          Gracias por escribirnos. Nuestro equipo ha recibido tu mensaje y te contactaremos a la brevedad.
        </p>
      </div>
    );
  }

  // Si aún no se envía, mostramos el formulario
  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-serif text-[#1A2E4A] mb-6">Envíanos un mensaje</h2>
      <form action={handleSubmit} className="space-y-6 font-sans">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
          <input type="text" name="nombre" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" placeholder="Ej: Juan Pérez" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Correo electrónico</label>
          <input type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" placeholder="juan@ejemplo.com" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
          <textarea name="mensaje" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E8863A] focus:border-transparent outline-none transition-all" placeholder="¿En qué podemos ayudarte?" required></textarea>
        </div>
        <button type="submit" disabled={isPending} className="w-full bg-[#E8863A] text-white font-semibold py-4 rounded-xl hover:bg-[#d1752f] disabled:bg-[#E8863A]/50 transition-colors flex items-center justify-center gap-2">
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {isPending ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </div>
  );
}