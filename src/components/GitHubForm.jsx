import { useState } from 'react';
import { Search } from 'lucide-react';

export default function GitHubForm({ onSubmit, label }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-6"
    >
      <label htmlFor="github-username" className="sr-only">
        {label}
      </label>
      <div className="flex items-center w-full sm:max-w-md border border-input rounded-lg overflow-hidden bg-card shadow">
        <input
          id="github-username"
          type="text"
          placeholder={label}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 bg-transparent text-foreground placeholder-muted-foreground outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
