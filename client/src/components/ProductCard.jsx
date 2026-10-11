import { useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../lib/format.js';
import { burstConfetti, popEl } from '../lib/confetti.js';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const btnRef = useRef(null);

  const onAdd = () => {
    add(product);
    popEl(btnRef.current);
    burstConfetti(btnRef.current);
  };

  return (
    <article className="card-pop rv overflow-hidden flex flex-col">
      <div className="aspect-square overflow-hidden border-b-[3px] border-ink group">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-[19px]">{product.name}</h3>
        <p className="text-[13px] text-[#7a6a75] flex-1">{product.desc}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-display font-bold text-xl text-pink">{money(product.price)}</span>
          <button
            ref={btnRef}
            onClick={onAdd}
            disabled={product.inStock === false}
            className="font-display font-semibold text-sm px-4 py-2 border-2 border-ink rounded-full bg-mustard cursor-pointer transition-transform hover:bg-ink hover:text-mustard active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock === false ? 'Sold out' : 'Add +'}
          </button>
        </div>
      </div>
    </article>
  );
}
