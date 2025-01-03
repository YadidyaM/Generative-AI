import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]}>
      <MeshDistortMaterial
        color="#2563eb"
        attach="material"
        distort={0.6}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
}

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-64px)]">
      <div className="absolute inset-0">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
        </Canvas>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-b from-transparent to-gray-900/70">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Your AI Data Intelligence
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Generate synthetic data and visualize your datasets with the power of AI
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/generate"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Generate Data
            </Link>
            <Link
              to="/visualize"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Visualize Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;