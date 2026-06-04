'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Función para crear un nuevo evento
export async function crearEvento(formData: FormData) {
  const supabase = await createClient()

  const titulo = formData.get('titulo') as string
  const fechaLocal = formData.get('fecha') as string
  const registro_url = formData.get('registro_url') as string
  const sede_id = formData.get('sede_id') as string

  // Convertimos la fecha del formulario al formato de base de datos
  const fecha = new Date(fechaLocal).toISOString()

  const { error } = await supabase
    .from('eventos')
    .insert([
      { 
        titulo, 
        fecha, 
        registro_url, 
        sede_id: sede_id ? parseInt(sede_id) : null 
      }
    ])

  if (error) {
    console.error("Error al crear evento:", error)
  }

  // Limpiamos la caché para que el evento aparezca de inmediato en la web pública
  revalidatePath('/eventos')
  revalidatePath('/admin/eventos')
  redirect('/admin/eventos?success=true')
}

// Función para eliminar un evento
export async function eliminarEvento(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  await supabase.from('eventos').delete().eq('id', id)

  revalidatePath('/eventos')
  revalidatePath('/admin/eventos')
}