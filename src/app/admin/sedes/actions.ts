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

  // Preparamos los datos básicos
  const updateData: any = { nombre, direccion, horarios, whatsapp }
  // Solo intentamos guardar map_url si enviaste un dato, por si no has creado la columna en Supabase
  if (map_url) updateData.map_url = map_url

  const { error } = await supabase.from('sedes').update(updateData).eq('id', id)
  
  if (error) console.error("Error al actualizar:", error)

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

  const insertData: any = { nombre, direccion, horarios, whatsapp }
  if (map_url) insertData.map_url = map_url

  const { error } = await supabase.from('sedes').insert([insertData])
  
  if (error) console.error("Error al crear:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/sedes?success=creado')
}

// 3. ELIMINAR SEDE
export async function eliminarSede(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('sedes').delete().eq('id', id)
  
  if (error) console.error("Error al eliminar:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/sedes?success=eliminado')
}