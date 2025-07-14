import { Sun, Moon, Globe } from 'lucide-react';

const LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
};

export default function Header({ theme, setTheme, locale, setLocale }) {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card shadow-sm">
      <h1 className="text-xl font-semibold tracking-tight">GitHub Galaxy Stats 🚀</h1>

      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <select
            value={locale}
            onChange={handleLocaleChange}
            className="bg-input border border-border rounded px-2 py-1 text-sm"
          >
            {Object.entries(LANGUAGES).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 bg-muted text-foreground hover:bg-muted-foreground transition"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
