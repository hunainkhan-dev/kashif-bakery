import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="card-pop w-full max-w-[400px] p-8">
        <Link to="/" className="font-display font-semibold text-pink text-sm">← Store</Link>
        <h1 className="text-3xl mt-3 mb-1">Admin Login 🔐</h1>
        <p className="text-sm text-[#7a6a75] mb-6">Kashif Bakery dashboard</p>

        <label className="font-display font-semibold text-sm block mb-3">
          Email
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-pop mt-1.5" placeholder="admin@kashifbakery.com" />
        </label>
        <label className="font-display font-semibold text-sm block mb-4">
          Password
          <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-pop mt-1.5" placeholder="••••••••" />
        </label>

        {error && <p className="text-pink-dark font-semibold text-sm mb-3">{error}</p>}

        <button disabled={busy} className="btn w-full justify-center">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
