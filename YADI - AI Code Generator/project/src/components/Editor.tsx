import { Editor as MonacoEditor } from '@monaco-editor/react';

interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-cyan-500/30 backdrop-blur-sm">
      <MonacoEditor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}