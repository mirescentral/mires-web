'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function actualizarSede(formData: FormData) {
  const supabase = await createClient()

  // Extraemos los datos del formulario
  const id = formData.get('id') as string
  const nombre = formData.get('nombre') as string
  const direccion = formData.get('direccion') as string
  const horarios = formData.get('horarios') as string
  const whatsapp = formData.get('whatsapp') as string

  // Actualizamos la base de datos
  const { error } = await supabase
    .from('sedes')
    .update({ 
      nombre, 
      direccion, 
      horarios, 
      whatsapp 
    })
    .eq('id', id)

  if (error) {
    console.error("Error actualizando sede:", error)
    // Podríamos manejar el error aquí, pero por ahora lanzaremos un log
  }

  // ¡La Magia de Next.js! Le decimos que limpie la caché de estas páginas 
  // para que los visitantes vean los cambios de inmediato
  revalidatePath('/')
  revalidatePath('/contacto')
  revalidatePath('/admin/sedes')
  
  redirect('/admin/sedes?success=true')
}