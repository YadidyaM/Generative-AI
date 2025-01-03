export function Logo3D() {
  return (
    <h1 className="text-6xl font-bold perspective">
      <span className="inline-block transform hover:scale-110 transition-transform duration-300">
        <span className="text-white">YA</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse">DI</span>
      </span>
      <span className="text-xs ml-4 uppercase tracking-widest text-cyan-500 font-light">AI Code Generator</span>
    </h1>
  );
}