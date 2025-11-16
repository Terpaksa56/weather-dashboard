import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getForecastWeather } from '@/utils/api';
import { SearchBar } from '@/components/SearchBar';
import { CurrentWeatherCard } from '@/components/CurrentWeatherCard';
import { AirQualityPanel } from '@/components/AirQualityPanel';
import { HourlyChart } from '@/components/HourlyChart';
import { ForecastPanel } from '@/components/ForecastPanel';
import { LocationInfo } from '@/components/LocationInfo';
import { TemperatureToggle } from '@/components/TemperatureToggle';
import { WeatherMap } from '@/components/WeatherMap';
import { WeatherMetrics } from '@/components/WeatherMetrics';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [city, setCity] = useState('Oklahoma City');
  const [isCelsius, setIsCelsius] = useState(true);
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getForecastWeather(city, 7),
    retry: 1,
  });

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };
  if (error) {
    toast({
      title: 'Error fetching weather',
      description:
        'Please check the city name and try again. Make sure to add your WeatherAPI key in src/utils/api.ts',
      variant: 'destructive',
    });
  }

  return (
    <div className="min-h-screen lg:h-screen bg-background p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 animate-fade-in lg:overflow-hidden">
      <div className="min-h-full lg:h-full max-w-[1800px] mx-auto flex flex-col gap-2 sm:gap-3 md:gap-4 xl:gap-3 2xl:gap-4">
        {/* Header */}
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 lg:gap-2 xl:gap-2 2xl:gap-3 flex-shrink-0">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Storm Watch</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Dashboard Cuaca</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {data?.location && (
              <div className="glass-panel px-2 py-1 text-xs">
                <span className="font-medium truncate">{data.location.name}</span>
              </div>
            )}
            <TemperatureToggle isCelsius={isCelsius} onToggle={setIsCelsius} />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 xl:gap-3 2xl:gap-4 lg:min-h-0">
          {/* Sidebar (Left Column) */}
          <aside className="md:col-span-1 lg:col-span-1 flex flex-col gap-2 sm:gap-3 md:gap-4 xl:gap-3 2xl:gap-4 lg:min-h-0">
            {/* Search */}
            <div className="glass-panel p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 rounded-xl flex-shrink-0">
              <SearchBar onSearch={handleSearch} currentCity={data?.location.name} />
            </div>

            {isLoading ? (
              <div className="glass-panel p-3 sm:p-4 md:p-6 xl:p-4 2xl:p-6 rounded-xl flex items-center justify-center flex-shrink-0 h-20">
                <p className="text-xs text-muted-foreground">Memuat...</p>
              </div>
            ) : data ? (
              <>
                {/* Current Weather */}
                <div className="glass-panel p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 rounded-xl flex-shrink-0">
                  <CurrentWeatherCard data={data} isCelsius={isCelsius} />
                </div>

                {/* Air Quality */}
                <div className="glass-panel p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 rounded-xl flex-shrink-0">
                  <AirQualityPanel aqiIndex={data.current.air_quality?.['us-epa-index']} />
                </div>

                {/* Weather Map */}
                <div className="glass-panel rounded-xl flex-shrink-0 h-[250px] sm:h-[300px] md:h-[220px] lg:h-[220px] xl:h-[235px] 2xl:h-[17rem] overflow-hidden">
                  <div className="h-full w-full">
                    <WeatherMap center={[data.location.lon, data.location.lat]} city={data.location.name} />
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-panel p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 rounded-xl text-center flex-shrink-0">
                <p className="text-xs text-muted-foreground">Cari kota</p>
              </div>
            )}
          </aside>

          {/* Main Content (Right 3 Columns) */}
          <main className="md:col-span-1 lg:col-span-3 flex flex-col gap-2 sm:gap-3 md:gap-4 xl:gap-3 2xl:gap-4 lg:min-h-0">
            {isLoading ? (
              <div className="glass-panel p-3 sm:p-4 md:p-6 xl:p-4 2xl:p-6 rounded-xl flex items-center justify-center flex-shrink-0 h-20">
                <p className="text-xs text-muted-foreground">Memuat...</p>
              </div>
            ) : data ? (
              <>
                {/* Forecast Panel */}
                <div className="glass-panel p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 rounded-xl flex-shrink-0 lg:pb-[rem]">
                  <ForecastPanel data={data} isCelsius={isCelsius} />
                </div>

                {/* Hourly Chart & Metrics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-4 xl:gap-3 2xl:gap-4 flex-shrink-0">
                  <div className="glass-panel p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 rounded-xl">
                    <div className="text-xs">
                      <WeatherMetrics
                        pressure={data.current.pressure_mb}
                        visibility={data.current.vis_km}
                        uv={data.current.uv}
                        precipitation={data.current.precip_mm}
                        windGust={data.current.gust_kph}
                        cloud={data.current.cloud}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-panel p-3 sm:p-4 md:p-6 xl:p-4 2xl:p-6 rounded-xl flex items-center justify-center flex-shrink-0 h-20">
                <p className="text-xs text-muted-foreground">Cari kota</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
