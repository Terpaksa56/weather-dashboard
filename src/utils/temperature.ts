export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function formatTemperature(celsius: number, isCelsius: boolean): string {
  const temp = isCelsius ? celsius : celsiusToFahrenheit(celsius);
  return `${Math.round(temp)}°${isCelsius ? 'C' : 'F'}`;
}

export function getTemperatureValue(celsius: number, isCelsius: boolean): number {
  return isCelsius ? celsius : celsiusToFahrenheit(celsius);
}
