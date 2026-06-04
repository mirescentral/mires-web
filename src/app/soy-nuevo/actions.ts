'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function registrarVisitante(formData: FormData) {
  const supabase = await createClient();
  
  // Extraemos los datos del formulario
  const nombre = formData.get('nombre') as string;
  const apellido = formData.get('apellido') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const sede_id = formData.get('sede_id') as string;

  // Insertamos en Supabase
  const { error } = await supabase
    .from('visitantes')
    .insert([
      { 
        nombre, 
        apellido, 
        whatsapp, 
        sede_id: sede_id ? sede_id : null 
      }
    ]);

  if (error) {
    console.error('Error guardando visitante:', error);
    return { success: false, error: 'Hubo un error al enviar tus datos.' };
  }

  // Refrescamos la caché de la página
  revalidatePath('/soy-nuevo');
  return { success: true };
}