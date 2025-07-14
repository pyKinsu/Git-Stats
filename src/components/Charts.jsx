import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

export default function Charts({ repos }) {
  const languageData = repos.reduce((acc, repo) => {
    const lang = repo.language || 'Other';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(languageData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="my-8">
      <h3 className="text-lg font-medium mb-4">Top Languages</h3>
      <div className="h-64 w-full max-w-md mx-auto">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
