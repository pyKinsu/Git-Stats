import { useState } from 'react';
import GitHubForm from './components/GitHubForm';
import StatGalaxy from './components/StatGalaxy';
import { fetchUserRepos } from './services/github';

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
      <header className="bg-black bg-opacity-30 backdrop-blur-md shadow-lg p-6 text-center border-b border-white/10 sticky top-0 z-10">
        <h1 className="text-5xl font-extrabold tracking-wide text-cyan-300 drop-shadow-md animate-pulse">GitHub Galaxy 3D 🌌</h1>
        <p className="text-lg mt-2 text-white/80">Visualize your GitHub universe like never before</p>
      </header>
      <GitHubForm onSubmit={handleSubmit} />
      {repos.length > 0 ? (
        <>
          <h2 className="text-center text-2xl font-semibold mb-4 animate-fade-in">🔭 Repos Visualized Below</h2>
          <StatGalaxy repos={repos} />
        </>
      ) : (
        <p className="text-center text-sm text-white/70 mt-8 animate-fade-in">Enter your GitHub username to see magic 🌠</p>
      )}
    </div>
  );
}

export default App;
