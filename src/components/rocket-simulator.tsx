"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Book, Activity, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

type SimulationData = {
  time: number;
  height: number;
  distance: number;
  angle: number;
};

const PhysicsSimulation = () => {
  const [angle, setAngle] = useState(30);
  const [isLaunched, setIsLaunched] = useState(false);
  const [currentTab, setCurrentTab] = useState('theory');
  const [simulationData, setSimulationData] = useState<SimulationData>({
    time: 0,
    height: 0,
    distance: 0,
    angle: 30,
  });
  const [maxHeight, setMaxHeight] = useState(0);
  const [trajectoryPoints, setTrajectoryPoints] = useState<{ x: number; y: number }[]>([]);

  const animationRef = useRef<number>();
  const startTime = useRef<number>();

  // Constantes físicas ajustadas para mayor recorrido
  const GRAVITY = 9.81;
  const INITIAL_VELOCITY = 40; // Aumentado significativamente
  const SCALE_FACTOR = 5; // Ajustado para mejor visualización

  const calculateTrajectory = (time: number) => {
    const angleRad = (angle * Math.PI) / 180;
    const vx = INITIAL_VELOCITY * Math.cos(angleRad);
    const vy = INITIAL_VELOCITY * Math.sin(angleRad);

    const x = vx * time;
    const y = vy * time - (0.5 * GRAVITY * time * time);

    return { x, y };
  };

  const animate = (timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp;
    const elapsed = (timestamp - startTime.current) / 1000;

    const { x, y } = calculateTrajectory(elapsed);

    if (y < 0) {
      setIsLaunched(false);
      return;
    }

    setMaxHeight(prev => Math.max(prev, y));
    setTrajectoryPoints(prev => [...prev, { x: x * SCALE_FACTOR, y: 600 - (y * SCALE_FACTOR + 48) }]);

    setSimulationData({
      time: elapsed,
      height: y,
      distance: x,
      angle: angle,
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleLaunch = () => {
    setIsLaunched(true);
    startTime.current = undefined;
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleReset = () => {
    setIsLaunched(false);
    setMaxHeight(0);
    setTrajectoryPoints([]);
    setSimulationData({
      time: 0,
      height: 0,
      distance: 0,
      angle: angle,
    });
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image src="/cohete.svg" width={24} height={24} alt="Rocket" />
            Simulador de Fuerzas y Movimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="theory" className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Teoría
              </TabsTrigger>
              <TabsTrigger value="simulation" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Simulación
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Datos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theory">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Conceptos Básicos</h3>
                <p>
                  El movimiento de un cohete está gobernado por las leyes de Newton:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Primera Ley: Ley de la Inercia</li>
                  <li>Segunda Ley: Fuerza = Masa × Aceleración</li>
                  <li>Tercera Ley: Acción y Reacción</li>
                </ul>
                <div className="mt-4">
                  <h4 className="font-semibold">Factores que afectan el vuelo:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ángulo de lanzamiento</li>
                    <li>Velocidad inicial</li>
                    <li>Gravedad</li>
                    <li>Resistencia del aire</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulation">
              <div className="space-y-4">
                <div className="h-[600px] bg-gradient-to-b from-blue-200 to-blue-100 rounded-lg relative overflow-hidden">
                  {/* Decoración de nubes */}
                  <div className="absolute top-4 left-8 w-16 h-8 bg-white rounded-full opacity-60" />
                  <div className="absolute top-8 right-12 w-20 h-10 bg-white rounded-full opacity-60" />
                  
                  {/* Suelo con textura */}
                  <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-green-700 to-green-500" />
                  
                  {/* Grid de referencia */}
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border border-gray-400" />
                    ))}
                  </div>

                  {/* Cohete */}
                  <div
                    className="absolute transition-transform duration-75"
                    style={{
                      bottom: `${simulationData.height * SCALE_FACTOR + 48}px`,
                      left: `${simulationData.distance * SCALE_FACTOR}px`,
                      transform: `translateX(-50%) rotate(${90 - angle}deg)`,
                    }}
                  >
                    <Image 
                      src="/cohete.svg"
                      width={32}
                      height={32}
                      alt="Rocket"
                      className={isLaunched ? 'filter drop-shadow-md drop-shadow-red-500' : ''}
                    />
                  </div>

                  {/* Trayectoria */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ overflow: 'visible' }}
                  >
                    <path
                      d={`M 0,${600 - 48} ${trajectoryPoints.map(p => `L ${p.x},${p.y}`).join(' ')}`}
                      stroke="rgba(59, 130, 246, 0.5)"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg">
                    <span className="min-w-24 font-medium">Ángulo: {angle}°</span>
                    <Slider
                      value={[angle]}
                      onValueChange={(value) => setAngle(value[0])}
                      min={0}
                      max={90}
                      step={1}
                      disabled={isLaunched}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={handleLaunch}
                      disabled={isLaunched}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6"
                    >
                      <Image src="/cohete.svg" width={16} height={16} alt="Rocket" />
                      Lanzar
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="flex items-center gap-2 px-6"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Reiniciar
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Datos de la Simulación</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Tiempo</p>
                    <p className="text-2xl font-semibold">
                      {simulationData.time.toFixed(2)} s
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Altura Máxima</p>
                    <p className="text-2xl font-semibold">
                      {maxHeight.toFixed(2)} m
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Distancia</p>
                    <p className="text-2xl font-semibold">
                      {simulationData.distance.toFixed(2)} m
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                    <p className="text-sm text-slate-500 mb-1">Ángulo</p>
                    <p className="text-2xl font-semibold">{angle}°</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhysicsSimulation;