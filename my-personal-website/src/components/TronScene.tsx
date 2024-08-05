// components/TronScene.tsx
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Registrar PlaneGeometry e MeshBasicMaterial no R3F
extend({ PlaneGeometry: THREE.PlaneGeometry, MeshBasicMaterial: THREE.MeshBasicMaterial });

// Parâmetros do grid
const GRID_SIZE = 50; // Tamanho da malha do grid
const GRID_SEGMENTS = 80; // Número de segmentos do grid
const GRID_COLOR = "#00ff00"; // Cor da malha do grid
const GRID_SPEED = 1; // Velocidade de movimento do grid
const GRID_FOG_DENSITY = 0.08; // Densidade da névoa preta

// Componente TronGrid que exibe a malha do grid
const TronGrid: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.position.z = (elapsedTime * GRID_SPEED) % GRID_SIZE;
    }
  });

  // Função para criar o grid
  const createGrid = (zOffset: number) => (
    <mesh position={[0, 0, zOffset]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[GRID_SIZE, GRID_SIZE, GRID_SEGMENTS, GRID_SEGMENTS]} />
      <meshBasicMaterial wireframe color={GRID_COLOR} side={THREE.DoubleSide} />
    </mesh>
  );

  return (
    <group ref={gridRef}>
      {createGrid(0)}
      {createGrid(-GRID_SIZE)}
      {createGrid(-2 * GRID_SIZE)}
    </group>
  );
};

// Componente TronScene que configura a cena e o canvas
const TronScene: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 75 }}
      onCreated={({ gl, scene }) => {
        scene.fog = new THREE.FogExp2(0x000000, GRID_FOG_DENSITY); // Adiciona névoa preta com densidade 0.02
        gl.setClearColor(0x000000); // Define a cor de fundo como preta
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <TronGrid />
      <OrbitControls />
    </Canvas>
  );
};

export default TronScene;