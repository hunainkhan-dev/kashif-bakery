import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { money, WHATSAPP_NUMBER } from '../lib/format.js';

export default function CartDrawer() {
  const { list, total, count, setQty, open, setOpen } = useCart();
  const navigate = useNavigate();

  const whatsappOrder = () => {
    if (!list.length) return;
    let msg = 'Assalam o Alaikum Kashif Bakery! 🧁\nMera order:\n';
    list.forEach((i) => {
      msg += `• ${i.name} x${i.qty} = ${money(i.qty * i.price)}\n`;
    });
    msg += `\nTotal: ${money(total)}\n\nName:\nAddress:`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const goCheckout = () => {
    if (!list.length) return;
    setOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/50 z-[200] transition-opacity duration-250 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[min(400px,90vw)] bg-cream border-l-[3px] border-ink z-[201] flex flex-col transition-transform duration-300 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b-[3px] border-ink">
          <h3 className="text-[22px]">🛒 Your Order</h3>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-[26px] font-display bg-transparent border-0 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!list.length ? (
            <p className="text-center text-[#8a7a85] py-12 px-5 text-[15px]">
              Cart khaali hai 🥲
              <br />
              Kuch meetha add karo!
            </p>
          ) : (
            list.map((i) => (
              <div key={i._id} className="flex gap-3 items-center bg-paper border-2 border-ink rounded-2xl p-2.5 mb-2.5">
                <img src={i.image} alt="" className="w-14 h-14 rounded-xl object-cover border-2 border-ink" />
                <div className="flex-1">
                  <b className="font-display text-[15px] block leading-tight">{i.name}</b>
                  <span className="text-pink font-display font-semibold">{money(i.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(i._id, i.qty - 1)} className="w-[26px] h-[26px] border-2 border-ink rounded-lg bg-mustard font-display font-bold cursor-pointer">−</button>
                  <span className="font-display min-w-[18px] text-center">{i.qty}</span>
                  <button onClick={() => setQty(i._id, i.qty + 1)} className="w-[26px] h-[26px] border-2 border-ink rounded-lg bg-mustard font-display font-bold cursor-pointer">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-5 border-t-[3px] border-ink">
          <div className="flex justify-between font-display font-bold text-[22px] mb-3.5">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>
          <button onClick={goCheckout} disabled={!count} className="btn w-full justify-center text-[17px] disabled:opacity-50">
            Checkout 🧾
          </button>
          <button onClick={whatsappOrder} disabled={!count} className="btn btn-wa w-full justify-center text-[17px] mt-2.5 disabled:opacity-50">
            Order on WhatsApp 💬
          </button>
          <p className="text-xs text-center text-[#8a7a85] mt-2.5">
            Checkout order DB mein save karta hai · Cash on delivery
          </p>
        </div>
      </aside>
    </>
  );
}
