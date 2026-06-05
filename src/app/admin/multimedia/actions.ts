'use server'

import { createClient } from '@/utils/supabase/server';

export async function subirImagenSeccion(formData: FormData) {
  try {
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

    const supabase = await createClient();

    // Enviamos el archivo puro directo a Supabase. Sin buffers que ahoguen a Vercel.
    const { error } = await supabase.storage
      .from('recursos_web')
      .upload(nombreArchivo, archivo, {
        upsert: true
      });

    if (error) {
      console.error("Error de Supabase:", error.message);
      return { status: 'error', code: 'falla_servidor' };
    }

    // Retornamos éxito al navegador de forma ligera
    return { status: 'success', seccion };

  } catch (err) {
    console.error("Error crítico en carga:", err);
    return { status: 'error', code: 'falla_servidor' };
  }
}