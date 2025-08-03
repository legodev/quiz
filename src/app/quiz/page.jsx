'use client'

import { useState, useEffect } from 'react'
import { preguntasQuiz } from './questionArray'
import { useRouter } from 'next/navigation'
import styles from "./page.module.css"

export default function Questions() {
  const router = useRouter()
  const [preguntaActual, setPreguntaActual] = useState(0) // Índice de la pregunta actual
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('')
  const [respuestasUsuario, setRespuestasUsuario] = useState([]) // Para guardar las respuestas
  const [puntaje, setPuntaje] = useState(0)
  const [nombreParticipante, setNombreParticipante] = useState('')

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('participanteActual')
    if (nombreGuardado) {
      setNombreParticipante(nombreGuardado)
    }
  }, [])

  const getInitialNombres = () => {
    if (typeof window !== 'undefined') {
      const guardados = localStorage.getItem('nombres')
      if (guardados) {
        return JSON.parse(guardados)
      }
    }
    return []
  }

  // console.log

  // Función para manejar la selección de una respuesta
  const handleSeleccion = (opcion) => {
    setOpcionSeleccionada(opcion)
  }

  // Función para pasar a la siguiente pregunta
  const handleSiguientePregunta = () => {
    // 1. Guardar la respuesta actual
    setRespuestasUsuario([
      ...respuestasUsuario,
      {
        pregunta: preguntasQuiz[preguntaActual].pregunta,
        respuesta: opcionSeleccionada,
      },
    ])

    const respuestaCorrecta = preguntasQuiz[preguntaActual].respuestaCorrecta

    if (opcionSeleccionada === respuestaCorrecta) {
      setPuntaje(puntaje + 1)
    }

    setOpcionSeleccionada('')

    if (preguntaActual < preguntasQuiz.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      const participantesGuardados = localStorage.getItem('nombres')
      let participantes = participantesGuardados
        ? JSON.parse(participantesGuardados)
        : []

      const listaActualizada = participantes.map((p) => {
        if (p.nombre === nombreParticipante) {
          const puntajeFinal =
            puntaje + (opcionSeleccionada === respuestaCorrecta ? 1 : 0)

          return { ...p, estrellas: puntajeFinal }
        }
        return p
      })

      localStorage.setItem('nombres', JSON.stringify(listaActualizada))

      localStorage.removeItem('participanteActual')
      router.push('./leaderboard')
    }
  }

  const pregunta = preguntasQuiz[preguntaActual]

  return (
    <main className={styles.main}>
      <h3 className={styles.title}>
        Pregunta {preguntaActual + 1} de {preguntasQuiz.length}
      </h3>
      <p className={styles.question}>{pregunta.pregunta}</p>

      <div className={styles.optionContainer}>
        {pregunta.opciones.map((opcion, index) => (
          <button
            key={index}
            className={styles.btn}
            onClick={() => handleSeleccion(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      {opcionSeleccionada && (
        <button className={styles.btn} onClick={handleSiguientePregunta}>
          {preguntaActual < preguntasQuiz.length - 1
            ? 'Siguiente Pregunta'
            : 'Finalizar Quiz'}
        </button>
      )}
    </main>
  )
}
