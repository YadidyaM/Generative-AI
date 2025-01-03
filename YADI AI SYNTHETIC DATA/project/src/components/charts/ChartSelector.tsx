import React from 'react';
import { BarChart, LineChart, ScatterChart } from 'lucide-react';

const chartTypes = [
  { type: 'bar', icon: BarChart, label: 'Bar Chart' },
  { type: 'line', icon: LineChart, label: 'Line Chart' },
  { type: 'scatter', icon: ScatterChart, label: 'Scatter Plot' },
] as const;

interface ChartSelectorProps {
  selectedChart: 'bar' | 'line' | 'scatter';
  onSelect: (type: 'bar' | 'line' | 'scatter') => void;
}

export default function ChartSelector({ selectedChart, onSelect }: ChartSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Chart Type</label>
      <div className="grid grid-cols-3 gap-2">
        {chartTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`p-2 rounded-lg flex flex-col items-center justify-center space-y-1 transition-colors ${
              selectedChart === type ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}