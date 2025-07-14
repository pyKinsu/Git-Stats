import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function GitHubForm({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 justify-center p-6">
      <input
        className="px-4 py-2 w-64 rounded-xl bg-white text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition-transform flex items-center gap-2">
        <Sparkles className="w-4 h-4" /> Load Stats
      </button>
    </form>
  );
}
