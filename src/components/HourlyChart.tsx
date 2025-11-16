import { ForecastDay } from '@/utils/api';

interface HourlyChartProps {
  hourlyData: ForecastDay['hour'];
  isCelsius: boolean;
}

export function HourlyChart({ hourlyData, isCelsius }: HourlyChartProps) {
  const toTemp = (c: number) => isCelsius ? c : (c * 9/5 + 32);
  const unit = isCelsius ? 'c' : 'f';
  const data = hourlyData.slice(0, 24);
  const maxTemp = Math.max(...data.map(h => toTemp(h.temp_c)));
  const minTemp = Math.min(...data.map(h => toTemp(h.temp_c)));
  const range = maxTemp - minTemp;
  
  const currentTemp = toTemp(data[new Date().getHours()]?.temp_c || data[0]?.temp_c);

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">12pm</span>
        <span className="text-2xl font-light">{Math.round(currentTemp)}°{unit}</span>
        <span className="text-xs text-muted-foreground">9pm</span>
      </div>
      
      <div className="relative h-24">
        <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--temp-warm))" />
              <stop offset="100%" stopColor="hsl(var(--temp-warm))" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d={`M ${data.map((point, i) => {
              const x = (i / (data.length - 1)) * 300;
              const y = 100 - ((toTemp(point.temp_c) - minTemp) / range) * 80 - 10;
              return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
            }).join(' ')}`}
            stroke="url(#tempGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-fade-in"
          />
        </svg>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          <span>-10</span>
          <span>-6</span>
          <span>-18</span>
          <span>-16</span>
          <span>-20</span>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm font-light">{data[0]?.time.split(' ')[1] || '00:00'}</p>
      </div>
    </div>
  );
}
