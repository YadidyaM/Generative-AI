export function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function std(values: number[]): number {
  const m = mean(values);
  const variance = values.reduce((a, b) => a + Math.pow(b - m, 2), 0) / values.length;
  return Math.sqrt(variance);
}

export function correlation(x: number[], y: number[]): number {
  const n = x.length;
  const mx = mean(x);
  const my = mean(y);
  
  let num = 0;
  let denX = 0;
  let denY = 0;
  
  for (let i = 0; i < n; i++) {
    num += (x[i] - mx) * (y[i] - my);
    denX += Math.pow(x[i] - mx, 2);
    denY += Math.pow(y[i] - my, 2);
  }
  
  return num / Math.sqrt(denX * denY);
}