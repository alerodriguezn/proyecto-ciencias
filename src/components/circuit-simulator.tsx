"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image';

interface Material {
  name: string;
  conductor: boolean;
  image: string;
}

const materials: Material[] = [
  { name: 'Cobre', conductor: true, image: '/imgs/electricidad/cobre.jpg' },
  { name: 'Plástico', conductor: false, image: '/imgs/electricidad/plastico.jpg' },
  { name: 'Aluminio', conductor: true, image: '/imgs/electricidad/aluminio.jpg' },
  { name: 'Madera', conductor: false, image: '/imgs/electricidad/madera.jpg' },
  { name: 'Oro', conductor: true, image: '/imgs/electricidad/oro.jpg' },
  { name: 'Goma', conductor: false, image: '/imgs/electricidad/borrador.jpg' },
  { name: 'Plata', conductor: true, image: '/imgs/electricidad/plata.jpg' },
  { name: 'Vidrio', conductor: false, image: '/imgs/electricidad/vidrio.jpg' },
]

export default function ElectroDesafio() {
  const [score, setScore] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [gameState, setGameState] = useState<'selecting' | 'testing' | 'results' | 'gameOver'>('selecting')
  const [availableMaterials, setAvailableMaterials] = useState<Material[]>([])
  const [testing, setTesting] = useState(false)
  const [lightOn, setLightOn] = useState(false)
  const [leftWireProgress, setLeftWireProgress] = useState(0)
  const [rightWireProgress, setRightWireProgress] = useState(0)

  useEffect(() => {
    resetMaterials()
  }, [currentRound])

  useEffect(() => {
    if (testing) {
      const leftWireTimer = setInterval(() => {
        setLeftWireProgress((prev) => {
          if (prev >= 100) {
            clearInterval(leftWireTimer)
            return 100
          }
          return prev + 10
        })
      }, 150)

      const rightWireTimer = setTimeout(() => {
        const timer = setInterval(() => {
          setRightWireProgress((prev) => {
            if (prev >= 100) {
              clearInterval(timer)
              return 100
            }
            return prev + 10
          })
        }, 150)
        return () => clearInterval(timer)
      }, 1500)

      const completeTimer = setTimeout(() => {
        setLightOn(selectedMaterial?.conductor ?? false)
        setGameState('results')
      }, 3000)

      return () => {
        clearInterval(leftWireTimer)
        clearTimeout(rightWireTimer)
        clearTimeout(completeTimer)
      }
    } else {
      setLeftWireProgress(0)
      setRightWireProgress(0)
    }
  }, [testing, selectedMaterial])

  const resetMaterials = () => {
    const shuffled = [...materials].sort(() => 0.5 - Math.random())
    setAvailableMaterials(shuffled.slice(0, 4))
  }

  const handleMaterialSelect = (material: Material) => {
    setSelectedMaterial(material)
    setGameState('testing')
  }

  const handleNextRound = () => {
    if (currentRound < 10) {
      setCurrentRound(currentRound + 1)
      setSelectedMaterial(null)
      setGameState('selecting')
      setTesting(false)
      setLightOn(false)
    } else {
      setGameState('gameOver')
    }
  }

  const handleReset = () => {
    setScore(0)
    setCurrentRound(1)
    setSelectedMaterial(null)
    setGameState('selecting')
    setTesting(false)
    setLightOn(false)
    resetMaterials()
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">ElectroDesafío</h1>
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
        <div className="text-xl mb-4">Ronda: {currentRound}/10 | Puntuación: {score}</div>
        
        {gameState === 'selecting' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Selecciona un material para probar:</h2>
            <div className="grid grid-cols-2 gap-4">
              {availableMaterials.map((material) => (
                <button
                  key={material.name}
                  onClick={() => handleMaterialSelect(material)}
                  className="bg-white/20 hover:bg-white/30 transition-colors duration-300 p-4 rounded-lg flex flex-col items-center"
                >
                  <Image src={material.image} alt={material.name} className="w-24 h-24 object-cover rounded-full mb-2" width={500} height={500} />
                  <span className="text-lg font-medium">{material.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'testing' && selectedMaterial && (
          <div className="relative">
            <h2 className="text-2xl font-semibold mb-4">Prueba el circuito:</h2>
            <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
              <div className={`w-16 h-16 rounded-full ${lightOn ? 'bg-yellow-400 animate-pulse' : 'bg-gray-600'} mr-8`}></div>
              <div className="w-32 h-4 bg-gray-600 relative overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-150 ease-linear" 
                  style={{ width: `${leftWireProgress}%` }}
                ></div>
              </div>
              <div className="w-16 h-16 bg-red-500 rounded-lg mx-8 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded"></div>
              </div>
              <div className="w-32 h-4 bg-gray-600 relative overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-150 ease-linear" 
                  style={{ width: `${rightWireProgress}%` }}
                ></div>
              </div>
              <div className={`w-16 h-16 rounded-full ${testing ? 'bg-blue-500 animate-pulse' : 'bg-gray-600'} ml-8`}></div>
            </div>
            <button
              onClick={() => setTesting(true)}
              disabled={testing}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 disabled:opacity-50"
            >
              {testing ? 'Probando...' : 'Iniciar prueba'}
            </button>
          </div>
        )}

        {gameState === 'results' && selectedMaterial && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Resultados:</h2>
            <div className="mb-4">
              <Image src={selectedMaterial.image} alt={selectedMaterial.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-2"  width={500} height={500}/>
              <p className="text-xl">{selectedMaterial.name}</p>
            </div>
            <p className="text-2xl mb-4">
              {selectedMaterial.conductor
                ? '¡Correcto! Este material es un conductor.'
                : 'Incorrecto. Este material no es un conductor.'}
            </p>
            <p className="mb-4">
              {selectedMaterial.conductor
                ? `${selectedMaterial.name} es un buen conductor de electricidad porque permite que los electrones fluyan fácilmente a través de él.`
                : `${selectedMaterial.name} es un aislante y no conduce bien la electricidad porque no permite que los electrones fluyan fácilmente a través de él.`}
            </p>
            <button
              onClick={handleNextRound}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Siguiente ronda
            </button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center mt-8">
            <h2 className="text-3xl font-bold mb-4">¡Juego terminado!</h2>
            <p className="text-xl mb-4">Tu puntuación final es: {score}/10</p>
            <button
              onClick={handleReset}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Reiniciar juego
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
