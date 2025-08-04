// components/Form.jsx
'use client'
import style from './Form.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()
  const [nombreInput, setNombreInput] = useState('')
  const characterLimit = '18'

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
      estrellas: 0,
    }

    setNombres([...nombres, nuevoParticipante])

    localStorage.setItem('participanteActual', nombreInput.trim())

    setNombreInput('')
    router.push('/quiz')
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        type="text"
        id="nombreInput"
        maxLength={20}
        value={nombreInput}
        onChange={(e) => {
          const newValue = e.target.value
          // Si el nuevo valor está dentro del límite, actualizamos el estado.
          if (newValue.length <= characterLimit) {
            setNombreInput(newValue)
          }
        }}
        placeholder="Escribe tu nombre aquí"
        className={style.input}
      />
      <button type="submit" className={style.btn}>
        Comenzar Quiz
      </button>
    </form>
  )
}
