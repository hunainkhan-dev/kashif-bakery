const REVIEWS = [
  { t: 'Best chocolate cake in Karachi, no cap! Birthday pe mangwaya, sab fans ho gaye.', n: 'Hamza A.', bg: 'bg-paper', rot: '-rotate-1' },
  { t: 'Cupcakes itne soft aur fresh the. WhatsApp pe order kiya, 40 min mein aa gaya!', n: 'Sana K.', bg: 'bg-mustard', rot: 'rotate-[1.5deg]' },
  { t: 'Meri go-to bakery. Har hafte cookies mangwati hoon. Quality top class.', n: 'Areeba M.', bg: 'bg-mint', rot: '-rotate-[1.5deg]' },
];

export default function Reviews() {
  return (
    <section className="py-20" id="reviews">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-11 rv">
          <span className="eyebrow">💬 Log kya kehte hain</span>
          <h2 className="text-[clamp(34px,6vw,60px)] mt-2.5">
            Reviews that <span className="[text-decoration:wavy_underline_#FFB703] [text-underline-offset:8px]">pop!</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.n} className={`rv border-[3px] border-ink rounded-[22px] p-6 shadow-pop ${r.bg} ${r.rot}`}>
              <div className="text-lg">★★★★★</div>
              <p className="text-[15px] my-2.5">"{r.t}"</p>
              <b className="font-display">— {r.n}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
