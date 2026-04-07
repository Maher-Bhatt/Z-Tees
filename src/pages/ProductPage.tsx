import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Info,
  AlertCircle,
  Truck,
  ShieldCheck,
  Instagram,
  MessageCircle,
  ShoppingBag,
  Star,
} from 'lucide-react';
import {
  ALL_SIZES,
  WA_NUMBER,
  IG_URL,
  formatPrice,
  getAvailabilityNote,
  getAvailableSizes,
  getDiscountPercent,
  getProductBySlug,
  isSizeAvailable,
  type Size,
} from '@/data/products';
import { useCart } from '@/context/CartContext';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';
import FloatingButtons from '@/components/FloatingButtons';
import ProductGallery from '@/components/ProductGallery';

// ─── Size guide modal (page-local) ────────────────────────────────────────────

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  const rows = [
    { s: 'S',  chest: 38, length: 27 },
    { s: 'M',  chest: 40, length: 28 },
    { s: 'L',  chest: 42, length: 29 },
    { s: 'XL', chest: 44, length: 30 },
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
          &times;
        </button>
        <h3 className="text-base font-black uppercase tracking-tight mb-1">Size Guide</h3>
        <p className="text-[10px] text-gray-400 mb-5 uppercase tracking-widest">
          Measurements in inches — ±1 inch normal
        </p>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-[10px] tracking-wider font-black uppercase">
            <tr>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Chest</th>
              <th className="py-3 px-4">Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(row => (
              <tr key={row.s} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-black">{row.s}</td>
                <td className="py-3 px-4">{row.chest}&quot;</td>
                <td className="py-3 px-4">{row.length}&quot;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-gray-400 mt-4 italic">
          Tees run slightly oversized. Between sizes? Size down.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? '');
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize]   = useState<Size | ''>('');
  const [sizeError, setSizeError]         = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const availableSizes   = useMemo(() => (product ? getAvailableSizes(product) : []), [product]);
  const availabilityNote = product ? getAvailabilityNote(product) : '';
  const isOutOfStock     = availableSizes.length === 0;

  // Auto-select when only one size available; clear on product change
  useEffect(() => {
    if (!product) return;
    if (availableSizes.length === 1) {
      setSelectedSize(availableSizes[0]);
      setSizeError(false);
      return;
    }
    setSelectedSize(cur => (cur && isSizeAvailable(product, cur) ? cur : ''));
    setSizeError(false);
  }, [availableSizes, product]);

  // ── 404 state ──
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppNavbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <ShoppingBag size={48} className="text-gray-200 mb-5" />
          <h1 className="text-2xl font-black uppercase tracking-tight mb-3">Product Not Found</h1>
          <p className="text-gray-500 text-sm mb-8">
            This product doesn&apos;t exist or may have been removed.
          </p>
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

  const discount = getDiscountPercent(product);

  const handleSelectSize = (size: Size) => {
    if (!product.sizes[size]) return;
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !isSizeAvailable(product, selectedSize)) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !isSizeAvailable(product, selectedSize)) {
      setSizeError(true);
      return;
    }
    const msg = `Hi, I want to order:\n\n1. ${product.name} - Size: ${selectedSize} - ${formatPrice(product.price)}\n\nTotal: ${formatPrice(product.price)}\n\nPlease confirm availability.`;
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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

            {/* ── Gallery — extracted reusable component ── */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* ── Details panel ── */}
            <div className="flex flex-col pb-28 md:pb-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {product.color} — {product.category}
              </span>
              <h1
                className="font-black text-gray-900 uppercase tracking-tighter leading-none mb-5"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)' }}
              >
                {product.name}
              </h1>

              {/* Price row */}
              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-black text-gray-900">{formatPrice(product.price)}</span>
                <span className="text-lg text-gray-400 line-through mb-0.5">{formatPrice(product.originalPrice)}</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 mb-0.5">
                  {discount}% off
                </span>
              </div>

              {/* Stock note */}
              {availabilityNote && (
                <div className={`flex items-center gap-2 mb-5 px-3 py-2.5 border ${
                  isOutOfStock
                    ? 'text-red-700 bg-red-50 border-red-200'
                    : 'text-amber-700 bg-amber-50 border-amber-200'
                }`}>
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wide">{availabilityNote}</span>
                </div>
              )}

              {/* Size selector */}
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
                        onClick={() => handleSelectSize(size)}
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
                {sizeError && !isOutOfStock && (
                  <p className="text-red-500 text-xs font-bold mt-2.5 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertCircle size={12} /> Please select an available size to continue.
                  </p>
                )}
                {isOutOfStock && (
                  <p className="text-red-500 text-xs font-bold mt-2.5 uppercase tracking-wide flex items-center gap-1.5">
                    <AlertCircle size={12} /> Out of Stock
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 pb-6 border-b border-gray-100">
                {product.description}
              </p>

              {/* Fabric / Fit */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                {[
                  { label: 'Fabric', value: product.fabric },
                  { label: 'Fit',    value: product.fit    },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 border border-gray-100 p-3.5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Payment note */}
              <div className="bg-gray-50 border border-gray-200 px-4 py-3 mb-7 flex items-start gap-2.5">
                <ShieldCheck size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  <span className="font-bold text-gray-900">UPI Payments Accepted</span> — GPay, PhonePe, Paytm.
                  Cash on Delivery is not available.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-7">
                {['Premium Quality', 'Accurate Images', 'Fast Dispatch', 'Secure Payment'].map(text => (
                  <span key={text} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    <Star size={9} className="text-black fill-black" /> {text}
                  </span>
                ))}
              </div>

              {/* Desktop CTAs */}
              <div className="hidden md:flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full h-14 flex items-center justify-center text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98] border-2 ${
                    isOutOfStock
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : addedFeedback
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-black text-white border-black hover:bg-gray-800'
                  }`}
                >
                  {isOutOfStock ? 'Out of Stock' : addedFeedback ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className={`w-full h-14 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest transition-all active:scale-[0.98] ${
                    isOutOfStock
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#25D366] text-white hover:bg-[#1db954]'
                  }`}
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

      {/* Mobile sticky CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] slide-up">
        <div className="flex gap-2 px-4 py-3 pb-safe">
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-1 h-12 flex items-center justify-center text-xs font-black uppercase tracking-wider transition-all border-2 ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : addedFeedback
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-black text-white border-black active:scale-[0.97]'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : addedFeedback ? 'Added ✓' : 'Add to Cart'}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-1 h-12 flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider transition-all ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#25D366] text-white hover:bg-[#1db954] active:scale-[0.97]'
            }`}
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
