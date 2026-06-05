'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function subirImagenSeccion(formData: FormData) {
  const supabase = await createClient();
  
  const archivo = formData.get('imagen') as File;
  const seccion = formData.get('seccion') as string; // 'hero', 'soy-nuevo', 'ministerios', 'quienes-somos'

  if (!archivo || archivo.size === 0 || !seccion) {
    redirect(`/admin/multimedia?error=sin_archivo`);
  }

  // Asignación de nombres fijos y limpios según la sección para evitar desorden en la nube
  let nombreArchivo = '';
  if (seccion === 'hero') nombreArchivo = 'foto-principal-hero.png';
  else if (seccion === 'soy-nuevo') nombreArchivo = 'bg-soy-nuevo.png';
  else if (seccion === 'ministerios') nombreArchivo = 'bg-ministerios.png';
  else if (seccion === 'quienes-somos') nombreArchivo = 'bg-quienes-somos.png';
  else {
    redirect(`/admin/multimedia?error=sin_archivo`);
  }

  try {
    const arrayBuffer = await archivo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Subimos usando upsert: true para sobreescribir la imagen vieja de inmediato
    const { error } = await supabase.storage
      .from('recursos_web')
      .upload(nombreArchivo, buffer, {
        contentType: archivo.type,
        upsert: true
      });

    if (error) {
      console.error("Error Supabase Storage:", error);
      redirect(`/admin/multimedia?error=falla_servidor`);
    }

    // Rompemos la caché de Next.js en las rutas correspondientes de inmediato
    revalidatePath('/');
    revalidatePath('/soy-nuevo');
    revalidatePath('/ministerios');
    revalidatePath('/quienes-somos');
    
    redirect(`/admin/multimedia?success=true&actualizado=${seccion}`);
  } catch (err) {
    console.error("Error crítico en carga:", err);
    redirect(`/admin/multimedia?error=falla_servidor`);
  }
}