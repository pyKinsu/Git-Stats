import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import UserPage from './pages/User';
import translations from './lib/i18n';

function App() {
  const [locale, setLocale] = useState('en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const t = translations[locale];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Header theme={theme} setTheme={setTheme} locale={locale} setLocale={setLocale} />
      <div className="flex flex-1">
        <Sidebar locale={locale} setLocale={setLocale} />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home locale={locale} />} />
            <Route path="/user/:username" element={<UserPage locale={locale} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
