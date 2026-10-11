import { useEffect, useMemo, useState } from 'react';
import api from '../api/client.js';
import ProductCard from './ProductCard.jsx';
import { useReveal } from '../lib/useReveal.js';

const CATS = [
  { c: 'all', label: 'All' },
  { c: 'cakes', label: '🎂 Cakes' },
  { c: 'cupcakes', label: '🧁 Cupcakes' },
  { c: 'cookies', label: '🍪 Cookies' },
  { c: 'breads', label: '🍞 Breads' },
];

export default function MenuGrid() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState('all');
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let alive = true;
    api
      .get('/products')
      .then((res) => {
        if (!alive) return;
        setProducts(res.data);
        setStatus('ready');
      })
      .catch(() => alive && setStatus('error'));
    return () => {
      alive = false;
    };
  }, []);

  const shown = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [products, active]
  );

  useReveal([shown.length, status]);

  return (
    <section className="py-20" id="menu">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-11 rv">
          <span className="eyebrow">★ Our Menu ★</span>
          <h2 className="text-[clamp(34px,6vw,60px)] mt-2.5">
            Meetha jo{' '}
            <span className="[text-decoration:wavy_underline_#FFB703] [text-underline-offset:8px]">mana</span>{' '}
            na ho!
          </h2>
        </div>

        <div className="flex gap-2.5 justify-center flex-wrap mb-9 rv">
          {CATS.map(({ c, label }) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`pill hover:-translate-y-0.5 ${active === c ? 'pill-active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {status === 'loading' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card-pop aspect-[3/4] animate-pulse opacity-60" />
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="text-center font-display text-lg py-10">
            Menu load nahi hua 🥲 — server chal raha hai? <code>npm run dev</code> (server/)
          </p>
        )}

        {status === 'ready' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {shown.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
