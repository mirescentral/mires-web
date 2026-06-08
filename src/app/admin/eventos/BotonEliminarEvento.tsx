'use client'

import { Trash2 } from 'lucide-react'

export default function BotonEliminarEvento({ titulo }: { titulo: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`¿Estás seguro de eliminar "${titulo}"?`)) e.preventDefault()
      }}
      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 text-sm font-semibold"
      title="Eliminar Evento"
    >
      <Trash2 size={18} />
      <span className="sm:hidden">Eliminar</span>
    </button>
  )
}