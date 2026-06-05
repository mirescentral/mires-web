'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function subirImagenHero(formData: FormData) {
  const supabase = await createClient();
  const archivo = formData.get('imagen_hero') as File;

  if (!archivo || archivo.size === 0) {
    return { success: false, error: 'No se seleccionó ninguna imagen.' };
  }

  // Definimos un nombre fijo para la foto de portada principal
  const nombreArchivo = 'foto-principal-hero.png';

  // Subimos el archivo reemplazando el anterior en el storage público
  const { data, error } = await supabase.storage
    .from('recursos_web')
    .upload(nombreArchivo, archivo, {
      cacheControl: '3600',
      upsert: true // Indica que si ya existe, la sobreescriba
    });

  if (error) {
    console.error('Error al subir la imagen a Supabase Storage:', error);
    return { success: false, error: error.message };
  }

  // Limpiamos la caché de la landing pública para que muestre el cambio de inmediato
  revalidatePath('/');
  revalidatePath('/admin/multimedia');
  
  redirect('/admin/multimedia?success=true');
}