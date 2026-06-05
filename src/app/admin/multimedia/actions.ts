'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function subirImagenSeccion(formData: FormData) {
  const supabase = await createClient();
  
  const archivo = formData.get('imagen') as File;
  const seccion = formData.get('seccion') as string;

  if (!archivo || archivo.size === 0 || !seccion) {
    redirect(`/admin/multimedia?error=sin_archivo`);
  }

  let nombreArchivo = '';
  if (seccion === 'hero') nombreArchivo = 'foto-principal-hero.png';
  else if (seccion === 'soy-nuevo') nombreArchivo = 'bg-soy-nuevo.png';
  else if (seccion === 'ministerios') nombreArchivo = 'bg-ministerios.png';
  else if (seccion === 'quienes-somos') nombreArchivo = 'bg-quienes-somos.png';
  else {
    redirect(`/admin/multimedia?error=sin_archivo`);
  }

  // Variable para guardar a dónde iremos después
  let urlRedireccion = '';

  try {
    // Subimos el archivo nativo directamente a Supabase
    const { error } = await supabase.storage
      .from('recursos_web')
      .upload(nombreArchivo, archivo, {
        contentType: archivo.type,
        upsert: true // Sobreescribe si ya existe
      });

    if (error) {
      console.error("Error de permisos en Supabase Storage:", error);
      urlRedireccion = `/admin/multimedia?error=falla_servidor`;
    } else {
      // Si todo sale bien, rompemos caché y preparamos redirección de éxito
      revalidatePath('/');
      revalidatePath('/soy-nuevo');
      revalidatePath('/ministerios');
      revalidatePath('/quienes-somos');
      urlRedireccion = `/admin/multimedia?success=true&actualizado=${seccion}`;
    }
  } catch (err) {
    console.error("Error crítico en carga:", err);
    urlRedireccion = `/admin/multimedia?error=falla_servidor`;
  }

  // En Next.js, redirect SIEMPRE debe ir fuera del try/catch
  redirect(urlRedireccion);
}