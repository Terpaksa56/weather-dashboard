import { getAQILevel } from '@/utils/api';

interface AirQualityPanelProps {
  aqiIndex?: number;
}

export function AirQualityPanel({ aqiIndex = 1 }: AirQualityPanelProps) {
  const { label, color } = getAQILevel(aqiIndex);
  
  const indicators = [
    { range: '0.00% - 0.9%', level: 'Aman', active: aqiIndex <= 1 },
    { range: '0.9% - 11%', level: 'Aman', active: aqiIndex > 1 && aqiIndex <= 2 },
    { range: '12% - 35%', level: 'Berbahaya', active: aqiIndex > 2 && aqiIndex <= 3 },
    { range: '36% - 90%', level: 'Berbahaya', active: aqiIndex > 3 },
  ];

  return (
    <div className="glass-panel p-2 sm:p-3 md:p-6 xl:p-3 2xl:p-6 space-y-1.5 sm:space-y-2 md:space-y-4 xl:space-y-2 2xl:space-y-4">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 xl:gap-2 2xl:gap-3">
        <div className="flex gap-0.5 sm:gap-1 xl:gap-0.5 2xl:gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1 h-4 sm:w-1.5 sm:h-5 md:w-2 md:h-8 xl:w-1.5 xl:h-5 2xl:w-2 2xl:h-8 rounded-full ${
                i < aqiIndex ? `bg-${color}` : 'bg-muted/30'
              }`}
            />
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs gap-1">
            <span className="text-foreground truncate">{label}</span>
            <span className="text-muted-foreground flex-shrink-0">0.8%</span>
          </div>
        </div>
      </div>

      <div className="space-y-0.5 sm:space-y-1 md:space-y-2 xl:space-y-1 2xl:space-y-2 text-xs">
        {indicators.map((indicator, i) => (
          <div key={i} className="flex justify-between">
            <span className="text-muted-foreground truncate">{indicator.range}</span>
            <span className={indicator.level === 'Aman' ? 'text-foreground' : 'text-muted-foreground'}>
              {indicator.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
