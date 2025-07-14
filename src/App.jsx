import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import GitHubForm from './components/GitHubForm';
import StatGalaxy from './components/StatGalaxy';
import UserCard from './components/UserCard';
import Charts from './components/Charts';
import ContributionCalendar from './components/ContributionCalendar';
import RepoSortFilter from './components/RepoSortFilter';
import { fetchUserRepos, fetchUserProfile } from './services/github';
import translations from './lib/i18n';

function App() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');
  const [locale, setLocale] = useState('en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const t = translations[locale];

  const handleSubmit = async (inputUsername) => {
    try {
      const [repoData, profileData] = await Promise.all([
        fetchUserRepos(inputUsername),
        fetchUserProfile(inputUsername),
      ]);
      setRepos(repoData);
      setFilteredRepos(repoData);
      setProfile(profileData);
      setUsername(inputUsername);
    } catch (error) {
      alert('User not found or API error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header theme={theme} setTheme={setTheme} />
      <div className="flex flex-1">
        <Sidebar locale={locale} setLocale={setLocale} />
        <main className="flex-1 p-4">
          <GitHubForm onSubmit={handleSubmit} label={t.inputLabel} />
          {profile && <UserCard profile={profile} />}
          {username && <ContributionCalendar username={username} />}
          {filteredRepos.length > 0 && (
            <>
              <RepoSortFilter repos={repos} onChange={setFilteredRepos} />
              <Charts repos={filteredRepos} />
              <StatGalaxy repos={filteredRepos} />
            </>
          )}
          {!profile && (
            <p className="text-muted-foreground text-center mt-8">{t.prompt}</p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
