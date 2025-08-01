export default function StatsCard({ title, value, trend }) {
  let trendColor = 'text-gray-500';
  if (trend > 0) {
    trendColor = 'text-green-600';
  } else if (trend < 0) {
    trendColor = 'text-red-600';
  }
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
      <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
      <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
      {trend !== undefined && (
        <div className={`text-sm ${trendColor}`}>
          {trend > 0 ? '+' : ''}{trend}% from last month
        </div>
      )}
    </div>
  );
}