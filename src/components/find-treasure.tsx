'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const GRID_SIZE = 10

export default function CoordinateGame() {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [guessPosition, setGuessPosition] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    generateNewTarget()
  }, [])

  const generateNewTarget = () => {
    setTargetPosition({
      x: Math.floor(Math.random() * GRID_SIZE) - Math.floor(GRID_SIZE / 2),
      y: Math.floor(Math.random() * GRID_SIZE) - Math.floor(GRID_SIZE / 2),
    })
    setMessage('')
    setAttempts(0)
  }

  const handleGuess = () => {
    setAttempts(attempts + 1)
    if (guessPosition.x === targetPosition.x && guessPosition.y === targetPosition.y) {
      setMessage(`¡Felicidades! Encontraste el tesoro en ${attempts + 1} intentos.`)
    } else {
      let hint = 'El tesoro está '
      if (guessPosition.y < targetPosition.y) hint += 'más al norte '
      else if (guessPosition.y > targetPosition.y) hint += 'más al sur '
      
      if (guessPosition.x < targetPosition.x) hint += (hint.includes(' norte') || hint.includes(' sur') ? 'y ' : '') + 'más al este '
      else if (guessPosition.x > targetPosition.x) hint += (hint.includes(' norte') || hint.includes(' sur') ? 'y ' : '') + 'más al oeste '
      
      setMessage(hint.trim() + ' de tu posición actual.')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Encuentra al tesoro usando coordenadas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Adivina la posición del tesoro en el plano cartesiano. El plano va desde -5 a 5 en ambos ejes.</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Controles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                type="number"
                placeholder="Coordenada X"
                value={guessPosition.x}
                onChange={(e) => setGuessPosition({ ...guessPosition, x: parseInt(e.target.value) })}
                min={-5}
                max={5}
              />
              <Input
                type="number"
                placeholder="Coordenada Y"
                value={guessPosition.y}
                onChange={(e) => setGuessPosition({ ...guessPosition, y: parseInt(e.target.value) })}
                min={-5}
                max={5}
              />
            </div>
            <Button onClick={handleGuess}>Adivinar</Button>
            <Button variant="outline" className="ml-2" onClick={generateNewTarget}>
              Nuevo juego
            </Button>
          </CardContent>
        </Card>
        {message && (
        <Card className="mt-4">
          <CardContent className='flex justify-center items-center w-full h-full'>
            <p className='font-bold'>💡 Pista:  {message}</p>
          </CardContent>
        </Card>
      )}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Plano Cartesiano</CardTitle>
          </CardHeader>
          <CardContent className='flex justify-center'>
            <CartesianPlane guessPosition={guessPosition} />
          </CardContent>
        </Card>
      </div>
      
    </div>
  )
}
function CartesianPlane({ guessPosition }: { guessPosition: { x: number; y: number } }) {
  return (
    <svg viewBox="-75 -75 150 150" width="400" height="500">
      {/* Ejes */}
      <line x1="-80" y1="0" x2="80" y2="0" stroke="black" />
      <line x1="0" y1="-80" x2="0" y2="80" stroke="black" />

      {/* Marcas en los ejes */}
      {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={i * 15} y1="-2" x2={i * 15} y2="2" stroke="black" />
          <line y1={i * 15} x1="-2" y2={i * 15} x2="2" stroke="black" />
          <text x={i * 15} y="15" textAnchor="middle" fontSize="8">
            {i}
          </text>
          <text y={-i * 15} x="-15" textAnchor="middle" fontSize="8">
            {i}
          </text>
        </g>
      ))}

      {/* Punto de la suposición */}
      <text x={guessPosition.x * 15} y={-guessPosition.y * 15} fontSize="20" textAnchor="middle" fill="blue">
        🚤
      </text>
    </svg>
  )
}

