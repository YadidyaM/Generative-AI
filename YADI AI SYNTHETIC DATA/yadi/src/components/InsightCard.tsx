import React from 'react';
import { DataInsight } from '../utils/dataAnalysis';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface InsightCardProps {
  insight: DataInsight;
  data: any[];
}

export default function InsightCard({ insight, data }: InsightCardProps) {
  const chartData = React.useMemo(() => {
    const getColor = () => 'rgba(59, 130, 246, 0.5)';
    
    switch (insight.visualization) {
      case 'scatter':
        return {
          datasets: [{
            label: `${insight.columns[0]} vs ${insight.columns[1]}`,
            data: data.map(row => ({
              x: parseFloat(row[insight.columns[0]]),
              y: parseFloat(row[insight.columns[1]])
            })),
            backgroundColor: getColor(),
          }]
        };
      
      case 'histogram':
        const values = data.map(row => parseFloat(row[insight.columns[0]]));
        const bins = 10;
        const min = Math.min(...values);
        const max = Math.max(...values);
        const binSize = (max - min) / bins;
        const histogram = new Array(bins).fill(0);
        
        values.forEach(value => {
          const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
          histogram[binIndex]++;
        });
        
        return {
          labels: histogram.map((_, i) => `${(min + i * binSize).toFixed(1)}`),
          datasets: [{
            label: `Distribution of ${insight.columns[0]}`,
            data: histogram,
            backgroundColor: getColor(),
          }]
        };
      
      case 'line':
        return {
          labels: data.map(row => row[insight.columns[0]]),
          datasets: [{
            label: insight.columns[1],
            data: data.map(row => parseFloat(row[insight.columns[1]])),
            borderColor: 'rgb(59, 130, 246)',
            tension: 0.1,
          }]
        };
      
      default:
        return null;
    }
  }, [insight, data]);

  const renderChart = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: insight.title,
        },
      },
    };

    switch (insight.visualization) {
      case 'scatter':
        return <Scatter data={chartData} options={options} />;
      case 'histogram':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{insight.description}</p>
      <div className="h-[300px]">
        {renderChart()}
      </div>
    </div>
  );
}