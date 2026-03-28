import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { IG_URL, IG_HANDLE } from '@/data/products';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/#shop-grid' },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-open { animation: slideDown 0.22s ease-out forwards; }
      `}</style>

      <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 -ml-2 text-gray-900 transition-transform active:scale-95"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter uppercase text-gray-900 hover:opacity-70 transition-opacity"
              onClick={() => setMobileOpen(false)}
            >
              Z Tees<span className="text-gray-200">.</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                isActive('/') ? 'text-gray-900 border-b-2 border-gray-900 pb-0.5' : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <a
              href="/#shop-grid"
              className="text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
            >
              Shop
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center gap-1.5"
            >
              <Instagram size={12} />
              {IG_HANDLE}
            </a>
          </div>

          {/* Cart */}
          <button
            onClick={() => { navigate('/cart'); setMobileOpen(false); }}
            className="p-2 -mr-2 text-gray-900 hover:text-gray-500 transition-colors relative active:scale-95"
            aria-label="Cart"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-black text-white text-[9px] font-bold min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white px-0.5">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 shadow-lg mobile-menu-open absolute w-full left-0">
            <div className="px-5 py-5 flex flex-col gap-5">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
              >
                Home
              </Link>
              <a
                href="/#shop-grid"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
              >
                Shop
              </a>
              <button
                onClick={() => { navigate('/cart'); setMobileOpen(false); }}
                className="text-left text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors flex items-center gap-2"
              >
                Cart {totalItems > 0 && <span className="bg-black text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{totalItems}</span>}
              </button>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors flex items-center gap-2"
              >
                <Instagram size={14} /> Instagram
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
