import { WHATSAPP_NUMBER } from '../lib/format.js';

export default function Hero() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Assalam o Alaikum Kashif Bakery! Mujhe order karna hai.'
  )}`;

  return (
    <header className="relative py-10 pb-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        <div>
          <span className="eyebrow rv">🧁 Karachi · Fresh Daily</span>
          <h1 className="rv text-[clamp(44px,8vw,92px)] my-4">
            Cakes jo <span className="text-pink">dil</span>{' '}
            <span className="text-mustard [-webkit-text-stroke:2px_#2A1A2E]">jeet</span> lein!
          </h1>
          <p className="rv text-[19px] max-w-[42ch] mt-2 mb-7 text-[#5a4a55]">
            Fresh cakes, cupcakes, cookies aur breads — roz subah Kashif Bakery mein pyar se bake
            hote hain. Order karo, ghar pe mangwao. 🚚
          </p>
          <div className="rv flex gap-3.5 flex-wrap">
            <a href="#menu" className="btn">Order Now 🧁</a>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-wa">WhatsApp 💬</a>
          </div>
          <div className="rv flex gap-7 mt-8 flex-wrap">
            {[
              ['10k+', 'Happy orders'],
              ['4.9★', 'Google rating'],
              ['45min', 'Fast delivery'],
            ].map(([b, s]) => (
              <div key={s}>
                <b className="font-display text-[26px] block text-pink">{b}</b>
                <span className="text-[13px] text-[#6a5a65]">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rv relative max-w-[340px] mx-auto md:max-w-none">
          <div className="absolute -top-8 right-8 w-24 h-24 z-[3] animate-spin360">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="cp" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <circle cx="50" cy="50" r="48" fill="#FFB703" stroke="#2A1A2E" strokeWidth="3" />
              <text fontFamily="Fredoka" fontSize="11.5" fontWeight="700" fill="#2A1A2E">
                <textPath href="#cp">★ FRESH DAILY ★ BAKED WITH LOVE </textPath>
              </text>
              <text x="50" y="57" textAnchor="middle" fontSize="30">🎂</text>
            </svg>
          </div>
          <div className="border-4 border-ink rounded-[30px] shadow-pop-lg aspect-square overflow-hidden rotate-3">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80&auto=format&fit=crop"
              alt="Chocolate cake"
            />
          </div>
          <span className="absolute -top-6 -left-5 border-[3px] border-ink rounded-full bg-mustard w-[84px] h-[84px] grid place-items-center text-[40px] shadow-pop animate-bob">🍩</span>
          <span className="absolute bottom-2.5 -right-6 border-[3px] border-ink rounded-full bg-mint w-[84px] h-[84px] grid place-items-center text-[40px] shadow-pop animate-bob [animation-delay:.4s]">🍪</span>
          <span className="absolute top-[40%] -right-8 border-[3px] border-ink rounded-full bg-pink w-[66px] h-[66px] grid place-items-center text-[30px] shadow-pop animate-bob [animation-delay:.8s]">🧁</span>
        </div>
      </div>
    </header>
  );
}
