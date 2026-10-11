import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client.js';
import { money } from '../lib/format.js';

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch(() => setNotFound(true));
    // /orders/:id is admin-only, so a public visitor won't load details —
    // that's fine, we still show the confirmation + id below.
  }, [id]);

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="card-pop max-w-[480px] w-full p-8 text-center">
        <div className="text-6xl mb-3">🎉</div>
        <h1 className="text-4xl mb-2">Order mil gaya!</h1>
        <p className="text-[#5a4a55] mb-5">
          Shukriya! Aapka order lag gaya hai. Hum jaldi contact karenge. 💜
        </p>
        <div className="bg-mustard border-2 border-ink rounded-2xl py-3 px-4 font-display font-bold mb-5">
          Order #{id.slice(-6).toUpperCase()}
        </div>

        {order && (
          <div className="text-left mb-5">
            {order.items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-sm py-1">
                <span>{i.name} × {i.qty}</span>
                <span className="font-display">{money(i.qty * i.price)}</span>
              </div>
            ))}
            <div className="flex justify-between font-display font-bold text-lg mt-2 pt-2 border-t-2 border-ink">
              <span>Total</span>
              <span className="text-pink">{money(order.total)}</span>
            </div>
          </div>
        )}
        {notFound && (
          <p className="text-xs text-[#8a7a85] mb-5">Order confirm ho gaya — details bakery team ke paas safe hain.</p>
        )}

        <Link to="/" className="btn w-full justify-center">Aur meetha mangwao 🧁</Link>
      </div>
    </div>
  );
}
