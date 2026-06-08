'use client'

import { Trash2 } from 'lucide-react'

interface Props {
  nombre: string
}

export default function BotonEliminarSede({ nombre }: Props) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(`¿Seguro que deseas eliminar la sede ${nombre}?`))
          e.preventDefault()
      }}
      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"
      title="Eliminar Sede"
    >
      <Trash2 size={16} />
    </button>
  )
}