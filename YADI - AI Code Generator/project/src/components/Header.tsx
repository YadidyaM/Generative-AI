import { Bot } from 'lucide-react';
import { Logo3D } from './Logo3D';

export function Header() {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="relative">
        <Bot className="w-12 h-12 text-cyan-500 absolute -left-16 top-1/2 -translate-y-1/2 transform hover:scale-110 transition-transform" />
        <Logo3D />
      </div>
    </div>
  );
}