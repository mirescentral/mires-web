import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FormularioMultimedia from './FormularioMultimedia';

export const metadata = {
  title: "Gestión Multimedia | Admin MIRES",
};

export default async function AdminMultimediaPage({
  searchParams,
}: {
  searchParams: { success?: string, error?: string };
}) {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A0A0A] p-8 md:p-12 font-sans max-w-4xl mx-auto pt-32">
      
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E6E5E1]">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 block">CMS Panel</span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Archivo Multimedia</h1>
        </div>
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors">
          <ArrowLeft size={14} /> Volver al Inicio
        </Link>
      </header>

      {/* MENSAJES DE ESTADO */}
      {searchParams?.success && (
        <div className="mb-10 p-5 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase text-center">
          ✓ La nueva imagen de portada fue cargada con éxito. Ve a la página principal para verla.
        </div>
      )}

      {searchParams?.error === 'sin_archivo' && (
        <div className="mb-10 p-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-wide uppercase text-center">
          ⚠ Error: El archivo no se adjuntó correctamente. Intenta de nuevo.
        </div>
      )}

      {searchParams?.error === 'falla_servidor' && (
        <div className="mb-10 p-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-wide uppercase text-center flex flex-col gap-2">
          <span>⚠ Error del Servidor (Supabase): Permisos denegados.</span>
          <span className="font-light text-[10px] lowercase normal-case">Debes ejecutar las políticas SQL en Supabase para permitir subir archivos al cubo 'recursos_web'.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1 space-y-4">
          <h2 className="font-serif text-2xl tracking-tight">Imagen de Portada</h2>
          <p className="text-xs font-light text-[#737373] leading-relaxed">
            Esta fotografía se renderiza a pantalla completa en la sección principal de la Landing Page.
          </p>
        </div>

        <div className="md:col-span-2">
          {/* AQUÍ ESTAMOS LLAMANDO AL NUEVO FORMULARIO INTELIGENTE */}
          <FormularioMultimedia />
        </div>
      </div>

    </div>
  );
}