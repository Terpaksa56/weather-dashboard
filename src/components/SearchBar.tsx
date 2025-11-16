import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  currentCity?: string;
}

export function SearchBar({ onSearch, currentCity }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel-light p-2 sm:p-3 md:p-4 xl:p-3 2xl:p-4 flex items-center gap-1 sm:gap-2 md:gap-3 xl:gap-2 2xl:gap-3">
      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-muted-foreground flex-shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={currentCity || "Cari kota..."}
        className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm md:text-base xl:text-sm 2xl:text-base text-foreground placeholder:text-muted-foreground min-w-0"
      />
      <button type="submit" className="p-1 sm:p-1.5 md:p-2 xl:p-1.5 2xl:p-2 hover:bg-white/5 rounded-lg transition-colors flex-shrink-0">
        <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4 text-muted-foreground" />
      </button>
    </form>
  );
}
