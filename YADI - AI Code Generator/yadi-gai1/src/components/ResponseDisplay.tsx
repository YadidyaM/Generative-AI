interface ResponseDisplayProps {
  response: string;
  loading?: boolean;
}

export function ResponseDisplay({ response, loading }: ResponseDisplayProps) {
  if (loading) {
    return (
      <div className="h-[400px] w-full rounded-lg border border-cyan-500/30 backdrop-blur-sm p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-lg border border-cyan-500/30 backdrop-blur-sm p-4 overflow-auto">
      <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
        {response || 'Generated code will appear here...'}
      </pre>
    </div>
  );
}