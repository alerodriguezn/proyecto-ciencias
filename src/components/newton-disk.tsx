
"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh } from 'three';

interface NewtonDiskProps {
  speed: number;
  isSpinning: boolean;
  onClick: () => void;
}

export function NewtonDisk({ speed, isSpinning, onClick }: NewtonDiskProps) {
  const diskRef = useRef<Mesh>(null);
  
  // Create the Newton's disk texture
  const segments = 7;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Draw colored segments
  const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2;
  
  colors.forEach((color, i) => {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(
      centerX,
      centerY,
      radius,
      (i * 2 * Math.PI) / segments,
      ((i + 1) * 2 * Math.PI) / segments
    );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);

  useFrame((_, delta) => {
    if (!diskRef.current || !isSpinning) return;
    diskRef.current.rotation.y += speed * delta;
  });

  return (
    <group>
      {/* Stand base */}
      <Cylinder
        args={[0.5, 0.7, 0.1, 32]}
        position={[0, -1, 0]}
      >
        <meshStandardMaterial color="#2a2a2a" />
      </Cylinder>

      {/* Stand pole */}
      <Cylinder
        args={[0.05, 0.05, 1.8, 16]}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Newton's disk */}
      <Cylinder
        ref={diskRef}
        args={[1, 1, 0.1, 64]}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={onClick}
      >
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.3}
        />
      </Cylinder>
    </group>
  );
}