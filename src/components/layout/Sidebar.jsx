import { Home, Github, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Sidebar({ locale, setLocale }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    { name: 'GitHub', icon: <Github size={18} />, path: 'https://github.com/pykinsu' },
  ];

  return (
    <aside className="w-56 border-r border-border bg-sidebar text-sidebar-foreground hidden md:flex flex-col p-4">
      <h2 className="text-lg font-semibold mb-4">📂 Navigation</h2>
      <nav className="space-y-2">
        {navItems.map((item) =>
          item.path.startsWith('http') ? (
            <a
              key={item.name}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition"
            >
              {item.icon}
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                'flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-muted transition',
                location.pathname === item.path && 'bg-muted text-primary font-medium'
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        )}
      </nav>

      <div className="mt-auto text-xs text-muted-foreground pt-6">
        🌐 Language: <strong>{locale.toUpperCase()}</strong>
      </div>
    </aside>
  );
}
