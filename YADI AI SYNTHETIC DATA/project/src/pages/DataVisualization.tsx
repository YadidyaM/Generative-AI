import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import ChartSelector from '../components/charts/ChartSelector';
import ChartDisplay from '../components/charts/ChartDisplay';

export default function DataVisualization() {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedChart, setSelectedChart] = useState<'bar' | 'line' | 'scatter'>('bar');
  const [selectedX, setSelectedX] = useState<string>('');
  const [selectedY, setSelectedY] = useState<string>('');

  const handleDataLoaded = (newData: any[], headers: string[]) => {
    setData(newData);
    setColumns(headers);
    setSelectedX(headers[0]);
    setSelectedY(headers[1]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Visualization</h1>
      
      <div className="mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Your Data</h2>
          <FileUpload onDataLoaded={handleDataLoaded} />
        </div>
      </div>

      {data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Chart Controls</h3>
            <div className="space-y-4">
              <ChartSelector
                selectedChart={selectedChart}
                onSelect={setSelectedChart}
              />
              
              <div>
                <label className="block text-sm font-medium mb-2">X Axis</label>
                <select
                  value={selectedX}
                  onChange={(e) => setSelectedX(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600"
                >
                  {columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Y Axis</label>
                <select
                  value={selectedY}
                  onChange={(e) => setSelectedY(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600"
                >
                  {columns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Visualization</h3>
            {data.length > 0 && (
              <ChartDisplay
                type={selectedChart}
                data={data}
                xAxis={selectedX}
                yAxis={selectedY}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}