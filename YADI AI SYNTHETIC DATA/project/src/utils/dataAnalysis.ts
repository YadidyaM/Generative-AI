import { mean, std, correlation } from './statistics';

export interface DataInsight {
  type: 'correlation' | 'distribution' | 'timeSeries' | 'categorical';
  columns: string[];
  visualization: 'scatter' | 'histogram' | 'line' | 'bar';
  title: string;
  description: string;
}

export function analyzeData(data: any[]): DataInsight[] {
  const insights: DataInsight[] = [];
  const columns = Object.keys(data[0]);
  
  // Detect numeric columns
  const numericColumns = columns.filter(col => 
    data.every(row => !isNaN(parseFloat(row[col])))
  );
  
  // Find correlations between numeric columns
  for (let i = 0; i < numericColumns.length; i++) {
    for (let j = i + 1; j < numericColumns.length; j++) {
      const col1 = numericColumns[i];
      const col2 = numericColumns[j];
      const corr = correlation(
        data.map(row => parseFloat(row[col1])),
        data.map(row => parseFloat(row[col2]))
      );
      
      if (Math.abs(corr) > 0.5) {
        insights.push({
          type: 'correlation',
          columns: [col1, col2],
          visualization: 'scatter',
          title: `Strong ${corr > 0 ? 'Positive' : 'Negative'} Correlation`,
          description: `${col1} and ${col2} show a ${Math.abs(corr).toFixed(2)} correlation coefficient`
        });
      }
    }
  }
  
  // Analyze distributions
  numericColumns.forEach(col => {
    const values = data.map(row => parseFloat(row[col]));
    const m = mean(values);
    const s = std(values);
    
    insights.push({
      type: 'distribution',
      columns: [col],
      visualization: 'histogram',
      title: `Distribution Analysis`,
      description: `${col} has mean ${m.toFixed(2)} and std ${s.toFixed(2)}`
    });
  });
  
  // Detect time series
  columns.forEach(col => {
    if (data.every(row => !isNaN(Date.parse(row[col])))) {
      const numericCols = numericColumns.filter(c => c !== col);
      numericCols.forEach(numCol => {
        insights.push({
          type: 'timeSeries',
          columns: [col, numCol],
          visualization: 'line',
          title: 'Time Series Analysis',
          description: `${numCol} trends over time`
        });
      });
    }
  });
  
  return insights;
}