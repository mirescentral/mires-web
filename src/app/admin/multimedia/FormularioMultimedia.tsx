'use client'

import { useState } from 'react';
import { Image as ImageIcon, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { subirImagenHero } from './actions';

export default function FormularioMultimedia() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Esta función detecta cuando seleccionas una foto en tu computadora
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivo(e.target.files[0]);
    }
  };

  return (
    <form 
      action={async (formData) => {
        setIsPending(true);
        await subirImagenHero(formData);
        setIsPending(false); 
      }} 
      className="border border-[#E6E5E1] p-8 md:p-12 bg-white flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 bg-[#F9F8F6] border border-[#E6E5E1] flex items-center justify-center text-[#0A0A0A] mb-6 rounded-full">
        <ImageIcon size={24} strokeWidth={1.5} />
      </div>
      
      <div className="mb-8 max-w-sm">
        <label className="block text-xs font-semibold tracking-widest uppercase text-[#0A0A0A] mb-3 cursor-pointer hover:text-[#737373] transition-colors border-b border-[#0A0A0A] pb-1 inline-block">
          {archivo ? 'Cambiar Archivo' : 'Seleccionar Archivo'}
          <input 
            type="file" 
            name="imagen_hero" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
        
        {/* Aquí mostramos visualmente el nombre del archivo seleccionado */}
        {archivo ? (
          <p className="text-xs text-green-700 font-semibold mt-4 flex items-center justify-center gap-2 bg-green-50 py-2 px-4 border border-green-200">
            <CheckCircle2 size={14} /> {archivo.name} (Listo para subir)
          </p>
        ) : (
          <p className="text-[10px] text-[#737373] font-light tracking-wider mt-4">
            Formatos admitidos: PNG, JPG o WEBP. Tamaño máximo: 3MB.
          </p>
        )}
      </div>

      {/* El botón se desactiva si no hay foto seleccionada */}
      <button 
        type="submit" 
        disabled={isPending || !archivo} 
        className="w-full max-w-xs bg-[#0A0A0A] text-white font-semibold py-4 text-xs tracking-[0.2em] uppercase hover:bg-[#737373] disabled:bg-[#E6E5E1] disabled:text-[#737373] transition-colors flex items-center justify-center gap-3"
      >
        {isPending ? 'Subiendo archivo...' : 'Cargar en el Servidor'}
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
      </button>
    </form>
  );
}