export default function Footer() {
  return (
    <footer className="border-t border-border bg-card text-muted-foreground text-sm px-6 py-4 text-center">
      Built with ❤️ by{' '}
      <a
        href="https://github.com/pykinsu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        @pykinsu
      </a>{' '}
      — View on{' '}
      <a
        href="https://github.com/pykinsu/github-galaxy-stats"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        GitHub
      </a>
    </footer>
  );
}
