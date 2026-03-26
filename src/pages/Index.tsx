import React, { useState, useEffect } from 'react';
import {
  ShoppingBag, Menu, X, ArrowRight, ShieldCheck, Truck,
  ChevronLeft, Plus, Minus, Trash2, Info, Instagram,
  MessageCircle, AlertCircle
} from 'lucide-react';

// ── ASSETS ───────────────────────────────────────────────────────
import imgShinchan  from '@/assets/shinchan-vibes.jpeg';
import imgPeaceOut  from '@/assets/peace-out.jpeg';
import imgStranger  from '@/assets/gang-walk.jpeg';
import imgKingNorth from '@/assets/king-north.jpeg';
import imgWowCats   from '@/assets/wow-cats.jpeg';
import imgGotham    from '@/assets/gotham-nights.jpeg';
import imgKnowPain  from '@/assets/pain-tee.jpeg';
import imgGojo      from '@/assets/gojo-tee.jpeg';

// ── CONSTANTS ────────────────────────────────────────────────────
const WA_NUMBER = '917990407096';
const IG_URL    = 'https://instagram.com/z_tees.in';
const IG_HANDLE = 'z_tees.in';

// ── SIZE CONFIG ──────────────────────────────────────────────────
// availableSizes = sizes user can actually select
// allSizes       = all sizes shown (unavailable ones are greyed)
const ALL_SIZES   = ['S', 'M', 'L'];
const AVAIL_SIZES = ['S', 'M', 'L'];

// ── PRODUCT DATA ─────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Shinchan Vibes',
    price: 419, originalPrice: 699,
    category: 'Graphic', color: 'Navy Blue',
    availableSizes: AVAIL_SIZES,
    images: [imgShinchan],
    tag: 'Popular',
    stockNote: 'Limited Stock',
    description: 'A bold Shinchan character print on premium navy blue cotton. Relaxed regular fit with the message Choose Peace, Love Yourself, Be Happy.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_2',
    name: 'Peace Out',
    price: 419, originalPrice: 699,
    category: 'Graphic', color: 'Black',
    availableSizes: AVAIL_SIZES,
    images: [imgPeaceOut],
    tag: 'Best Seller',
    stockNote: '',
    description: 'Back-print graphic featuring a white dove, red rose, and bold Peace typography. Clean front, expressive back. Printed on premium black cotton.',
    fabric: '100% Premium Cotton', fit: 'Oversized Fit',
  },
  {
    id: 'prod_3',
    name: 'Stranger Things',
    price: 439, originalPrice: 699,
    category: 'Graphic', color: 'Chocolate Brown',
    availableSizes: AVAIL_SIZES,
    images: [imgStranger],
    tag: 'Fan Favourite',
    stockNote: '',
    description: 'All eight Stranger Things characters illustrated side by side on rich chocolate brown cotton. A minimalist graphic for fans who appreciate subtle references.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_4',
    name: 'King in the North',
    price: 399, originalPrice: 649,
    category: 'Graphic', color: 'Cream / Off-White',
    availableSizes: AVAIL_SIZES,
    images: [imgKingNorth],
    tag: 'Fan Favourite',
    stockNote: '',
    description: 'A detailed front graphic of a warrior holding a sword, paired with bold King in the North typography on cream off-white cotton.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_5',
    name: 'Wow Cats',
    price: 419, originalPrice: 699,
    category: 'Basic', color: 'Dusty Pink',
    availableSizes: AVAIL_SIZES,
    images: [imgWowCats],
    tag: '',
    stockNote: '',
    description: 'Three stacked cartoon cats printed on the side of a dusty pink tee, with WOW!! and Hi typography integrated into the design. Soft, breathable premium cotton.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_6',
    name: 'Gotham Nights',
    price: 409, originalPrice: 699,
    category: 'Graphic', color: 'Black',
    availableSizes: AVAIL_SIZES,
    images: [imgGotham],
    tag: 'Limited Edition',
    stockNote: 'Only Few Left',
    description: 'The iconic bat symbol with Gotham\'s city skyline etched inside. A clean, refined graphic. Limited edition — will not be restocked once sold out.',
    fabric: '100% Premium Cotton', fit: 'Oversized Fit',
  },
  {
    id: 'prod_7',
    // Special rule: only M available
    name: 'Know Pain',
    price: 409, originalPrice: 699,
    category: 'Graphic', color: 'White',
    availableSizes: ['M'],          // ← ONLY M
    images: [imgKnowPain],
    tag: 'Anime Collection',
    stockNote: 'Only Size M Available',
    description: 'A manga-style graphic panel featuring Japanese kanji and the phrase This World Shall Know Pain. A dramatic print on premium white cotton.',
    fabric: '100% Premium Cotton', fit: 'Regular Fit',
  },
  {
    id: 'prod_8',
    name: 'Gojo Satoru',
    price: 409, originalPrice: 699,
    category: 'Graphic', color: 'Black',
    availableSizes: AVAIL_SIZES,
    images: [imgGojo],
    tag: 'Back Print',
    stockNote: '',
    description: 'A bold back-print graphic of Gojo Satoru from Jujutsu Kaisen, featuring red slash accents and Reverse Curse Technique typography in kanji.',
    fabric: '100% Premium Cotton', fit: 'Oversized Fit',
  },
];

// ── WHATSAPP ORDER HELPER ────────────────────────────────────────
function buildWhatsAppURL(cart: any[]) {
  const lines = cart.map((item, i) =>
    `${i + 1}. ${item.product.name} – Size: ${item.size} – ₹${item.product.price}${item.qty > 1 ? ` x${item.qty}` : ''}`
  );
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const msg = [
    'Hi, I want to order:',
    '',
    ...lines,
    '',
    `Total: ₹${total}`,
    '',
    'Please confirm availability.',
  ].join('\n');
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── SIZE GUIDE MODAL ─────────────────────────────────────────────
function SizeGuideModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  const rows = [
    { s: 'S',  chest: 38, length: 27 },
    { s: 'M',  chest: 40, length: 28 },
    { s: 'L',  chest: 42, length: 29 },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-sm p-6 relative shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black transition-colors cursor-pointer">
          <X size={20} />
        </button>
        <h3 className="text-lg font-black uppercase tracking-tight mb-1">Size Guide</h3>
        <p className="text-xs text-gray-400 mb-5 uppercase tracking-widest">Measurements in inches · ±1 inch normal</p>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs tracking-wider font-bold uppercase">
            <tr>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Chest</th>
              <th className="py-3 px-4">Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r.s} className="hover:bg-gray-50">
                <td className="py-3 px-4 font-bold">{r.s}</td>
                <td className="py-3 px-4">{r.chest}"</td>
                <td className="py-3 px-4">{r.length}"</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 mt-4 italic">Tees run slightly oversized. Between sizes? Size down.</p>
      </div>
    </div>
  );
}

// ── NAVBAR ───────────────────────────────────────────────────────
function Navbar({ setView, cartItemCount }: { setView: (v: string) => void; cartItemCount: number }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -ml-2 text-gray-900 cursor-pointer transition-transform active:scale-95">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex-1 flex justify-center md:justify-start">
          <button onClick={() => setView('home')} className="text-2xl font-black tracking-tighter uppercase text-gray-900 cursor-pointer hover:opacity-70 transition-opacity">
            Z Tees<span className="text-gray-300">.</span>
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => setView('home')} className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors uppercase tracking-widest cursor-pointer">Shop</button>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-900 hover:text-gray-500 transition-colors uppercase tracking-widest cursor-pointer">Instagram</a>
        </div>

        {/* Cart icon */}
        <button onClick={() => setView('cart')} className="p-2 -mr-2 text-gray-900 hover:text-gray-500 transition-colors relative cursor-pointer active:scale-95">
          <ShoppingBag size={24} />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 absolute w-full left-0 shadow-xl animate-slide-down">
          <div className="px-4 py-4 space-y-4">
            <button onClick={() => { setView('home'); setOpen(false); }} className="block w-full text-left text-lg font-bold uppercase tracking-widest text-gray-900 cursor-pointer hover:text-gray-500 transition-colors">Shop Collection</button>
            <button onClick={() => { setView('cart'); setOpen(false); }} className="block w-full text-left text-lg font-bold uppercase tracking-widest text-gray-900 cursor-pointer hover:text-gray-500 transition-colors">Cart ({cartItemCount})</button>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="block text-lg font-bold uppercase tracking-widest text-gray-900 cursor-pointer hover:text-gray-500 transition-colors">Instagram</a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────
function Hero({ scrollToShop }: { scrollToShop: () => void }) {
  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1a1a1a_0%,_#0a0a0a_70%)]" />
      <div className="relative z-10 text-center px-6 max-w-3xl w-full">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-6">Modern Indian Streetwear</p>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-5 uppercase leading-[0.88]">
          Minimal Streetwear.<br />Maximum Presence.
        </h2>
        <p className="text-sm md:text-base text-gray-400 mb-10 font-medium">
          Starting at ₹399 &nbsp;·&nbsp; Free Delivery in Gujarat &nbsp;·&nbsp; Order via WhatsApp
        </p>
        <button
          onClick={scrollToShop}
          className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer min-h-[48px]"
        >
          View Collection <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── TRUST BAR ────────────────────────────────────────────────────
function TrustBar() {
  const items = [
    'Free Delivery in Gujarat',
    'UPI Payments Accepted',
    'Cash on Delivery Not Available',
    'Order via WhatsApp',
    'Starting at ₹399',
    'S · M · L Available',
  ];
  return (
    <div className="bg-black text-white py-3 overflow-hidden select-none">
      <div className="ticker-track flex whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="text-[11px] font-bold uppercase tracking-widest px-6 flex-shrink-0">
            {t} <span className="opacity-30 mx-2">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── SHOP VIEW ────────────────────────────────────────────────────
function ShopView({ setView, setSelectedProduct }: { setView: (v: string) => void; setSelectedProduct: (p: any) => void }) {
  const [filter, setFilter] = useState('All');
  const shopRef = React.useRef<HTMLDivElement>(null);
  const categories = ['All', 'Basic', 'Graphic'];
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="animate-fade-in">
      <Hero scrollToShop={() => shopRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <TrustBar />

      {/* Filter bar */}
      <div ref={shopRef} id="shop-grid" className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex-shrink-0">Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm font-bold uppercase tracking-widest flex-shrink-0 transition-colors cursor-pointer pb-1 ${
                filter === cat ? 'text-black border-b-2 border-black' : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-16">
            {filtered.map(product => (
              <button
                key={product.id}
                className="group text-left flex flex-col cursor-pointer focus:outline-none"
                onClick={() => { setSelectedProduct(product); setView('product'); }}
              >
                {/* Image */}
                <div className="relative w-full bg-gray-100 overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
                  {product.tag && (
                    <div className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                      {product.tag}
                    </div>
                  )}
                  {product.stockNote && (
                    <div className="absolute bottom-2 left-2 z-10 bg-white text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-gray-200">
                      {product.stockNote}
                    </div>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
                {/* Info */}
                <div className="px-1 flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-tight truncate">{product.name}</h3>
                    <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{product.color}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs md:text-sm font-bold text-gray-900">₹{product.price}</p>
                    <p className="text-[10px] text-gray-400 line-through">₹{product.originalPrice}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Info strip */}
      <div className="bg-gray-50 border-t border-gray-100 py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: <Truck size={18} />, title: 'Free Delivery in Gujarat', sub: 'Charges apply for other states.' },
            { icon: <ShieldCheck size={18} />, title: 'UPI Payments Only', sub: 'GPay, PhonePe, and Paytm accepted. Cash on Delivery not available.' },
            { icon: <MessageCircle size={18} />, title: 'Order via WhatsApp', sub: 'Add to cart and send your order directly via WhatsApp.' },
          ].map(item => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <div className="text-black">{item.icon}</div>
              <p className="text-xs font-bold uppercase tracking-widest">{item.title}</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram block */}
      <div className="bg-black py-16 text-center px-4">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.4em] mb-3">Stay Updated</p>
        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Follow Us on Instagram</h3>
        <p className="text-gray-400 text-sm font-medium mb-8 max-w-sm mx-auto">New arrivals, behind-the-scenes content, and customer styles.</p>
        <a
          href={IG_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
        >
          <Instagram size={16} /> @{IG_HANDLE}
        </a>
      </div>
    </div>
  );
}

// ── PRODUCT DETAIL VIEW ──────────────────────────────────────────
function ProductDetailView({ product, setView, addToCart }: { product: any; setView: (v: string) => void; addToCart: (p: any, s: string) => void }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addToCart(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleWhatsAppDirect = () => {
    if (!selectedSize) { setSizeError(true); return; }
    const msg = `Hi, I want to order:\n\n1. ${product.name} – Size: ${selectedSize} – ₹${product.price}\n\nTotal: ₹${product.price}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => setView('home')} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-black mb-8 uppercase tracking-widest transition-colors cursor-pointer active:scale-95">
          <ChevronLeft size={14} /> All Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Image panel */}
          <div className="w-full bg-gray-50 flex items-center justify-center overflow-hidden rounded-sm" style={{ minHeight: 420 }}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain max-h-[600px] p-4 transition-transform duration-500 hover:scale-105 cursor-zoom-in"
            />
          </div>

          {/* Detail panel */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{product.color} · {product.category}</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">{product.name}</h1>

            {/* Price row */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.originalPrice}</span>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 mb-0.5">{discount}% off</span>
            </div>

            {/* Stock note */}
            {product.stockNote && (
              <div className="flex items-center gap-2 mb-4 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-2 rounded-sm">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wide">{product.stockNote}</span>
              </div>
            )}

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Select Size</h3>
                <button onClick={() => setSizeGuideOpen(true)} className="text-xs font-bold text-gray-400 hover:text-black uppercase flex items-center gap-1 transition-colors cursor-pointer">
                  <Info size={12} /> Size Guide
                </button>
              </div>
              <div className="flex gap-3">
                {ALL_SIZES.map(size => {
                  const available = product.availableSizes.includes(size);
                  return (
                    <button
                      key={size}
                      disabled={!available}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      title={!available ? 'Out of Stock' : ''}
                      className={`relative w-14 h-12 flex items-center justify-center text-sm font-bold transition-all border-2 ${
                        !available
                          ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'
                          : selectedSize === size
                          ? 'bg-black text-white border-black cursor-pointer'
                          : 'bg-white text-gray-900 border-gray-200 hover:border-gray-900 cursor-pointer active:scale-95'
                      }`}
                    >
                      {size}
                      {!available && (
                        <span className="absolute inset-0 flex items-end justify-center pb-1">
                          <span className="text-[8px] text-gray-400 uppercase">Out of Stock</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {sizeError && (
                <p className="text-red-500 text-xs font-bold mt-2 uppercase tracking-wide flex items-center gap-1">
                  <AlertCircle size={12} /> Please select a size before continuing.
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 pb-6 border-b border-gray-100">{product.description}</p>

            {/* Fabric / Fit */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[{ label: 'Fabric', value: product.fabric }, { label: 'Fit', value: product.fit }].map(item => (
                <div key={item.label} className="bg-gray-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Payment notice */}
            <div className="bg-gray-50 border border-gray-200 px-4 py-3 mb-6 flex items-start gap-2">
              <ShieldCheck size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                <span className="font-bold text-gray-900">UPI Payments Accepted</span> (GPay, PhonePe, Paytm).
                Cash on Delivery is not available.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className={`w-full h-14 flex items-center justify-center text-sm font-bold uppercase tracking-widest transition-all cursor-pointer active:scale-95 border-2 ${
                  addedFeedback
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-black text-white border-black hover:bg-gray-800'
                }`}
              >
                {addedFeedback ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full h-14 bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all cursor-pointer active:scale-95"
              >
                <MessageCircle size={18} /> Order via WhatsApp
              </button>
              <a
                href={IG_URL} target="_blank" rel="noopener noreferrer"
                className="w-full h-12 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600 border border-gray-200 hover:border-gray-900 transition-colors cursor-pointer"
              >
                <Instagram size={14} /> Message on Instagram
              </a>
            </div>

            {/* Delivery info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <Truck size={16} className="text-gray-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 font-medium">Free delivery across Gujarat. Shipping charges apply for other states.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CART VIEW ────────────────────────────────────────────────────
function CartView({ cart, updateQty, removeItem, setView }: any) {
  const subtotal = cart.reduce((s: number, i: any) => s + i.product.price * i.qty, 0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleWhatsAppOrder = () => {
    window.open(buildWhatsAppURL(cart), '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 min-h-[70vh] animate-fade-in">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-black">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border border-gray-100">
          <ShoppingBag size={44} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6">Your cart is empty</p>
          <button
            onClick={() => setView('home')}
            className="bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors cursor-pointer active:scale-95 inline-flex items-center gap-2"
          >
            Return to Shop <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Items */}
          <div className="flex-1">
            <div className="divide-y divide-gray-100">
              {cart.map((item: any) => (
                <div key={item.cartId} className="flex gap-4 py-5 items-start">
                  {/* Image */}
                  <div className="w-20 h-24 bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.product.color} · Size: <span className="font-bold">{item.size}</span></p>
                    <p className="text-sm font-black text-gray-900 mt-1">₹{item.product.price * item.qty}</p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-0 mt-3 border border-gray-200 w-fit">
                      <button onClick={() => updateQty(item.cartId, item.qty - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100">
                        <Minus size={13} />
                      </button>
                      <span className="w-9 text-center text-sm font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.cartId, item.qty + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100">
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  {/* Remove */}
                  <button onClick={() => removeItem(item.cartId)} className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer p-1 active:scale-90">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-gray-50 p-6 border border-gray-100 sticky top-24">
              <h2 className="text-base font-black uppercase tracking-tighter mb-5">Order Summary</h2>

              {/* Item breakdown */}
              <div className="space-y-2 mb-5 pb-5 border-b border-gray-200 text-sm">
                {cart.map((item: any) => (
                  <div key={item.cartId} className="flex justify-between">
                    <span className="text-gray-600 truncate mr-2">{item.product.name} <span className="text-gray-400">×{item.qty}</span></span>
                    <span className="font-bold text-gray-900 flex-shrink-0">₹{item.product.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black">₹{subtotal}</span>
              </div>
              <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wide">Delivery charges calculated on order</p>

              {/* Payment note */}
              <div className="bg-white border border-gray-200 px-3 py-2 mb-5 flex items-start gap-2">
                <ShieldCheck size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                  UPI payments only · COD not available
                </p>
              </div>

              {/* WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full h-14 bg-[#25D366] text-white flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all cursor-pointer active:scale-95 mb-3"
              >
                <MessageCircle size={18} /> Order via WhatsApp
              </button>
              <p className="text-[10px] text-center text-gray-400 mb-4">
                Your order details will be sent to WhatsApp. We'll confirm availability and share payment info.
              </p>
              <button
                onClick={() => setView('home')}
                className="w-full h-11 bg-white text-black border border-gray-200 text-xs font-bold uppercase tracking-widest hover:border-gray-900 transition-colors cursor-pointer active:scale-95"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FOOTER ───────────────────────────────────────────────────────
function AppFooter() {
  return (
    <footer className="bg-black text-white pt-14 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-3">Z Tees.</h2>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-2">Modern Indian streetwear. Designed to stand out.</p>
            <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Designed in India.</p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-gray-500">Ordering</h4>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li>Orders placed via WhatsApp</li>
              <li>UPI Payments Accepted</li>
              <li>Cash on Delivery Not Available</li>
              <li>Free Delivery in Gujarat</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-5 text-gray-500">Connect</h4>
            <ul className="space-y-3 text-sm font-bold uppercase tracking-wide">
              <li>
                <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer">WhatsApp</a>
              </li>
              <li>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Z Tees. All rights reserved.</p>
          <a
            href="https://maherbhatt.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer tracking-widest"
          >
            Made by Maher Bhatt
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function Index() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any, size: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) return prev.map(i => i.cartId === existing.cartId ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { cartId: `${Date.now()}`, product, size, qty: 1 }];
    });
  };

  const updateCartQty = (cartId: string, newQty: number) => {
    if (newQty < 1) { setCart(prev => prev.filter(i => i.cartId !== cartId)); return; }
    setCart(prev => prev.map(i => i.cartId === cartId ? { ...i, qty: newQty } : i));
  };

  const removeFromCart = (cartId: string) => setCart(prev => prev.filter(i => i.cartId !== cartId));
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col selection:bg-black selection:text-white" style={{ cursor: 'default' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: inherit; }
        button, a, [role="button"] { cursor: pointer !important; }
        input, textarea, select { cursor: text !important; }
        [disabled] { cursor: not-allowed !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-fade-in { animation: fadeIn 0.35s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.25s ease-out forwards; }
        .ticker-track { animation: tickerScroll 22s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <Navbar setView={setCurrentView} cartItemCount={totalItems} />

      <main className="flex-1">
        {currentView === 'home' && <ShopView setView={setCurrentView} setSelectedProduct={setSelectedProduct} />}
        {currentView === 'product' && selectedProduct && <ProductDetailView product={selectedProduct} setView={setCurrentView} addToCart={addToCart} />}
        {currentView === 'cart' && <CartView cart={cart} updateQty={updateCartQty} removeItem={removeFromCart} setView={setCurrentView} />}
      </main>

      <AppFooter />
    </div>
  );
}
