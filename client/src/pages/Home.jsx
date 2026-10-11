import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import MenuGrid from '../components/MenuGrid.jsx';
import Gallery from '../components/Gallery.jsx';
import Reviews from '../components/Reviews.jsx';
import About from '../components/About.jsx';
import Footer from '../components/Footer.jsx';
import { useReveal } from '../lib/useReveal.js';
import { useCart } from '../context/CartContext.jsx';

export default function Home() {
  useReveal([]); // reveal the static sections on mount
  const { count, setOpen } = useCart();

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <MenuGrid />
      <Gallery />
      <Reviews />
      <About />
      <Footer />

      {/* Mobile floating cart */}
      {count > 0 && (
        <button onClick={() => setOpen(true)} className="btn fixed bottom-5 right-5 z-[90] md:hidden">
          🛒 Cart ({count})
        </button>
      )}
    </>
  );
}
