'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function subirImagenHero(formData: FormData) {
  const supabase = await createClient();
  const archivo = formData.get('imagen_hero') as File;

  if (!archivo || archivo.size === 0) {
    // En lugar de retornar un objeto, redirigimos con un error en la URL
    redirect('/admin/multimedia?error=sin_archivo');
  }

  // Definimos un nombre fijo para la foto de portada principal
  const nombreArchivo = 'foto-principal-hero.png';

  // Subimos el archivo reemplazando el anterior en el storage público
  const { error } = await supabase.storage
    .from('recursos_web')
    .upload(nombreArchivo, archivo, {
      cacheControl: '3600',
      upsert: true // Indica que si ya existe, la sobreescriba
    });

  if (error) {
    console.error('Error al subir la imagen a Supabase Storage:', error);
    redirect('/admin/multimedia?error=falla_servidor');
  }

  // Limpiamos la caché de la landing pública para que muestre el cambio de inmediato
  revalidatePath('/');
  revalidatePath('/admin/multimedia');
  
  // Redirigimos con éxito
  redirect('/admin/multimedia?success=true');
}