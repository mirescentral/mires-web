import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const nombre = formData.get('nombre') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const sede_id = formData.get('sede_id') as string;

    // Validación de seguridad básica
    if (!nombre || !whatsapp || !sede_id) {
      return NextResponse.redirect(new URL('/soy-nuevo?error=campos_vacios', request.url), 303);
    }

    const supabase = await createClient();

    // Guardar en la tabla "visitantes"
    const { error } = await supabase
      .from('visitantes')
      .insert([
        { nombre, whatsapp, sede_id }
      ]);

    if (error) {
      console.error("Error de Supabase:", error);
      throw error;
    }

    // Si todo sale bien, lo devolvemos a la página con un mensaje de éxito
    return NextResponse.redirect(new URL('/soy-nuevo?success=true', request.url), 303);
    
  } catch (error) {
    console.error('Error al guardar el visitante:', error);
    return NextResponse.redirect(new URL('/soy-nuevo?error=servidor', request.url), 303);
  }
}