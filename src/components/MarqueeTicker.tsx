export default function MarqueeTicker() {
  const ticker1 = "Z TEES ✦ WEAR THE Z ATTITUDE ✦ PREMIUM QUALITY ✦ ORDER NOW ✦ ";
  const ticker2 = "FREE DELIVERY ✦ PAY VIA UPI ✦ DM ON INSTA ✦ NEW DROPS WEEKLY ✦ ";

  return (
    <div className="overflow-hidden">
      {/* Ticker 1 — Yellow bg, black text, scrolls left */}
      <div className="bg-brand-yellow py-3 overflow-hidden border-y-2 border-brand-black">
        <div className="flex whitespace-nowrap animate-marquee-left">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-display text-2xl sm:text-3xl text-brand-black tracking-[0.12em] pr-4"
            >
              {ticker1}
            </span>
          ))}
        </div>
      </div>

      {/* Ticker 2 — Black bg, yellow text, scrolls right */}
      <div className="bg-brand-black py-3 overflow-hidden border-b-2 border-brand-yellow">
        <div className="flex whitespace-nowrap animate-marquee-right">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-display text-2xl sm:text-3xl text-brand-yellow tracking-[0.12em] pr-4"
            >
              {ticker2}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
