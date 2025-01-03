import React, { useState } from 'react';
import { Bot, Code2 } from 'lucide-react';
import { Layout } from './components/Layout';
import { CodePanel } from './components/CodePanel';
import { generateCode } from './lib/openai';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);
      const generatedCode = await generateCode(prompt);
      setResponse(generatedCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CodePanel
          title="Input Prompt"
          icon={Code2}
          value={prompt}
          onChange={setPrompt}
          onGenerate={handleGenerate}
          loading={loading}
          error={error}
        />
        <CodePanel
          title="Generated Code"
          icon={Bot}
          value={response}
          readOnly
        />
      </div>
    </Layout>
  );
}

export default App;