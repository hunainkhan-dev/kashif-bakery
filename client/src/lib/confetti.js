const COLORS = ['#FF2E74', '#FFB703', '#2EC4B6', '#8B5CF6'];

/** Burst a little confetti from a DOM element (e.g. the Add button). */
export function burstConfetti(el) {
  if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 14; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.background = COLORS[i % COLORS.length];
    c.style.left = r.left + r.width / 2 + 'px';
    c.style.top = r.top + 'px';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    c.animate(
      [
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        {
          transform: `translate(${(Math.random() - 0.5) * 200}px, ${-Math.random() * 180 - 40}px) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.2,1)' }
    ).onfinish = () => c.remove();
  }
}

/** Quick scale pop on a button. */
export function popEl(el) {
  if (!el) return;
  el.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }],
    { duration: 280 }
  );
}
