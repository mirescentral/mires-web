'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function subirImagenSeccion(formData: FormData) {
  const supabase = await createClient();
  
  const archivo = formData.get('imagen') as File;
  const seccion = formData.get('seccion') as string;

  if (!archivo || archivo.size === 0 || !seccion) {
    return { status: 'error', code: 'sin_archivo' };
  }

  let nombreArchivo = '';
  if (seccion === 'hero') nombreArchivo = 'foto-principal-hero.png';
  else if (seccion === 'soy-nuevo') nombreArchivo = 'bg-soy-nuevo.png';
  else if (seccion === 'ministerios') nombreArchivo = 'bg-ministerios.png';
  else if (seccion === 'quienes-somos') nombreArchivo = 'bg-quienes-somos.png';
  else {
    return { status: 'error', code: 'sin_archivo' };
  }

  try {
    // Transformamos la imagen a ArrayBuffer (El formato nativo y más seguro para Edge/Vercel)
    const arrayBuffer = await archivo.arrayBuffer();

    const { error } = await supabase.storage
      .from('recursos_web')
      .upload(nombreArchivo, arrayBuffer, {
        contentType: archivo.type,
        upsert: true
      });

    if (error) {
      console.error("Error de permisos en Supabase Storage:", error);
      return { status: 'error', code: 'falla_servidor' };
    }

    // Limpiamos la caché de todas las vistas
    revalidatePath('/');
    revalidatePath('/soy-nuevo');
    revalidatePath('/ministerios');
    revalidatePath('/quienes-somos');
    
    return { status: 'success', seccion };

  } catch (err) {
    console.error("Error crítico en carga:", err);
    return { status: 'error', code: 'falla_servidor' };
  }
}