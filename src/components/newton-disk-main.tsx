"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { NewtonDisk } from '@/components/newton-disk';
import { Controls } from '@/components/controls';
import { Info } from 'lucide-react';
import { useState } from 'react';

export default function NewtonDiskMain() {
  const [speed, setSpeed] = useState(50);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReset = () => {
    setSpeed(50);
    setIsSpinning(false);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Info Panel */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md p-6 rounded-lg text-white max-w-md z-10">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5" />
          <h1 className="text-xl font-bold">Newton&apos;s Disk Experiment</h1>
        </div>
        <p className="text-gray-200">
          Click on the disk or use the controls to start/stop the rotation. 
          Adjust the speed with the slider. At high speeds (80), 
          the colored segments blend together to appear white, demonstrating how our
          eyes perceive color mixing. Try different speeds to see the transition!
        </p>
      </div>

      {/* Controls */}
      <Controls
        speed={speed}
        isSpinning={isSpinning}
        onSpeedChange={setSpeed}
        onToggleSpin={() => setIsSpinning(!isSpinning)}
        onReset={handleReset}
      />

      {/* 3D Scene */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 4]} />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={6}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.4}
          penumbra={0.5}
          intensity={1}
          castShadow
        />
        
        {/* Environment */}
        <Environment preset="city" />
        
        {/* Newton's Disk */}
        <NewtonDisk
          speed={speed}
          isSpinning={isSpinning}
          onClick={() => setIsSpinning(!isSpinning)}
        />
      </Canvas>
    </div>
  );
}