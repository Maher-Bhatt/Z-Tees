import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  formatPrice,
  getAvailableSizes,
  getAvailabilityNote,
  getDiscountPercent,
  type Product,
} from '@/data/products';

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard
 * - Reusable card used on the Index grid (and anywhere else you display products).
 * - Flip animation when a product has more than one image (front → back on hover).
 * - Scale + "View Details" overlay when single-image.
 * - Navigation handled via react-router (no full reload).
 */
export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const discount        = getDiscountPercent(product);
  const hasMultipleImgs = product.images.length > 1;
  const availableSizes  = getAvailableSizes(product);
  const availabilityNote = getAvailabilityNote(product);

  return (
    <button
      onClick={() => navigate(`/product/${product.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group text-left flex flex-col w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-sm"
      style={{ perspective: '1000px' }}
    >
      {/* ── Image container ── */}
      <div
        className="relative w-full overflow-hidden mb-3 bg-gray-50"
        style={{
          aspectRatio: '3/4',
          boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Tag badge */}
        {product.tag && (
          <div className="absolute top-2.5 left-2.5 z-20 bg-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-1">
            {product.tag}
          </div>
        )}

        {/* Availability badge */}
        {availabilityNote && (
          <div className="absolute bottom-2.5 left-2.5 z-20 bg-white/92 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-gray-200 backdrop-blur-sm">
            {availabilityNote}
          </div>
        )}

        {/* Flip card when multiple images, otherwise zoom */}
        {hasMultipleImgs ? (
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: hovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <img
                src={product.images[0]}
                alt={`${product.name} — front`}
                loading="lazy"
                className="w-full h-full object-contain object-center"
                style={{ padding: '4px' }}
              />
            </div>
            {/* Back (images[1]) */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <img
                src={product.images[1]}
                alt={`${product.name} — back`}
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
              style={{ padding: '4px', transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
            />
            <div
              className="absolute inset-0 flex items-end justify-center pb-4 transition-all duration-300"
              style={{ background: hovered ? 'rgba(0,0,0,0.08)' : 'transparent' }}
            >
              <span
                className="text-white text-[10px] font-black uppercase tracking-widest bg-black px-4 py-2 transition-all duration-300"
                style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}
              >
                View Details
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Text info ── */}
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
              ? `Available: ${availableSizes.join(', ')}`
              : 'Out of Stock'}
          </p>
          {hasMultipleImgs && (
            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest flex-shrink-0">
              Hover to flip
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
