import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft, Info, AlertCircle, Truck, ShieldCheck,
  Instagram, MessageCircle, ShoppingBag, Star,
} from 'lucide-react';
import { getProductBySlug, ALL_SIZES, WA_NUMBER, IG_URL, type Size } from '@/data/products';
import { useCart } from '@/context/CartContext';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';
import FloatingButtons from '@/components/FloatingButtons';

/* ─── SIZE GUIDE MODAL ──────────────────────────────────────────── */
function SizeGuideModal({ onClose }: { onClose: () => void }) {
  const rows = [
    { s: 'S', chest: 38, length: 27 },
    { s: 'M', chest: 40, length: 28 },
    { s: 'L', chest: 42, length: 29 },
  ];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xs p-6 relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
        <h3 className="text-base font-black uppercase tracking-tight mb-1">Size Guide</h3>
        <p className="text-[10px] text-gray-400 mb-5 uppercase tracking-widest">Measurements in inches · ±1 inch normal</p>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-[10px] tracking-wider font-black uppercase">
            <tr>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Chest</th>
              <th className="py-3 px-4">Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r.s} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-black">{r.s}</td>
                <td className="py-3 px-4">{r.chest}"</td>
                <td className="py-3 px-4">{r.length}"</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-gray-400 mt-4 italic">Tees run slightly oversized. Between sizes? Size down.</p>
      </div>
    </div>
  );
}

/* ─── PRODUCT PAGE ──────────────────────────────────────────────── */
export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug ?? '');
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<Size | ''>('');
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppNavbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <ShoppingBag size={48} className="text-gray-200 mb-5" />
          <h1 className="text-2xl font-black uppercase tracking-tight mb-3">Product Not Found</h1>
          <p className="text-gray-500 text-sm mb-8">This product doesn't exist or may have been removed.</p>
          <Link
            to="/"
            className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-all"
          >
            Back to Shop
          </Link>
        </main>
        <AppFooter />
      </div>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    const msg = `Hi, I want to order:\n\n1. ${product.name} – Size: ${selectedSize} – ₹${product.price}\n\nTotal: ₹${product.price}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col selection:bg-black selection:text-white"
      style={{ cursor: 'default' }}
    >
      <style>{`
        * { cursor: inherit; }
        button, a, [role="button"] { cursor: pointer !important; }
        [disabled] { cursor: not-allowed !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .page-in { animation: fadeIn 0.35s ease-out forwards; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .slide-up { animation: slideUp 0.3s ease-out forwards; }
      `}</style>

      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}

      <AppNavbar />

      <main className="flex-1 page-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 text-[10px] font-bold uppercase tracking-widest">
            <Link to="/" className="text-gray-400 hover:text-black transition-colors">Home</Link>
            <span className="text-gray-200">/</span>
            <Link to="/" className="text-gray-400 hover:text-black transition-colors">Shop</Link>
            <span className="text-gray-200">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

            {/* ─── IMAGE PANEL ─────────────────────────── */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div
                className="w-full bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm"
                style={{ minHeight: 400, aspectRatio: '3/4' }}
              >
                <img
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.04] cursor-zoom-in"
                  style={{ padding: '8px' }}
                />
              </div>

              {/* Thumbnail gallery (if multiple images) */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-20 bg-gray-50 flex-shrink-0 overflow-hidden border-2 transition-all ${
                        activeImg === i ? 'border-black' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ─── DETAIL PANEL ────────────────────────── */}
            <div className="flex flex-col pb-28 md:pb-0">

              {/* Label + name */}
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {product.color} · {product.category}
              </span>
              <h1
                className="font-black text-gray-900 uppercase tracking-tighter leading-none mb-5"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}
              >
                {product.name}
              </h1>

              {/* Price row */}
              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.originalPrice}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 mb-0.5">
                  {discount}% off
                </span>
              </div>

              {/* Stock note */}
              {product.stockNote && (
                <div className="flex items-center gap-2 mb-5 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2.5">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wide">{product.stockNote}</span>
                </div>
              )}

              {/* Size selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Select Size</h2>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[10px] font-bold text-gray-400 hover:text-black uppercase flex items-center gap-1 transition-colors"
                  >
                    <Info size={11} /> Size Guide
                  </button>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {ALL_SIZES.map(size => {
                    const available = product.sizes[size];
                    return (
                      <button
                        key={size}
                        disabled={!available}
                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                        title={!available ? 'Sold Out' : ''}
                        className={`relative w-14 h-12 flex flex-col items-center justify-center text-sm font-black transition-all border-2 ${
                          !available
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'
                            : selectedSize === size
                            ? 'bg-black text-white border-black shadow-md'
                            : 'bg-white text-gray-900 border-gray-200 hover:border-gray-900 active:scale-95'
                        }`}
                      >
                        {size}
                        {!available && (
                          <span className="text-[7px] text-gray-400 uppercase font-bold leading-none mt-0.5">
                            Sold Out
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {sizeError && (
                  <p className="text-red-500 text-xs font-bold mt-2.5 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertCircle size={12} /> Please select a size to continue.
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 pb-6 border-b border-gray-100">
                {product.description}
              </p>

              {/* Fabric / Fit chips */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                {[
                  { label: 'Fabric', value: product.fabric },
                  { label: 'Fit', value: product.fit },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 border border-gray-100 p-3.5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Payment notice */}
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 mb-7 flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  <span className="font-bold text-gray-900">UPI Payments Accepted</span> — GPay, PhonePe, Paytm.
                  Cash on Delivery is not available.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-7">
                {['Premium Quality', 'Accurate Images', 'Fast Dispatch', 'Secure Payment'].map(t => (
                  <span key={t} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    <Star size={9} className="text-black fill-black" /> {t}
                  </span>
                ))}
              </div>

              {/* ─── CTA BUTTONS (desktop) ─────────────── */}
              <div className="hidden md:flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-14 flex items-center justify-center text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98] border-2 ${
                    addedFeedback
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-black text-white border-black hover:bg-gray-800'
                  }`}
                >
                  {addedFeedback ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full h-14 bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest hover:bg-[#1db954] transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={18} /> Buy Now via WhatsApp
                </button>
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-500 border border-gray-200 hover:border-gray-800 hover:text-gray-800 transition-all"
                >
                  <Instagram size={13} /> Message on Instagram
                </a>
              </div>

              {/* Delivery */}
              <div className="mt-6 flex items-start gap-3">
                <Truck size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 font-medium">
                  Free delivery across Gujarat. Shipping charges apply for other states.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── STICKY MOBILE CTA ──────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] slide-up">
        <div className="flex gap-2 px-4 py-3 pb-safe">
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-12 flex items-center justify-center text-xs font-black uppercase tracking-wider transition-all border-2 ${
              addedFeedback
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-black text-white border-black active:scale-[0.97]'
            }`}
          >
            {addedFeedback ? '✓ Added' : 'Add to Cart'}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 h-12 bg-[#25D366] text-white flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider hover:bg-[#1db954] active:scale-[0.97] transition-all"
          >
            <MessageCircle size={15} /> Buy Now
          </button>
        </div>
      </div>

      <AppFooter />
      <FloatingButtons />
    </div>
  );
}