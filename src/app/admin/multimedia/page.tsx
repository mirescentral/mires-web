import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import FormularioMultimedia from './FormularioMultimedia';

export const metadata = {
  title: "Gestión Multimedia | Admin MIRES",
};

export default async function AdminMultimediaPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string, error?: string, actualizado?: string, detalle?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#0A0A0A] p-8 md:p-12 font-sans max-w-5xl mx-auto pt-32">
      
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E6E5E1]">
        {/* ... (Cabecera intacta) ... */}
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 flex items-center gap-2">
            <ImageIcon size={14} /> CMS Panel
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Archivo Multimedia</h1>
        </div>
        <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors shrink-0">
          <ArrowLeft size={14} /> Volver al Inicio
        </Link>
      </header>

      {/* ALERTAS */}
      {params?.success && (
        <div className="mb-10 p-5 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold tracking-wide uppercase text-center">
          ✓ La imagen para la sección '{params.actualizado}' fue actualizada con éxito.
        </div>
      )}

      {params?.error === 'falla_servidor' && (
        <div className="mb-10 p-6 bg-red-50 border-l-4 border-red-600 flex flex-col gap-2">
          <span className="font-bold text-red-800 text-sm uppercase tracking-widest">⚠ Error al subir archivo</span>
          <span className="font-mono text-xs text-red-600 bg-red-100 p-2 rounded-sm mt-1">
            Motivo de Supabase: {params.detalle || 'Error desconocido del servidor.'}
          </span>
        </div>
      )}

      <div className="bg-white p-8 border border-[#E6E5E1] shadow-sm">
        <h2 className="font-serif text-2xl tracking-tight mb-8 border-b border-[#E6E5E1] pb-4">Fondos y Texturas</h2>
        <FormularioMultimedia />
      </div>

    </div>
  );
}