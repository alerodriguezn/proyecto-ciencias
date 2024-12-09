'use client'

import React, { useState, useEffect } from 'react';
import { RabbitPair } from './rabbit-pair';
import { generateRabbitPairs, isCorrectNextPair } from '../utils/rabbit-math';
import { Trophy, Info } from 'lucide-react';

const INITIAL_MONTHS = 4;
const OPTIONS_COUNT = 4;

export const RabbitGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [sequence, setSequence] = useState<number[]>([]);
  const [options, setOptions] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(INITIAL_MONTHS);
  const [showInfo, setShowInfo] = useState(false);

  const generateOptions = (correctAnswer: number): number[] => {
    const options = [correctAnswer];
    while (options.length < OPTIONS_COUNT) {
      const randomOffset = Math.floor(Math.random() * 5) - 2;
      const newOption = correctAnswer + randomOffset;
      if (!options.includes(newOption) && newOption > 0) {
        options.push(newOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startNewRound = () => {
    const rabbitSequence = generateRabbitPairs(INITIAL_MONTHS);
    setSequence(rabbitSequence);
    setCurrentMonth(INITIAL_MONTHS);
    const correctNext = rabbitSequence[rabbitSequence.length - 1] + rabbitSequence[rabbitSequence.length - 2];
    setOptions(generateOptions(correctNext));
  };

  const handleOptionClick = (answer: number) => {
    if (isCorrectNextPair(sequence, answer)) {
      setScore(score + 1);
      setSequence([...sequence, answer]);
      setCurrentMonth(currentMonth + 1);
      const correctNext = answer + sequence[sequence.length - 1];
      setOptions(generateOptions(correctNext));
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    startNewRound();
  };

  useEffect(() => {
    startNewRound();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Los Conejos de Fibonacci</h1>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
        >
          <Info className="w-5 h-5" />
          Instrucciones
        </button>
        
        {showInfo && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-left">
            <h3 className="font-bold text-lg mb-2">¿Cómo funciona la reproducción de conejos?</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Empezamos con una pareja de conejos recién nacidos</li>
              <li>Los conejos tardan un mes en alcanzar la madurez reproductiva</li>
              <li>Cada mes, cada pareja madura produce una nueva pareja de conejos</li>
              <li>Los conejos nunca mueren</li>
              <li>¿Puedes predecir cuántas parejas habrá cada mes?</li>
            </ul>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-gray-600">Mes: </span>
            <span className="font-bold text-gray-800">{currentMonth}</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-gray-600">Puntuación: </span>
            <span className="font-bold text-gray-800">{score}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          ¿Cuántas parejas de conejos habrá el próximo mes?
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {sequence.map((num, index) => (
          <RabbitPair key={index} count={num} isActive={true} />
        ))}
      </div>

      {!gameOver ? (
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {options.map((option, index) => (
            <RabbitPair
              key={index}
              count={option}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Juego Terminado!</h2>
          <p className="text-gray-600 mb-6">
            ¡Sobreviviste {score} meses de crecimiento poblacional de conejos!
          </p>
          <button
            onClick={resetGame}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  );
};