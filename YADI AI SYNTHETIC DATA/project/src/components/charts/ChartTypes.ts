export type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'radar';

export interface ChartOptions {
  type: ChartType;
  title: string;
  icon: React.ComponentType;
}