import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  // Verificamos si existe un usuario logueado en Supabase
  const { data: { user } } = await supabase.auth.getUser();

  // Si no hay usuario, lo devolvemos a la pantalla de login
  if (!user) {
    redirect('/login');
  }

  // Si es un usuario válido, mostramos el panel de administración
  return <>{children}</>;
}