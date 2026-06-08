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
    from: 'Mires Web <onboarding@resend.dev>',
    to: 'contacto@mires.cl',
    subject: `Nuevo mensaje de ${nombre}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin:0;padding:0;background-color:#F5F4F0;font-family:Georgia,serif;">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F4F0;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #E0DDD6;">
                
                <!-- HEADER -->
                <tr>
                  <td style="background-color:#0A0A0A;padding:32px 48px;">
                    <p style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:bold;color:#ffffff;letter-spacing:0.05em;">
                      mires.
                    </p>
                  </td>
                </tr>

                <!-- TÍTULO -->
                <tr>
                  <td style="padding:48px 48px 0 48px;border-bottom:1px solid #E0DDD6;">
                    <p style="margin:0 0 8px 0;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.2em;text-transform:uppercase;color:#737373;">
                      Formulario de contacto
                    </p>
                    <h1 style="margin:0 0 32px 0;font-family:Georgia,serif;font-size:32px;font-weight:bold;color:#0A0A0A;line-height:1.1;">
                      Nuevo mensaje recibido
                    </h1>
                  </td>
                </tr>

                <!-- DATOS -->
                <tr>
                  <td style="padding:40px 48px;">
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:24px;border-bottom:1px solid #E0DDD6;">
                          <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;color:#737373;">Nombre</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#0A0A0A;">${nombre}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px 0;border-bottom:1px solid #E0DDD6;">
                          <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;color:#737373;">Correo electrónico</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:18px;color:#0A0A0A;">
                            <a href="mailto:${email}" style="color:#0A0A0A;">${email}</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:24px 0;">
                          <p style="margin:0 0 12px 0;font-family:Arial,sans-serif;font-size:10px;font-weight:bold;letter-spacing:0.15em;text-transform:uppercase;color:#737373;">Mensaje</p>
                          <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;font-weight:300;color:#404040;line-height:1.7;white-space:pre-wrap;">${mensaje}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- BOTÓN RESPONDER -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                      <tr>
                        <td>
                          <a href="mailto:${email}" style="display:inline-block;background-color:#0A0A0A;color:#ffffff;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:16px 32px;">
                            Responder a ${nombre} →
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background-color:#F5F4F0;padding:24px 48px;border-top:1px solid #E0DDD6;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#737373;font-weight:300;">
                      Este mensaje fue enviado desde el formulario de contacto de <strong>mires-web.vercel.app</strong>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>
      </html>
    `,
  });

  return { success: true };
}