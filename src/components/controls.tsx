"use client";

import { Pause, Play, RotateCcw } from 'lucide-react';

interface ControlsProps {
  speed: number;
  isSpinning: boolean;
  onSpeedChange: (speed: number) => void;
  onToggleSpin: () => void;
  onReset: () => void;
}

export function Controls({ speed, isSpinning, onSpeedChange, onToggleSpin, onReset }: ControlsProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md p-6 rounded-lg text-white max-w-md z-10">
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleSpin}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          title={isSpinning ? 'Pause' : 'Play'}
        >
          {isSpinning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-300">
            <span>Speed: {speed.toFixed(1)}</span>
            <span>{speed > 80 ? 'White Blending' : speed > 50 ? 'Color Blending' : 'Normal'}</span>
          </div>
        </div>

        <button
          onClick={onReset}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}