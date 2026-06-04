'use server'

import { createClient } from '@/utils/supabase/server';

export async function enviarMensaje(formData: FormData) {
  const supabase = await createClient();

  const nombre = formData.get('nombre') as string;
  const email = formData.get('email') as string;
  const mensaje = formData.get('mensaje') as string;

  const { error } = await supabase
    .from('mensajes_contacto')
    .insert([
      { nombre, email, mensaje }
    ]);

  if (error) {
    console.error('Error guardando mensaje:', error);
    return { success: false };
  }

  return { success: true };
}