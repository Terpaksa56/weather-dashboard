const WEATHER_API_KEY = '465dde797cde413090d185800251411';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface CurrentWeather {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    pressure_mb: number;
    vis_km: number;
    uv: number;
    precip_mm: number;
    gust_kph: number;
    cloud: number;
    air_quality?: {
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
    };
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: Array<{
    time: string;
    temp_c: number;
  }>;
}

export interface ForecastWeather extends CurrentWeather {
  forecast: {
    forecastday: ForecastDay[];
  };
}

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
}

export async function getForecastWeather(city: string, days: number = 7): Promise<ForecastWeather> {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return response.json();
}

export function getAQILevel(index: number): { label: string; color: string } {
  if (index <= 1) return { label: 'Good', color: 'aqi-good' };
  if (index <= 2) return { label: 'Moderate', color: 'aqi-moderate' };
  if (index <= 3) return { label: 'Unhealthy', color: 'aqi-unhealthy' };
  return { label: 'Hazardous', color: 'aqi-hazardous' };
}
