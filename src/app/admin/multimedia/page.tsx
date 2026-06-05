import { subirImagenHero } from './actions';
import { Image as ImageIcon, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
      
      {/* CABECERA */}
      <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E6E5E1]">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#737373] mb-2 block">
            CMS Panel
          </span>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            Archivo Multimedia
          </h1>
        </div>
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#737373] hover:text-[#0A0A0A] transition-colors"
        >
          <ArrowLeft size={14} /> Volver al Inicio
        </Link>
      </header>

      {/* MENSAJE DE ÉXITO */}
      {searchParams?.success && (
        <div className="mb-10 p-5 bg-transparent border border-[#0A0A0A] text-[#0A0A0A] text-xs font-semibold tracking-wide uppercase text-center">
          ✓ La nueva imagen de portada fue cargada e implementada en vivo con éxito.
        </div>
      )}

      {/* MENSAJE DE ERROR */}
      {searchParams?.error === 'sin_archivo' && (
        <div className="mb-10 p-5 bg-transparent border border-red-600 text-red-600 text-xs font-semibold tracking-wide uppercase text-center">
          ⚠ Error: Debes seleccionar un archivo de imagen antes de presionar el botón de carga.
        </div>
      )}

      {/* SECCIÓN RECURSO: HERO PÁGINA DE INICIO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        
        <div className="md:col-span-1 space-y-4">
          <h2 className="font-serif text-2xl tracking-tight">Imagen de Portada</h2>
          <p className="text-xs font-light text-[#737373] leading-relaxed">
            Esta fotografía se renderiza a pantalla completa en la sección principal de la Landing Page. Se recomienda utilizar archivos apaisados de alta resolución en escala de grises o tonos oscuros.
          </p>
        </div>

        <div className="md:col-span-2">
          <form action={subirImagenHero} className="border border-[#E6E5E1] p-8 md:p-12 bg-white flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#F9F8F6] border border-[#E6E5E1] flex items-center justify-center text-[#0A0A0A] mb-6">
              <ImageIcon size={24} strokeWidth={1.5} />
            </div>
            
            <div className="mb-8 max-w-sm">
              <label className="block text-xs font-semibold tracking-widest uppercase text-[#0A0A0A] mb-3 cursor-pointer hover:text-[#737373] transition-colors">
                [ Seleccionar Archivo ]
                {/* Eliminamos el 'required' problemático aquí */}
                <input 
                  type="file" 
                  name="imagen_hero" 
                  accept="image/*" 
                  className="hidden" 
                />
              </label>
              <p className="text-[10px] text-[#737373] font-light tracking-wider">
                Formatos admitidos: PNG, JPG o WEBP. Tamaño máximo recomendado: 3MB.
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full max-w-xs bg-[#0A0A0A] text-white font-semibold py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#737373] transition-colors flex items-center justify-center gap-3"
            >
              Cargar en el Servidor <Upload size={14} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}