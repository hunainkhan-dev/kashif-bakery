const IMAGES = [
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=80&auto=format&fit=crop',
];

export default function Gallery() {
  return (
    <section className="py-20" id="gallery">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-11 rv">
          <span className="eyebrow">📸 The Yum</span>
          <h2 className="text-[clamp(34px,6vw,60px)] mt-2.5">
            Dekho to <span className="[text-decoration:wavy_underline_#FFB703] [text-underline-offset:8px]">sahi!</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 rv">
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className={`border-[3px] border-ink rounded-[18px] overflow-hidden group ${
                i === 0 ? 'md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
              }`}
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
