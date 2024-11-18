"use client";
interface Material {
    name: string;
    conductivity: boolean;
    resistance: number;
    icon: React.ElementType;
  }
  
  interface Materials {
    [key: string]: Material;
  }
  
  interface CircuitState {
    selectedComponent: string | null;
    circuitComplete: boolean;
    voltage: number;
    currentMaterial: string;
  }
  
  // CircuitSimulator.tsx
  import React, { useState } from 'react';
  import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
  import { Battery, Lightbulb, Power, Zap, Cable, Eraser, File, Coins } from 'lucide-react';
  
  
  const materials: Materials = {
    resistor: { name: 'Resistencia', conductivity: true, resistance: 10, icon: Cable },
    eraser: { name: 'Borrador', conductivity: false, resistance: Infinity, icon: Eraser },
    paper: { name: 'Papel', conductivity: false, resistance: Infinity, icon: File },
    coin: { name: 'Moneda', conductivity: true, resistance: 0.1, icon: Coins }
  };
  
  const CircuitSimulator: React.FC = () => {
    const [state, setState] = useState<CircuitState>({
      selectedComponent: null,
      circuitComplete: false,
      voltage: 9,
      currentMaterial: 'resistor'
    });
  
    const handleMaterialChange = (material: string): void => {
      setState(prevState => ({
        ...prevState,
        currentMaterial: material,
        circuitComplete: materials[material].conductivity,
        voltage: materials[material].conductivity ? 9 : 0
      }));
    };
  
    const getEducationalContent = (materialKey: string): string => {
      const material = materials[materialKey];
      if (materialKey === 'bulb') {
        return "El bombillo se enciende porque es un conductor que transforma la energía eléctrica en luz y calor.";
      }
      return material.conductivity
        ? `${material.name} es un conductor y permite el paso de la electricidad.`
        : `${material.name} es un aislante y no permite el paso de la electricidad.`;
    };
  
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Simulador de Circuitos Eléctricos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Circuit Visualization */}
            <div className="relative bg-gray-100 p-8 rounded-lg">
              <div className="flex items-center justify-center space-x-4">
                <Battery className="w-12 h-12 text-blue-500" />
                
                <div className={`h-2 w-20 ${state.circuitComplete ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                
                <div className="relative">
                  <div className={`w-12 h-12 border-2 rounded flex items-center justify-center ${
                    state.circuitComplete ? 'border-green-500 bg-green-100' : 'border-gray-400'
                  }`}>
                    {React.createElement(materials[state.currentMaterial].icon, {
                      className: "w-8 h-8"
                    })}
                  </div>
                </div>
                
                <div className={`h-2 w-20 ${state.circuitComplete ? 'bg-yellow-400' : 'bg-gray-300'}`} />
                
                <Lightbulb 
                  className={`w-12 h-12 ${state.circuitComplete ? 'text-yellow-400' : 'text-gray-400'}`} 
                />
              </div>
            </div>
  
            {/* Material Selection */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(materials).map(([key, material]) => {
                const IconComponent = material.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleMaterialChange(key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      state.currentMaterial === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                    aria-label={`Select ${material.name}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <IconComponent className="w-6 h-6" />
                      {material.name}
                    </div>
                  </button>
                );
              })}
            </div>
  
            {/* Measurements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="text-yellow-500" />
                  <span className="font-semibold">Voltaje:</span>
                  <span>{state.voltage} V</span>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Power className="text-blue-500" />
                  <span className="font-semibold">Estado del circuito:</span>
                  <span className={state.circuitComplete ? 'text-green-500' : 'text-red-500'}>
                    {state.circuitComplete ? 'Completo' : 'Incompleto'}
                  </span>
                </div>
              </div>
            </div>
  
            {/* Educational Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">¿Sabías que?</h3>
              <p className="text-sm">
                {getEducationalContent(state.currentMaterial)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default CircuitSimulator;