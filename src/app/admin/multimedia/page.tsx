import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import FormularioMultimedia from './FormularioMultimedia';

export const metadata = {
  title: "Gestión Multimedia | Admin MIRES",
};

export default async function AdminMultimediaPage({
  searchParams,
}: {
  searchParams: { success?: string, error?: string, actualizado?: string };
}) {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A0A0A] p-8 md:p-12 font-sans max-w-5xl mx-auto pt-32">
      
      {/* CABECERA */}
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E6E5E1]">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 flex items-center gap-2">
            <ImageIcon size={14} /> CMS Panel
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            Archivo Multimedia
          </h1>
          <p className="text-[#737373] font-light mt-4 text-sm max-w-xl">
            Gestiona las fotografías de fondo y texturas de las diferentes secciones de la plataforma pública.
          </p>
        </div>
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors shrink-0"
        >
          <ArrowLeft size={14} /> Volver al Inicio
        </Link>
      </header>

      {/* MENSAJES DE ESTADO */}
      {searchParams?.success && (
        <div className="mb-10 p-5 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase text-center">
          ✓ La imagen para la sección '{searchParams.actualizado}' fue actualizada e implementada en vivo con éxito.
        </div>
      )}

      {searchParams?.error === 'sin_archivo' && (
        <div className="mb-10 p-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-wide uppercase text-center">
          ⚠ Error: El archivo no se adjuntó correctamente. Intenta de nuevo.
        </div>
      )}

      {searchParams?.error === 'falla_servidor' && (
        <div className="mb-10 p-5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold tracking-wide uppercase text-center flex flex-col gap-2">
          <span>⚠ Error del Servidor al guardar la imagen.</span>
          <span className="font-light text-[10px] lowercase normal-case">Por favor, verifica tu conexión o intenta con un archivo más ligero.</span>
        </div>
      )}

      {/* ÁREA DE CARGA (Aquí vive el componente que actualizamos antes) */}
      <div className="bg-white p-8 border border-[#E6E5E1] shadow-sm">
        <h2 className="font-serif text-2xl tracking-tight mb-8 border-b border-[#E6E5E1] pb-4">
          Fondos y Texturas
        </h2>
        
        <FormularioMultimedia />
        
      </div>

    </div>
  );
}