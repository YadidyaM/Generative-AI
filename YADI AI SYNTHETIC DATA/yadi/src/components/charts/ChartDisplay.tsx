import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';

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

interface ChartDisplayProps {
  type: 'bar' | 'line' | 'scatter';
  data: any[];
  xAxis: string;
  yAxis: string;
}

export default function ChartDisplay({ type, data, xAxis, yAxis }: ChartDisplayProps) {
  const chartData = React.useMemo(() => {
    const processedData = type === 'scatter'
      ? data.map(row => ({
          x: parseFloat(row[xAxis]),
          y: parseFloat(row[yAxis])
        }))
      : data.map(row => parseFloat(row[yAxis]));

    const labels = type !== 'scatter' ? data.map(row => row[xAxis]) : undefined;

    return {
      labels,
      datasets: [{
        label: `${yAxis} vs ${xAxis}`,
        data: processedData,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      }]
    };
  }, [data, xAxis, yAxis, type]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${yAxis} vs ${xAxis}`,
        color: 'white'
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'scatter':
        return <Scatter data={chartData} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[400px]">
      {renderChart()}
    </div>
  );
}