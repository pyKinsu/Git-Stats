import { useState, useMemo } from 'react';

export default function RepoSortFilter({ repos, onChange }) {
  const [sortBy, setSortBy] = useState('stars');
  const [language, setLanguage] = useState('all');

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));
    return ['all', ...Array.from(langs)];
  }, [repos]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    applyFilter(e.target.value, language);
  };

  const handleLangChange = (e) => {
    setLanguage(e.target.value);
    applyFilter(sortBy, e.target.value);
  };

  const applyFilter = (sortKey, lang) => {
    let filtered = [...repos];
    if (lang !== 'all') {
      filtered = filtered.filter((r) => r.language === lang);
    }

    if (sortKey === 'stars') {
      filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortKey === 'forks') {
      filtered.sort((a, b) => b.forks_count - a.forks_count);
    }

    onChange(filtered);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <div>
        <label className="block text-sm mb-1">Sort by</label>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="bg-input text-foreground border border-border rounded px-3 py-1"
        >
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Language</label>
        <select
          value={language}
          onChange={handleLangChange}
          className="bg-input text-foreground border border-border rounded px-3 py-1"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
