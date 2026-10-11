import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client.js';
import { useCart } from '../context/CartContext.jsx';
import { money, WHATSAPP_NUMBER } from '../lib/format.js';

export default function Checkout() {
  const { list, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [payment, setPayment] = useState('cod');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const payload = {
        items: list.map((i) => ({ productId: i._id, name: i.name, qty: i.qty, price: i.price })),
        customer: form,
        paymentMethod: payment,
      };
      const { data: order } = await api.post('/orders', payload);

      if (payment === 'whatsapp') {
        let msg = `Assalam o Alaikum Kashif Bakery! 🧁\nOrder #${order._id.slice(-6)}\n`;
        list.forEach((i) => (msg += `• ${i.name} x${i.qty} = ${money(i.qty * i.price)}\n`));
        msg += `\nTotal: ${money(order.total)}\nName: ${form.name}\nAddress: ${form.address}\nPhone: ${form.phone}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
      }

      clear();
      navigate(`/order/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Order submit nahi hua. Dobara try karein.');
      setSending(false);
    }
  };

  if (!list.length) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-4xl mb-4">Cart khaali hai 🥲</h1>
          <Link to="/" className="btn">Menu pe wapas jao 🧁</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-[900px] mx-auto px-6">
        <Link to="/" className="font-display font-semibold text-pink">← Menu</Link>
        <h1 className="text-[clamp(32px,6vw,52px)] mt-3 mb-8">Checkout 🧾</h1>

        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-start">
          {/* Form */}
          <form onSubmit={submit} className="card-pop p-6 flex flex-col gap-4">
            <h2 className="text-2xl">Delivery details</h2>
            <label className="font-display font-semibold text-sm">
              Naam
              <input required minLength={2} value={form.name} onChange={set('name')} className="input-pop mt-1.5" placeholder="Aapka naam" />
            </label>
            <label className="font-display font-semibold text-sm">
              Phone
              <input required value={form.phone} onChange={set('phone')} className="input-pop mt-1.5" placeholder="03XX XXXXXXX" />
            </label>
            <label className="font-display font-semibold text-sm">
              Address
              <textarea required minLength={5} rows={3} value={form.address} onChange={set('address')} className="input-pop mt-1.5 resize-none" placeholder="Ghar ka poora pata, area, city" />
            </label>

            <div className="font-display font-semibold text-sm">
              Payment
              <div className="flex gap-2.5 mt-2">
                {[
                  ['cod', '💵 Cash on Delivery'],
                  ['whatsapp', '💬 Confirm on WhatsApp'],
                ].map(([v, label]) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => setPayment(v)}
                    className={`pill flex-1 text-center ${payment === v ? 'pill-active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-pink-dark font-semibold text-sm">{error}</p>}

            <button disabled={sending} className="btn w-full justify-center text-[17px] mt-2">
              {sending ? 'Placing order…' : `Place Order · ${money(total)}`}
            </button>
          </form>

          {/* Summary */}
          <div className="card-pop p-6 bg-cream">
            <h2 className="text-2xl mb-4">Your order</h2>
            <div className="flex flex-col gap-3">
              {list.map((i) => (
                <div key={i._id} className="flex gap-3 items-center">
                  <img src={i.image} alt="" className="w-12 h-12 rounded-lg object-cover border-2 border-ink" />
                  <div className="flex-1">
                    <b className="font-display text-sm block leading-tight">{i.name}</b>
                    <span className="text-xs text-[#7a6a75]">x{i.qty}</span>
                  </div>
                  <span className="font-display font-semibold">{money(i.qty * i.price)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-display font-bold text-xl mt-5 pt-4 border-t-2 border-ink">
              <span>Total</span>
              <span className="text-pink">{money(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
