import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import StatsCard from '../components/StatsCard';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/signup');
        return;
      }
      setUser(user);
      // Check Bloomerang connection status
      try {
        const res = await fetch(`${API_URL}/api/connection-status?user_id=${user.id}`);
        const json = await res.json();
        setConnected(json.connected);
        if (json.connected) {
          // Fetch stats
          const statsRes = await fetch(`${API_URL}/api/stats?user_id=${user.id}`);
          const statsJson = await statsRes.json();
          setStats(statsJson);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    init();
  }, [API_URL, router]);

  const handleConnectBloomerang = () => {
    // Redirect to backend route to initiate OAuth flow
    window.location.href = `${API_URL}/auth/bloomerang/login?user_id=${user.id}&redirect_uri=${encodeURIComponent(window.location.origin + '/dashboard')}`;
  };

  const handleSendReport = async () => {
    if (!user) return;
    await fetch(`${API_URL}/api/send-report?user_id=${user.id}`, { method: 'POST' });
    alert('Report generation triggered!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/');
          }}
          className="text-sm text-gray-600 hover:underline"
        >
          Sign Out
        </button>
      </header>
      {!connected ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-4">Connect your Bloomerang account</h2>
          <p className="text-gray-600 mb-6">
            To see your donor insights, please link your Bloomerang account.
          </p>
          <button
            onClick={handleConnectBloomerang}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
          >
            Connect Bloomerang
          </button>
        </div>
      ) : (
        <div>
          {/* Stats Cards */}
          {stats && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Total Donors"
                value={stats.totalDonors}
                trend={stats.donorGrowthPercent}
              />
              <StatsCard
                title="New Donors This Month"
                value={stats.newDonorsThisMonth}
                trend={stats.newDonorTrend}
              />
              <StatsCard
                title="Donations vs Last Month"
                value={`$${stats.totalDonationsThisMonth.toLocaleString()}`}
                trend={stats.donationGrowthPercent}
              />
            </div>
          )}
          {/* Chart */}
          {stats && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-semibold mb-4">Donations Over Time</h3>
              <Line
                data={{
                  labels: stats.chart.labels,
                  datasets: [
                    {
                      label: 'Total Donations ($)',
                      data: stats.chart.donations,
                      backgroundColor: 'rgba(100, 167, 11, 0.5)',
                      borderColor: '#64a70b',
                      fill: true,
                    },
                    {
                      label: 'Donors',
                      data: stats.chart.donors,
                      borderColor: '#3b82f6',
                      backgroundColor: 'rgba(59, 130, 246, 0.3)',
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                  },
                }}
              />
            </div>
          )}
          {/* Lapsed Donors */}
          {stats && (
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-semibold mb-4">Lapsed Donors</h3>
              {stats.lapsedDonors.length === 0 ? (
                <p className="text-gray-600">You have no lapsed donors. Great job!</p>
              ) : (
                <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                  {stats.lapsedDonors.map((donor) => (
                    <li key={donor.id} className="py-2 flex justify-between">
                      <span className="font-medium">{donor.name}</span>
                      <span className="text-gray-500 text-sm">Last donation: {new Date(donor.lastDonation).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {/* Trigger Report Button */}
          {stats && (
            <div className="text-right">
              <button
                onClick={handleSendReport}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
              >
                Send me my weekly report now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}