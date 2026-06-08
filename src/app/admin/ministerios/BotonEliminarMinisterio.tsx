'use client'

import { Trash2 } from 'lucide-react'

export default function BotonEliminarMinisterio({ nombre }: { nombre: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`¿Seguro que deseas eliminar el ministerio ${nombre}?`)) e.preventDefault()
      }}
      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"
    >
      <Trash2 size={16} />
    </button>
  )
}