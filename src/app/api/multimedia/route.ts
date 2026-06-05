import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const archivo = formData.get('imagen') as File | null;
    const seccion = formData.get('seccion') as string | null;

    if (!archivo || !seccion) {
      return NextResponse.json({ status: 'error', message: 'Falta adjuntar la imagen' }, { status: 400 });
    }

    let nombreArchivo = '';
    if (seccion === 'hero') nombreArchivo = 'foto-principal-hero.png';
    else if (seccion === 'soy-nuevo') nombreArchivo = 'bg-soy-nuevo.png';
    else if (seccion === 'ministerios') nombreArchivo = 'bg-ministerios.png';
    else if (seccion === 'quienes-somos') nombreArchivo = 'bg-quienes-somos.png';

    const supabase = await createClient();

    // Transformación robusta de File a Buffer para entornos Vercel Edge/Node
    const arrayBuffer = await archivo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
      .from('recursos_web')
      .upload(nombreArchivo, buffer, {
        contentType: archivo.type,
        upsert: true
      });

    // Si Supabase falla (por políticas RLS, claves o tamaño), atrapamos el error exacto
    if (error) {
      console.error("Supabase rechaza la imagen:", error);
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'success', seccion });
  } catch (err: any) {
    console.error("Error del servidor:", err);
    return NextResponse.json({ status: 'error', message: err.message || 'Error de conexión interno' }, { status: 500 });
  }
}