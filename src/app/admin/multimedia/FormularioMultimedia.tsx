'use client'

import { useState } from 'react';
import { Image as ImageIcon, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { subirImagenSeccion } from './actions';
import { useRouter } from 'next/navigation';

interface CardCargaProps {
  seccion: string;
  titulo: string;
  descripcion: string;
}

function FilaCargaMultimedia({ seccion, titulo, descripcion }: CardCargaProps) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter(); // Agregamos el enrutador de Next.js

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivo(e.target.files[0]);
    }
  };

  return (
    <form 
      action={async (formData) => {
        setIsPending(true);
        formData.append('seccion', seccion);
        
        // Esperamos la respuesta del servidor en lugar de que el servidor nos redirija
        const respuesta = await subirImagenSeccion(formData);
        
        setIsPending(false); 
        setArchivo(null);

        // Hacemos la redirección nosotros mismos
        if (respuesta.status === 'success') {
          router.push(`/admin/multimedia?success=true&actualizado=${respuesta.seccion}`);
        } else {
          router.push(`/admin/multimedia?error=${respuesta.code}`);
        }
      }} 
      className="border border-[#E6E5E1] p-6 bg-white flex flex-col md:flex-row md:items-center justify-between text-left gap-6 transition-colors hover:border-[#0A0A0A]"
    >
      <div className="flex items-start gap-4 max-w-md">
        <div className="w-12 h-12 bg-[#F9F8F6] border border-[#E6E5E1] flex items-center justify-center text-[#0A0A0A] shrink-0">
          <ImageIcon size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-serif text-lg text-[#0A0A0A] mb-1">{titulo}</h3>
          <p className="text-[11px] font-light text-[#737373] leading-relaxed">{descripcion}</p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 md:w-auto w-full">
        <div className="text-center sm:text-right min-w-[120px]">
          <label className="block text-xs font-semibold tracking-widest uppercase text-[#0A0A0A] cursor-pointer hover:text-[#737373] transition-colors border-b border-[#0A0A0A] pb-0.5 inline-block">
            {archivo ? 'Cambiar' : '[ Seleccionar ]'}
            <input 
              type="file" 
              name="imagen" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
          {archivo && (
            <p className="text-[10px] text-green-700 font-medium mt-1 flex items-center justify-center sm:justify-end gap-1">
              <CheckCircle2 size={10} /> Adjunto
            </p>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isPending || !archivo} 
          className="bg-[#0A0A0A] text-white font-semibold py-3 px-6 text-xs tracking-[0.2em] uppercase hover:bg-[#737373] disabled:bg-[#E6E5E1] disabled:text-[#737373] transition-colors flex items-center justify-center gap-2"
        >
          {isPending ? 'Subiendo' : 'Cargar'}
          {isPending ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
        </button>
      </div>
    </form>
  );
}

export default function FormularioMultimedia() {
  return (
    <div className="space-y-6 w-full">
      <FilaCargaMultimedia 
        seccion="hero"
        titulo="Portada Principal (Landing Hero)"
        descripcion="Fotografía a pantalla completa regulada por opacidad para la primera sección de inicio de la web."
      />
      <FilaCargaMultimedia 
        seccion="soy-nuevo"
        titulo="Fondo Geométrico: Soy Nuevo"
        descripcion="Aplica una textura multimedia sobre el contenedor del formulario 'Déjanos tus datos' en la sección Planifica tu Visita."
      />
      <FilaCargaMultimedia 
        seccion="ministerios"
        titulo="Fondo Geométrico: Ministerios"
        descripcion="Inyecta una fotografía sutil sobre el bloque de cabecera principal de la cartelera de Ministerios."
      />
      <FilaCargaMultimedia 
        seccion="quienes-somos"
        titulo="Fondo Geométrico: Quiénes Somos"
        descripcion="Establece la imagen corporativa/pastoral difuminada sobre el bloque introductorio de Nuestra Historia."
      />
    </div>
  );
}