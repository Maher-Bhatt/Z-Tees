import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

/**
 * ProductGallery
 * - Shows a large main image with smooth CSS transitions (no reload).
 * - Renders clickable thumbnails when there are multiple images.
 * - Arrow navigation for keyboard / touch users.
 * - Extracted as a reusable component so both ProductPage and any future
 *   modal can use it without duplicating logic.
 */
export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasManyImages = images.length > 1;

  const prev = () => setActiveIdx(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main preview ── */}
      <div
        className="relative w-full bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Image — key change triggers a quick CSS fade via the class */}
        <img
          key={activeIdx}
          src={images[activeIdx]}
          alt={`${productName} — view ${activeIdx + 1}`}
          className="w-full h-full object-contain transition-opacity duration-300 hover:scale-[1.03] transition-transform cursor-zoom-in"
          style={{ padding: '8px' }}
          loading={activeIdx === 0 ? 'eager' : 'lazy'}
        />

        {/* Arrow controls — only when gallery has multiple images */}
        {hasManyImages && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-1.5 shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-1.5 shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              <ChevronRight size={16} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === activeIdx ? 'bg-black scale-125' : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnails — only render when there are multiple images ── */}
      {hasManyImages && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
              className={`flex-shrink-0 w-16 h-20 bg-gray-50 overflow-hidden border-2 transition-all rounded-sm ${
                activeIdx === i
                  ? 'border-black shadow-sm'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
