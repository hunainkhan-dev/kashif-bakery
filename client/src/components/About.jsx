export default function About() {
  return (
    <section className="py-20" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="rv bg-grape border-[3px] border-ink rounded-[30px] text-white py-14 px-10 text-center shadow-pop-lg">
          <span className="eyebrow !text-mustard">🏠 Our Story</span>
          <h2 className="text-white text-[clamp(30px,5vw,48px)] mt-2">
            2015 se Karachi ko meetha kar rahe hain 💜
          </h2>
          <p className="max-w-[52ch] mx-auto mt-4 text-white/90 text-[17px]">
            Kashif Bakery ek chhoti si dukaan se shuru hui — ek oven, aur ek ziddi yakeen ke acha
            cake kisi ka din bana sakta hai. Aaj bhi har cheez roz taaza, haath se, pyar se banti hai.
          </p>
        </div>
      </div>
    </section>
  );
}
