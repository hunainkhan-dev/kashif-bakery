import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Nav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="sticky top-0 z-[100] bg-cream border-b-[3px] border-ink">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[68px]">
        <Link to="/" className="font-display font-bold text-2xl uppercase flex items-center gap-2">
          KASHIF<span className="text-pink">·</span>BAKERY
        </Link>
        <div className="flex gap-1.5 items-center">
          <a href="/#menu" className="hidden sm:block font-display font-semibold text-[15px] px-3.5 py-2 rounded-full hover:bg-mustard transition-colors">Menu</a>
          <a href="/#gallery" className="hidden sm:block font-display font-semibold text-[15px] px-3.5 py-2 rounded-full hover:bg-mustard transition-colors">Gallery</a>
          <a href="/#reviews" className="hidden md:block font-display font-semibold text-[15px] px-3.5 py-2 rounded-full hover:bg-mustard transition-colors">Reviews</a>
          <a href="/#about" className="hidden md:block font-display font-semibold text-[15px] px-3.5 py-2 rounded-full hover:bg-mustard transition-colors">About</a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className="relative border-[3px] border-ink bg-mustard w-12 h-12 rounded-full text-[22px] cursor-pointer shadow-pop hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg transition-transform"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink text-white font-display font-bold text-xs min-w-[22px] h-[22px] rounded-full border-2 border-ink grid place-items-center px-1">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
