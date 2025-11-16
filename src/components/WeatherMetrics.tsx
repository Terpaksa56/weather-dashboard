import { Droplets, Eye, Gauge, Sun, Wind, CloudRain } from 'lucide-react';

interface WeatherMetricsProps {
  pressure: number;
  visibility: number;
  uv: number;
  precipitation: number;
  windGust: number;
  cloud: number;
}

export function WeatherMetrics({
  pressure,
  visibility,
  uv,
  precipitation,
  windGust,
  cloud,
}: WeatherMetricsProps) {
  const getUVLevel = (index: number) => {
    if (index <= 2) return { label: 'Low', color: 'text-green-400' };
    if (index <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
    if (index <= 7) return { label: 'High', color: 'text-orange-400' };
    return { label: 'Very High', color: 'text-red-400' };
  };

  const uvLevel = getUVLevel(uv);

  const metrics = [
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${pressure} mb`,
      color: 'text-blue-400',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${visibility} km`,
      color: 'text-cyan-400',
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: `${uv} ${uvLevel.label}`,
      color: uvLevel.color,
    },
    {
      icon: CloudRain,
      label: 'Precipitation',
      value: `${precipitation} mm`,
      color: 'text-indigo-400',
    },
    {
      icon: Wind,
      label: 'Wind Gust',
      value: `${windGust} km/h`,
      color: 'text-purple-400',
    },
    {
      icon: Droplets,
      label: 'Cloud Cover',
      value: `${cloud}%`,
      color: 'text-slate-400',
    },
  ];

  return (
    <div className="glass-panel p-2 sm:p-3 md:p-6 xl:p-3 2xl:p-6 animate-blur-in">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-[4rem] lg:gap-[4rem] xl:gap-3 2xl:gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="flex items-center gap-1.5 sm:gap-2 md:gap-3 xl:gap-2 2xl:gap-3">
              <Icon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${metric.color} flex-shrink-0`} />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">{metric.label}</p>
                <p className="text-xs sm:text-sm font-light truncate">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
