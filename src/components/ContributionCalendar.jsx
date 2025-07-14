import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ContributionCalendar({ username }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!username) return;

    const fetchContributions = async () => {
      try {
        const res = await axios.get(`https://github.com/users/${username}/contributions`, {
          headers: { Accept: 'text/html' },
        });
        const parser = new DOMParser();
        const doc = parser.parseFromString(res.data, 'text/html');
        const calendarSvg = doc.querySelector('svg.js-calendar-graph-svg');
        setHtml(calendarSvg.outerHTML);
      } catch (err) {
        console.error('Contribution calendar fetch failed:', err);
      }
    };

    fetchContributions();
  }, [username]);

  return (
    <div className="bg-card border border-border p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Contribution Calendar</h3>
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
