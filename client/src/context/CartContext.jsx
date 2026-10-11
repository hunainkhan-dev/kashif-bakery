import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const STORAGE_KEY = 'kb_cart';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load); // { [productId]: {_id,name,price,image,qty} }
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable (private mode) — ignore */
    }
  }, [items]);

  const add = (product) =>
    setItems((prev) => {
      const id = product._id;
      const existing = prev[id];
      return { ...prev, [id]: { ...product, qty: (existing?.qty || 0) + 1 } };
    });

  const setQty = (id, qty) =>
    setItems((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...prev[id], qty } };
    });

  const clear = () => setItems({});

  const list = useMemo(() => Object.values(items), [items]);
  const count = useMemo(() => list.reduce((s, i) => s + i.qty, 0), [list]);
  const total = useMemo(() => list.reduce((s, i) => s + i.qty * i.price, 0), [list]);

  const value = { items, list, count, total, add, setQty, clear, open, setOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
