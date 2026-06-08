'use server'

import { createClient } from '@/utils/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarMensaje(formData: FormData) {
  const supabase = await createClient();

  const nombre = formData.get('nombre') as string;
  const email = formData.get('email') as string;
  const mensaje = formData.get('mensaje') as string;

  // 1. Guardar en Supabase
  const { error } = await supabase
    .from('mensajes_contacto')
    .insert([{ nombre, email, mensaje }]);

  if (error) {
    console.error('Error guardando mensaje:', error);
    return { success: false };
  }

  // 2. Enviar email a contacto@mires.cl
  await resend.emails.send({
    from: 'Formulario Mires <onboarding@resend.dev>',
    to: 'contacto@mires.cl',
    subject: `Nuevo mensaje de contacto de ${nombre}`,
    html: `
      <h2>Nuevo mensaje desde el formulario web</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `,
  });

  return { success: true };
}