import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { money } from '../lib/format.js';

const STATUSES = ['pending', 'baking', 'out-for-delivery', 'delivered'];
const CATEGORIES = ['cakes', 'cupcakes', 'cookies', 'breads'];
const EMPTY_PRODUCT = { name: '', category: 'cakes', price: '', desc: '', image: '', inStock: true };

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const loadOrders = () => api.get('/orders').then((r) => setOrders(r.data));
  const loadProducts = () => api.get('/products').then((r) => setProducts(r.data));

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const stats = useMemo(() => {
    const revenue = orders.reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.status === 'pending').length;
    return { count: orders.length, pending, revenue };
  }, [orders]);

  const setStatus = async (id, status) => {
    const { data } = await api.patch(`/orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? data : o)));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <header className="bg-ink text-cream border-b-[3px] border-ink">
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="font-display font-bold text-xl uppercase">
            KASHIF<span className="text-mustard">·</span>BAKERY <span className="text-mustard text-sm">admin</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-cream/70 hidden sm:inline">{user?.email}</span>
            <Link to="/" target="_blank" className="font-display font-semibold text-mustard">View store ↗</Link>
            <button onClick={logout} className="font-display font-semibold border-2 border-mustard text-mustard rounded-full px-4 py-1.5 hover:bg-mustard hover:text-ink transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            ['Orders', stats.count, 'bg-paper'],
            ['Pending', stats.pending, 'bg-mustard'],
            ['Revenue', money(stats.revenue), 'bg-mint'],
          ].map(([label, val, bg]) => (
            <div key={label} className={`card-pop ${bg} p-5`}>
              <div className="text-xs font-display font-semibold uppercase tracking-wide opacity-70">{label}</div>
              <div className="font-display font-bold text-[clamp(22px,4vw,34px)] leading-tight mt-1">{val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2.5 mb-6">
          <button onClick={() => setTab('orders')} className={`pill ${tab === 'orders' ? 'pill-active' : ''}`}>🧾 Orders</button>
          <button onClick={() => setTab('products')} className={`pill ${tab === 'products' ? 'pill-active' : ''}`}>🧁 Products</button>
        </div>

        {tab === 'orders' ? (
          <OrdersPanel orders={orders} setStatus={setStatus} />
        ) : (
          <ProductsPanel products={products} reload={loadProducts} />
        )}
      </main>
    </div>
  );
}

function OrdersPanel({ orders, setStatus }) {
  if (!orders.length) return <p className="font-display text-lg py-10 text-center">Abhi koi order nahi aaya 🫖</p>;
  return (
    <div className="flex flex-col gap-3">
      {orders.map((o) => (
        <div key={o._id} className="card-pop p-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <div className="font-display font-bold">#{o._id.slice(-6).toUpperCase()} · {o.customer.name}</div>
            <div className="text-sm text-[#7a6a75]">{o.customer.phone} · {o.customer.address}</div>
            <div className="text-sm mt-1">{o.items.map((i) => `${i.name}×${i.qty}`).join(', ')}</div>
            <div className="text-xs text-[#8a7a85] mt-1">{new Date(o.createdAt).toLocaleString('en-PK')} · {o.paymentMethod.toUpperCase()}</div>
          </div>
          <div className="font-display font-bold text-pink text-lg">{money(o.total)}</div>
          <select
            value={o.status}
            onChange={(e) => setStatus(o._id, e.target.value)}
            className="font-display font-semibold border-[3px] border-ink rounded-full px-3 py-2 bg-paper cursor-pointer"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ))}
    </div>
  );
}

function ProductsPanel({ products, reload }) {
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [editId, setEditId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const edit = (p) => {
    setEditId(p._id);
    setForm({ name: p.name, category: p.category, price: p.price, desc: p.desc, image: p.image, inStock: p.inStock });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const resetForm = () => { setEditId(null); setForm(EMPTY_PRODUCT); setError(''); };

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editId) await api.put(`/products/${editId}`, payload);
      else await api.post('/products', payload);
      resetForm();
      await reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    await reload();
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
      {/* Add / edit form */}
      <form onSubmit={save} className="card-pop p-5 flex flex-col gap-3">
        <h3 className="text-xl">{editId ? 'Edit product' : 'Add product'}</h3>
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-pop" />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-pop">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input required type="number" min="0" placeholder="Price (PKR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-pop" />
        <input placeholder="Short description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="input-pop" />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-pop" />
        <label className="font-display font-semibold text-sm flex items-center gap-2">
          <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-5 h-5 accent-pink" />
          In stock
        </label>
        {error && <p className="text-pink-dark font-semibold text-sm">{error}</p>}
        <div className="flex gap-2">
          <button disabled={busy} className="btn flex-1 justify-center">{editId ? 'Update' : 'Add +'}</button>
          {editId && <button type="button" onClick={resetForm} className="btn btn-ghost">Cancel</button>}
        </div>
      </form>

      {/* Product list */}
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div key={p._id} className="card-pop p-3 flex items-center gap-3">
            <img src={p.image} alt="" className="w-14 h-14 rounded-xl object-cover border-2 border-ink" />
            <div className="flex-1">
              <b className="font-display block leading-tight">{p.name}</b>
              <span className="text-xs text-[#7a6a75] capitalize">{p.category}{!p.inStock && ' · sold out'}</span>
            </div>
            <span className="font-display font-bold text-pink">{money(p.price)}</span>
            <button onClick={() => edit(p)} className="font-display font-semibold text-sm border-2 border-ink rounded-full px-3 py-1.5 bg-mustard">Edit</button>
            <button onClick={() => remove(p._id)} className="font-display font-semibold text-sm border-2 border-ink rounded-full px-3 py-1.5 bg-paper hover:bg-pink hover:text-white">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
