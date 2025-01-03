import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { generateData } from '../services/openai';

const DataGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [rows, setRows] = useState(10);

  const mutation = useMutation({
    mutationFn: generateData,
    onSuccess: (data) => {
      // Create CSV and trigger download
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ prompt, rows });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate Synthetic Data</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Describe the data you want to generate
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
              placeholder="E.g., Generate customer data with name, age, purchase amount, and date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of rows
            </label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              min="1"
              max="100"
              className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Generating...</span>
              </>
            ) : (
              <span>Generate CSV</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataGeneration;