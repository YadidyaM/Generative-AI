import React from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';

interface FileUploadProps {
  onDataLoaded: (data: any[], columns: string[]) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read the file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              const headers = Object.keys(results.data[0]);
              onDataLoaded(results.data, headers);
            }
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            alert('Error parsing CSV file');
          }
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-400">Upload CSV file</p>
          <p className="mt-1 text-xs text-gray-500">Click or drag and drop</p>
        </div>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
          onClick={(e) => (e.currentTarget.value = '')}
        />
      </label>
    </div>
  );
}