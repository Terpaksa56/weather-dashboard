interface LocationInfoProps {
  city: string;
  region: string;
  description?: string;
}

export function LocationInfo({ city, region, description }: LocationInfoProps) {
  return (
    <div className="glass-panel p-6 space-y-3">
      <h3 className="text-lg font-light">{city}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description || `The air quality is generally acceptable for most individuals. However, sensitive groups may experience minor to moderate symptoms from long-term exposure.`}
      </p>
    </div>
  );
}
