import { useState } from 'react';

export default function GitHubForm({ onSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center p-4">
      <input
        className="px-4 py-2 border rounded-xl text-black"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">Load Stats</button>
    </form>
  );
}
