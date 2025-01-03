import { Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-12 text-center transform hover:scale-105 transition-transform">
      <a 
        href="https://www.linkedin.com/in/yadidya-medepalli/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors bg-gray-900/50 px-4 py-2 rounded-full backdrop-blur-lg border border-cyan-500/20"
      >
        <Linkedin className="w-5 h-5" />
        <span>Connect with me on LinkedIn</span>
      </a>
    </footer>
  );
}