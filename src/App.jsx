import { useState } from 'react';
import GitHubForm from './components/GitHubForm';
import StatGalaxy from './components/StatGalaxy';
import { fetchGitHubUser, fetchUserRepos } from './services/github';

function App() {
  const [repos, setRepos] = useState([]);

  const handleSubmit = async (username) => {
    try {
      const repoData = await fetchUserRepos(username);
      setRepos(repoData);
    } catch (error) {
      alert("User not found or API error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
      <header className="bg-black bg-opacity-30 backdrop-blur-md shadow-lg p-6 text-center border-b border-white/10">
        <h1 className="text-5xl font-extrabold tracking-wide text-cyan-300 drop-shadow-md">GitHub Galaxy 3D 🌌</h1>
        <p className="text-lg mt-2 text-white/80">Explore your GitHub stats in interactive 3D</p>
      </header>
      <GitHubForm onSubmit={handleSubmit} />
      {repos.length > 0 && <StatGalaxy repos={repos} />}
    </div>
  );
}

export default App;
