import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GitHubForm from '../components/GitHubForm';
import translations from '../lib/i18n';

export default function Home() {
  const [locale] = useState('en');
  const t = translations[locale];
  const navigate = useNavigate();

  const handleSubmit = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <main className="flex-1 p-4">
      <GitHubForm onSubmit={handleSubmit} label={t.inputLabel} />
      <p className="text-muted-foreground text-center mt-8">{t.prompt}</p>
    </main>
  );
}
