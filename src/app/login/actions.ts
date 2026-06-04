'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // Extraemos el correo y contraseña del formulario
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Intentamos iniciar sesión con Supabase
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // Si la contraseña es incorrecta, recargamos la página con un error
    redirect('/login?error=true')
  }

  // Si es correcto, validamos la sesión y redirigimos al panel seguro
  revalidatePath('/admin', 'layout')
  redirect('/admin')
}