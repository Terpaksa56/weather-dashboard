import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather } from '@/utils/api';

const cities = [
  'Washington DC',
  'Oklahoma City',
  'Philadelphia',
  'San Francisco',
  'New York City',
  'South Dakota',
  'North Dakota',
];

export function CityScroller() {
  return (
    <div className="glass-panel-light p-4 overflow-x-auto">
      <div className="flex gap-8 min-w-max">
        {cities.map((city) => (
          <CityWeather key={city} city={city} />
        ))}
      </div>
    </div>
  );
}

function CityWeather({ city }: { city: string }) {
  const { data } = useQuery({
    queryKey: ['city-weather', city],
    queryFn: () => getCurrentWeather(city),
    staleTime: 300000, // 5 minutes
  });

  return (
    <div className="text-center min-w-[100px]">
      <div className="text-3xl font-light mb-1">
        {data ? Math.round(data.current.temp_c) : '--'}°
      </div>
      <div className="text-xs text-muted-foreground">{city}</div>
      <div className="h-1 mt-2 rounded-full bg-gradient-to-r from-temp-warm to-temp-cold opacity-60" />
    </div>
  );
}
