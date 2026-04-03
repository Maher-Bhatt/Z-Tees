import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Plus, Minus, Trash2, ArrowRight,
  ShieldCheck, MessageCircle, ChevronLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppURL, formatPrice } from '@/data/products';
import AppNavbar from '@/components/AppNavbar';
import AppFooter from '@/components/AppFooter';

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

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
        .fade-in { animation: fadeIn 0.35s ease-out forwards; }
      `}</style>

      <AppNavbar />

      <main className="flex-1 fade-in">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 min-h-[70vh]">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Cart {totalItems > 0 && <span className="text-gray-300">({totalItems})</span>}
            </h1>
            <Link
              to="/"
              className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
            >
              <ChevronLeft size={13} /> Continue Shopping
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-24 bg-gray-50 border border-gray-100">
              <ShoppingBag size={48} className="mx-auto text-gray-200 mb-5" />
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-8">Your cart is empty</p>
              <Link
                to="/"
                className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                Shop Collection <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="divide-y divide-gray-100">
                  {cart.map(item => (
                    <div key={item.cartId} className="flex gap-4 py-5 items-start group">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="w-20 h-24 bg-gray-50 flex-shrink-0 overflow-hidden hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product.slug}`} className="hover:underline">
                          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.product.name}</h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">{item.product.color} - Size: <span className="font-bold">{item.size}</span></p>
                        <p className="text-sm font-black text-gray-900 mt-1.5">{formatPrice(item.product.price * item.qty)}</p>

                        <div className="flex items-center gap-0 mt-3 border border-gray-200 w-fit">
                          <button
                            onClick={() => updateQty(item.cartId, item.qty - 1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors active:bg-gray-100"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-9 text-center text-sm font-black">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.cartId, item.qty + 1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 transition-colors active:bg-gray-100"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="text-gray-200 hover:text-red-400 transition-colors p-1 active:scale-90 opacity-0 group-hover:opacity-100"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-gray-50 p-6 border border-gray-100 sticky top-24">
                  <h2 className="text-sm font-black uppercase tracking-widest mb-5">Order Summary</h2>

                  <div className="space-y-2 mb-5 pb-5 border-b border-gray-200 text-sm">
                    {cart.map(item => (
                      <div key={item.cartId} className="flex justify-between">
                        <span className="text-gray-600 truncate mr-2">
                          {item.product.name} <span className="text-gray-400 font-medium">x{item.qty}</span>
                        </span>
                        <span className="font-black text-gray-900 flex-shrink-0">{formatPrice(item.product.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-black uppercase tracking-widest">Subtotal</span>
                    <span className="text-2xl font-black">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-wide">
                    Delivery charges calculated on order
                  </p>

                  <div className="bg-white border border-gray-200 px-3 py-2.5 mb-5 flex items-start gap-2">
                    <ShieldCheck size={13} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                      UPI payments only - COD not available
                    </p>
                  </div>

                  <button
                    onClick={() => window.open(buildWhatsAppURL(cart), '_blank')}
                    className="w-full h-14 bg-[#25D366] text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-[#1db954] transition-all active:scale-[0.98] mb-3"
                  >
                    <MessageCircle size={18} /> Order via WhatsApp
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mb-4 leading-relaxed">
                    Your cart details will be sent. We'll confirm availability and share payment info.
                  </p>

                  <Link
                    to="/"
                    className="w-full h-11 bg-white text-black border border-gray-200 text-[10px] font-black uppercase tracking-widest hover:border-gray-900 transition-colors flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
