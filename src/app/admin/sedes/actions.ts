'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 1. ACTUALIZAR SEDE EXISTENTE
export async function actualizarSede(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const nombre = formData.get('nombre') as string
  const direccion = formData.get('direccion') as string
  const horarios = formData.get('horarios') as string
  const whatsapp = formData.get('whatsapp') as string
  const map_url = formData.get('map_url') as string

  const { error } = await supabase
    .from('sedes')
    .update({ nombre, direccion, horarios, whatsapp, map_url })
    .eq('id', id)

  if (error) console.error("Error actualizando sede:", error)

  // Limpiamos la caché global para que el cambio se vea en todas partes
  revalidatePath('/', 'layout')
  redirect('/admin/sedes?success=actualizado')
}

// 2. CREAR NUEVA SEDE
export async function crearSede(formData: FormData) {
  const supabase = await createClient()

  const nombre = formData.get('nombre') as string
  const direccion = formData.get('direccion') as string
  const horarios = formData.get('horarios') as string
  const whatsapp = formData.get('whatsapp') as string
  const map_url = formData.get('map_url') as string

  const { error } = await supabase
    .from('sedes')
    .insert([{ nombre, direccion, horarios, whatsapp, map_url }])

  if (error) console.error("Error creando sede:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/sedes?success=creado')
}

// 3. ELIMINAR SEDE
export async function eliminarSede(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('sedes').delete().eq('id', id)

  if (error) console.error("Error eliminando sede:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/sedes?success=eliminado')
}