'use client'
import { useState, useEffect } from 'react'
import ListaNombres from '../components/ListaNombres'

export default function LeaderBoard() {
  const [nombres, setNombres] = useState([])

  useEffect(() => {
    const guardados = localStorage.getItem('nombres')
    if (guardados) {
      setNombres(JSON.parse(guardados))
    }
  }, [])

  return (
    <>
      <ListaNombres nombres={nombres} estrellas={nombres.estrellas}/>
    </>
  )
}
