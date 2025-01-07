import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Presentation, Wand2 } from 'lucide-react';
import Scene from './components/Scene';
import SlideEditor from './components/SlideEditor';

export default function App() {
  const handleDownload = () => {
    // Placeholder for download logic
    alert('Download functionality will be implemented here!');
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <header className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <Presentation className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              YADI AI SlideMaker
            </h1>
            <Wand2 className="w-8 h-8 text-pink-500" />
          </div>
          {/* Social Links */}
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/yadidya-medepalli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/YadidyaM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              Visit GitHub
            </a>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-4 py-6">
          <SlideEditor />
        </main>

        {/* Download Button */}
        <footer className="p-4">
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Download
            </button>
          </div>
        </footer>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-2 left-2 text-xs text-white opacity-50">
        YADI
      </div>
    </div>
  );
}
