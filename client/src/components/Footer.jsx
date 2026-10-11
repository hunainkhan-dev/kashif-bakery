import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../lib/format.js';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream pt-12 pb-7 mt-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between flex-wrap gap-6">
          <div>
            <div className="font-display font-bold text-2xl uppercase">
              KASHIF<span className="text-mustard">·</span>BAKERY
            </div>
            <p className="text-sm text-cream/75 mt-2">Karachi · Roz taaza, pyar se 💜</p>
          </div>
          <div>
            <p className="text-sm text-cream/75">
              <b className="text-cream">📍 Address</b>
              <br />
              Karachi, Pakistan
            </p>
          </div>
          <div>
            <p className="text-sm text-cream/75">
              <b className="text-cream">💬 Order</b>
              <br />
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-mustard">
                WhatsApp: +92 335 8304999
              </a>
              <br />
              Daily 9am – 11pm
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-cream/50">
          © 2026 Kashif Bakery · Website by{' '}
          <a href="https://axiomwebbuilder.com" target="_blank" rel="noreferrer" className="text-mustard">
            Axiom Web Builder
          </a>{' '}
          · <Link to="/admin/login" className="text-mustard/70">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
