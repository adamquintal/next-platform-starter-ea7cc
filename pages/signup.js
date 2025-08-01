import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Signup() {
  const router = useRouter();
  const { plan } = router.query;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      // On successful sign up, you may want to insert the selected plan into your DB via backend
      // Redirect to dashboard after sign up
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {plan === 'pro' ? 'Sign up for Pro' : 'Create your account'}
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-dark transition disabled:opacity-50"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
          <div className="text-center text-sm text-gray-500">
            Already have an account?
            <button
              onClick={handleLogin}
              disabled={loading}
              className="ml-2 text-primary hover:underline"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}