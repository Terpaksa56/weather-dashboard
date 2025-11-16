import { Wind } from 'lucide-react';
import { CurrentWeather } from '@/utils/api';
import { getTemperatureValue } from '@/utils/temperature';

interface CurrentWeatherCardProps {
  data: CurrentWeather;
  isCelsius: boolean;
}

export function CurrentWeatherCard({ data, isCelsius }: CurrentWeatherCardProps) {
  const temp = Math.round(getTemperatureValue(data.current.temp_c, isCelsius));
  const feelsLike = Math.round(getTemperatureValue(data.current.feelslike_c, isCelsius));
  const unit = isCelsius ? '°' : '°';
  return (
    <div className="glass-panel p-3 sm:p-4 md:p-6 xl:p-4 2xl:p-6 space-y-2 sm:space-y-3 md:space-y-6 xl:space-y-3 2xl:space-y-6 animate-blur-in">
      <div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl xl:text-4xl 2xl:text-6xl font-extralight mb-1 sm:mb-2 xl:mb-1 2xl:mb-2">
          {temp}{unit}
          <span className="text-lg sm:text-2xl md:text-3xl xl:text-2xl 2xl:text-3xl text-muted-foreground ml-1 sm:ml-2 xl:ml-1 2xl:ml-2">
            ± {Math.abs(Math.round(feelsLike - temp))}
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 xl:mt-1 2xl:mt-2">
          Kelembaban: {data.current.humidity}%
        </p>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 xl:gap-2 2xl:gap-3 text-xs sm:text-sm text-muted-foreground">
        <Wind className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
        <span className="truncate">Angin: {Math.round(data.current.wind_kph)} km/h</span>
      </div>
    </div>
  );
}
