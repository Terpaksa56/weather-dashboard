import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface TemperatureToggleProps {
  isCelsius: boolean;
  onToggle: (isCelsius: boolean) => void;
}

export function TemperatureToggle({ isCelsius, onToggle }: TemperatureToggleProps) {
  return (
    <div className="glass-panel p-2 sm:p-2.5 md:p-4 xl:p-2.5 2xl:p-4 flex items-center justify-between gap-1.5 sm:gap-2 md:gap-4 xl:gap-2 2xl:gap-4">
      <Label htmlFor="temp-toggle" className="text-xs sm:text-xs md:text-sm xl:text-xs 2xl:text-sm text-muted-foreground cursor-pointer">
        °F
      </Label>
      <Switch
        id="temp-toggle"
        checked={isCelsius}
        onCheckedChange={onToggle}
        className="scale-75 sm:scale-90 md:scale-100 xl:scale-90 2xl:scale-100 origin-center"
      />
      <Label htmlFor="temp-toggle" className="text-xs sm:text-xs md:text-sm xl:text-xs 2xl:text-sm text-foreground cursor-pointer">
        °C
      </Label>
    </div>
  );
}
