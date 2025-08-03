// components/Form.jsx
'use client'
import style from './Form.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()
  const [nombreInput, setNombreInput] = useState('')

  // Lógica de `localStorage` integrada en el Form
  const getInitialNombres = () => {
    if (typeof window !== 'undefined') {
      const guardados = localStorage.getItem('nombres')
      if (guardados) {
        return JSON.parse(guardados)
      }
    }
    return []
  }

  const [nombres, setNombres] = useState(getInitialNombres)

  useEffect(() => {
    localStorage.setItem('nombres', JSON.stringify(nombres))
  }, [nombres])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (nombreInput.trim() === '') {
      alert('Por favor, ingresa tu nombre.')
      return
    }

    const nuevoParticipante = {
      nombre: nombreInput.trim(),
      estrellas: 0, // Inicia con 0 estrellas
    }

    // 1. Añadir el nuevo participante a la lista
    setNombres([...nombres, nuevoParticipante])

    // 2. Guardar el nombre del participante actual en una clave temporal
    localStorage.setItem('participanteActual', nombreInput.trim())

    // 3. Limpiar el input y redirigir
    setNombreInput('')
    router.push('/quiz') // Usar el router para navegar, no un enlace
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type="text"
        id="nombreInput"
        value={nombreInput}
        onChange={(e) => setNombreInput(e.target.value)}
        placeholder="Escribe tu nombre aquí"
        className={style.input}
      />
      <button type="submit" className={style.btn}>Comenzar Quiz</button>
    </form>
  )
}
