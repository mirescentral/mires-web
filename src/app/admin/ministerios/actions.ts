'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function actualizarMinisterio(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get('id') as string
  const nombre = formData.get('nombre') as string
  const descripcion_corta = formData.get('descripcion_corta') as string
  const icono = formData.get('icono') as string

  const { error } = await supabase
    .from('ministerios')
    .update({ nombre, descripcion_corta, icono })
    .eq('id', id)

  if (error) console.error("Error al actualizar:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/ministerios?success=actualizado')
}

export async function crearMinisterio(formData: FormData) {
  const supabase = await createClient()

  const nombre = formData.get('nombre') as string
  const descripcion_corta = formData.get('descripcion_corta') as string
  const icono = formData.get('icono') as string || 'Heart'

  const { error } = await supabase
    .from('ministerios')
    .insert([{ nombre, descripcion_corta, icono }])

  if (error) console.error("Error al crear:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/ministerios?success=creado')
}

export async function eliminarMinisterio(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string

  const { error } = await supabase.from('ministerios').delete().eq('id', id)

  if (error) console.error("Error al eliminar:", error)

  revalidatePath('/', 'layout')
  redirect('/admin/ministerios?success=eliminado')
}