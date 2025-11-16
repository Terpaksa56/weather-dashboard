import { ForecastWeather } from '@/utils/api';
import { Cloud } from 'lucide-react';
import stormBg from '@/assets/storm-bg.jpg';

interface ForecastPanelProps {
  data: ForecastWeather;
  isCelsius: boolean;
}

export function ForecastPanel({ data, isCelsius }: ForecastPanelProps) {
  const toTemp = (c: number) => isCelsius ? c : (c * 9/5 + 32);
  const unit = isCelsius ? '°C' : '°F';
  const today = data.forecast.forecastday[0];
  const forecast = data.forecast.forecastday.slice(1);

  return (
    <div className="glass-panel overflow-hidden animate-blur-in pb-2 sm:pb-3 md:pb-4 lg:pb-6 xl:pb-2 2xl:pb-[7.4rem]">
      <div 
        className="relative h-[12rem] sm:[12rem] md:h-[20rem] lg:h-[20rem] xl:h-[20rem] 2xl:h-96 bg-cover bg-center flex flex-col justify-between p-1.5 sm:p-3 md:p-6 lg:p-8 xl:p-4 2xl:p-8"
        style={{ backgroundImage: `url(${stormBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="relative z-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/80 mb-0.5 sm:mb-1 md:mb-2 xl:mb-1 2xl:mb-2">Cuaca Nasional</p>
          <p className="text-[10px] sm:text-xs md:text-sm text-white/60 mb-1 sm:mb-2 xl:mb-1 2xl:mb-2">Prakiraan Cuaca</p>
          <h1 className="text-sm sm:text-lg md:text-3xl lg:text-5xl xl:text-2xl 2xl:text-5xl font-light text-white leading-tight truncate">
            {data.current.condition.text}
          </h1>
        </div>

        <div className="relative z-10 space-y-1 sm:space-y-2 md:space-y-4 xl:space-y-1 2xl:space-y-4">
          <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm line-clamp-2">
            <Cloud className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{data.location.name}, {data.location.country}</span>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-2xl p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-2 2xl:p-4 space-y-0.5 sm:space-y-1 md:space-y-2 xl:space-y-1 2xl:space-y-2">
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm line-clamp-1">
              {data.current.condition.text}. Tertinggi {Math.round(toTemp(today.day.maxtemp_c))}{unit}
            </p>
            <div className="text-xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-4xl 2xl:text-6xl font-light text-white">
              {Math.round(toTemp(today.day.maxtemp_c))}°
            </div>
          </div>
        </div>
      </div>

      <div className="p-1.5 sm:p-2 md:p-4 lg:p-6 xl:p-3 xl:pb-[5rem] 2xl:p-6">
        <button className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          DETAIL →
        </button>
        
        <div className="mt-1.5 sm:mt-2 md:mt-3 lg:mt-6 xl:mt-3 2xl:mt-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-0.5 sm:gap-1 md:gap-2 lg:gap-4 xl:gap-2 2xl:gap-4">
          {forecast.map((day, i) => (
            <div key={i} className="text-center space-y-0.5 text-xs">
              <p className="text-muted-foreground line-clamp-1">
                H {Math.round(toTemp(day.day.maxtemp_c))}
              </p>
              <p className="text-muted-foreground line-clamp-1">
                L {Math.round(toTemp(day.day.mintemp_c))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
