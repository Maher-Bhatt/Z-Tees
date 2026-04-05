import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, MessageCircle, Instagram } from 'lucide-react';
import {
  PRODUCTS,
  IG_URL,
  IG_HANDLE,
  formatPrice,
  getAvailabilityNote,
  getAvailableSizes,
  type Product,
} from '@/data/products';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';
import FloatingButtons from '@/components/FloatingButtons';

function Hero({ scrollToShop }: { scrollToShop: () => void }) {
  return (
    <div className="relative w-full h-[60vh] md:h-[72vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#181818_0%,_#0a0a0a_70%)]" />
      <div className="relative z-10 text-center px-6 max-w-3xl w-full">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] mb-5">
          Modern Indian Streetwear
        </p>
        <h1
          className="font-black text-white tracking-tighter mb-5 uppercase leading-[0.88]"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 7rem)' }}
        >
          Minimal Streetwear.<br />Maximum Presence.
        </h1>
        <p className="text-sm md:text-base text-gray-400 mb-10 font-medium">
          Starting at {formatPrice(399)}&nbsp;&nbsp;&middot;&nbsp;&nbsp;Free Delivery in Gujarat&nbsp;&nbsp;&middot;&nbsp;&nbsp;Order via WhatsApp
        </p>
        <button
          onClick={scrollToShop}
          className="bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-100 active:scale-95 transition-all inline-flex items-center gap-2 min-h-[48px]"
        >
          View Collection <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function TrustBar() {
  const items = [
    'Free Delivery in Gujarat',
    'UPI Payments Accepted',
    'Cash on Delivery Not Available',
    'Order via WhatsApp',
    `Starting at ${formatPrice(399)}`,
    'Premium Quality Guaranteed',
  ];

  return (
    <div className="bg-black text-white py-3 overflow-hidden select-none">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'tickerScroll 22s linear infinite' }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={index} className="text-[11px] font-bold uppercase tracking-widest px-6 flex-shrink-0">
            {item} <span className="opacity-25 mx-2">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const hasBackImage = product.images.length > 1;
  const availableSizes = getAvailableSizes(product);
  const availabilityNote = getAvailabilityNote(product);

  return (
    <button
      onClick={() => navigate(`/product/${product.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group text-left flex flex-col w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
      style={{ perspective: '1000px' }}
    >
      <div
        className="relative w-full overflow-hidden mb-3 bg-gray-50"
        style={{
          aspectRatio: '3/4',
          boxShadow: hovered
            ? '0 8px 30px rgba(0,0,0,0.12)'
            : '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 z-20 bg-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-1">
            {product.tag}
          </div>
        )}

        {availabilityNote && (
          <div className="absolute bottom-2.5 left-2.5 z-20 bg-white/92 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-gray-200 backdrop-blur-sm">
            {availabilityNote}
          </div>
        )}

        {hasBackImage ? (
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <img
                src={product.images[0]}
                alt={`${product.name} - front`}
                loading="lazy"
                className="w-full h-full object-contain object-center"
                style={{ padding: '4px' }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <img
                src={product.images[1]}
                alt={`${product.name} - back`}
                loading="lazy"
                className="w-full h-full object-contain object-center"
                style={{ padding: '4px' }}
              />
              <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 backdrop-blur-sm">
                Back View
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain object-center transition-transform duration-700 ease-in-out"
              style={{
                padding: '4px',
                transform: hovered ? 'scale(1.07)' : 'scale(1)',
              }}
            />
            <div
              className="absolute inset-0 flex items-end justify-center pb-4 transition-all duration-400"
              style={{ background: hovered ? 'rgba(0,0,0,0.08)' : 'transparent' }}
            >
              <span
                className="text-white text-[10px] font-black uppercase tracking-widest bg-black px-4 py-2 transition-all duration-300"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                View Details
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="px-0.5">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <div className="flex-1 min-w-0">
            <h3 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-tight truncate leading-tight">
              {product.name}
            </h3>
            <p className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider mt-0.5 font-medium">
              {product.color}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs md:text-sm font-black text-gray-900">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-1 justify-end mt-0.5">
              <p className="text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.5">
                {discount}% off
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-start justify-between gap-3">
          <p className="text-[10px] md:text-[11px] text-gray-500 font-medium">
            {availableSizes.length > 0
              ? `Available sizes: ${availableSizes.join(', ')}`
              : 'Out of Stock'}
          </p>
          {hasBackImage && (
            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest flex-shrink-0">
              Hover to flip
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default function Index() {
  const [filter, setFilter] = useState<'All' | 'Basic' | 'Graphic'>('All');
  const shopRef = useRef<HTMLDivElement>(null);
  const categories = ['All', 'Basic', 'Graphic'] as const;
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(product => product.category === filter);

  return (
    <div
      className="font-sans antialiased text-gray-900 bg-white min-h-screen flex flex-col selection:bg-black selection:text-white"
      style={{ cursor: 'default' }}
    >
      <style>{`
        * { cursor: inherit; }
        button, a, [role="button"] { cursor: pointer !important; }
        [disabled] { cursor: not-allowed !important; }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <AppNavbar />

      <main className="flex-1">
        <Hero scrollToShop={() => shopRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <TrustBar />

        <div
          ref={shopRef}
          id="shop-grid"
          className="bg-white/95 border-b border-gray-100 py-4 sticky top-16 z-30 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-7 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 flex-shrink-0">
              Filter
            </span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`text-[11px] font-black uppercase tracking-widest flex-shrink-0 transition-all pb-0.5 ${
                  filter === category
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-400 hover:text-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 sm:gap-x-7 md:gap-y-16">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <div className="bg-gray-50 border-t border-gray-100 py-12">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                icon: <Truck size={20} />,
                title: 'Free Delivery in Gujarat',
                sub: 'Shipping charges apply for other states.',
              },
              {
                icon: <ShieldCheck size={20} />,
                title: 'UPI Payments Only',
                sub: 'GPay, PhonePe, Paytm accepted. Cash on Delivery not available.',
              },
              {
                icon: <MessageCircle size={20} />,
                title: 'Order via WhatsApp',
                sub: 'Add items to cart and place your order directly on WhatsApp.',
              },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <div className="text-black">{item.icon}</div>
                <p className="text-[11px] font-black uppercase tracking-widest">{item.title}</p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black py-16 text-center px-4">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em] mb-3">
            Stay Updated
          </p>
          <h3
            className="font-black text-white uppercase tracking-tighter mb-4"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)' }}
          >
            Follow Us on Instagram
          </h3>
          <p className="text-gray-400 text-sm font-medium mb-8 max-w-sm mx-auto">
            New arrivals, behind-the-scenes, and customer styles.
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-100 active:scale-95 transition-all"
          >
            <Instagram size={15} /> @{IG_HANDLE}
          </a>
        </div>
      </main>

      <AppFooter />
      <FloatingButtons />
    </div>
  );
}
