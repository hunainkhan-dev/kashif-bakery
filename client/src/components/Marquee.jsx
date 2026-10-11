export default function Marquee() {
  const items = ['🎂 Fresh Cakes', '🧁 Cupcakes', '🍪 Cookies', '🍞 Breads', '🚚 Fast Delivery'];
  const strip = [...items, ...items]; // duplicated for a seamless loop
  return (
    <div className="bg-ink text-cream border-y-[3px] border-ink overflow-hidden whitespace-nowrap py-3">
      <div className="inline-block animate-scrollx font-display font-bold text-[22px] uppercase">
        {strip.map((t, i) => (
          <span key={i} className="mx-[22px]">
            {t} <b className="text-mustard">•</b>
          </span>
        ))}
      </div>
    </div>
  );
}
