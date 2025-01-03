import { Code2, Sparkles } from 'lucide-react';
import { Editor } from './Editor';
import { Button } from './Button';

interface CodePanelProps {
  title: string;
  icon: typeof Code2;
  value: string;
  onChange?: (value: string) => void;
  onGenerate?: () => void;
  loading?: boolean;
  error?: string | null;
  readOnly?: boolean;
}

export function CodePanel({
  title,
  icon: Icon,
  value,
  onChange,
  onGenerate,
  loading,
  error,
  readOnly
}: CodePanelProps) {
  return (
    <div className="transform hover:scale-[1.02] transition-transform duration-300">
      <div className="backdrop-blur-lg bg-gray-900/50 rounded-xl border border-cyan-500/20 p-6 shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <Icon className="w-5 h-5 text-cyan-500" />
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <Editor 
          value={value} 
          onChange={onChange} 
          readOnly={readOnly}
        />
        {onGenerate && (
          <div className="mt-4">
            <Button
              onClick={onGenerate}
              disabled={!value || loading}
              className="w-full group"
            >
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                <span>{loading ? 'Generating...' : 'Generate Code'}</span>
              </div>
            </Button>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}