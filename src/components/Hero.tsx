import kingNorthHero from "@/assets/king-north.jpeg";
import gothamHero from "@/assets/gotham-nights.jpeg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-brand-black flex items-center overflow-hidden pt-16"
    >
      {/* Background accent blobs */}
      <div className="absolute top-20 right-0 w-[50vw] h-[50vw] bg-brand-yellow/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] bg-brand-pink/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-orange/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-8 items-center py-16">
        {/* Left: text */}
        <div className="relative z-10">
          {/* Sticker badge */}
          <div
            className="absolute -top-8 -left-2 bg-brand-pink text-white font-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
            style={{ transform: "rotate(-8deg)", zIndex: 10 }}
          >
            🔥 NEW DROP
          </div>

          {/* Massive headline */}
          <h1 className="font-display leading-none select-none">
            <span
              className="animate-fade-up animate-fade-up-1 block text-stroke-yellow"
              style={{ fontSize: "clamp(5rem, 18vw, 16rem)", lineHeight: 0.9 }}
            >
              WEAR
            </span>
            <span
              className="animate-fade-up animate-fade-up-2 block text-brand-white"
              style={{ fontSize: "clamp(3.2rem, 11vw, 9rem)", lineHeight: 1 }}
            >
              THE Z ATTITUDE
            </span>
          </h1>

          {/* Punchy sub */}
          <p className="animate-fade-up animate-fade-up-3 mt-6 text-brand-white/70 font-accent text-sm sm:text-base uppercase tracking-[0.2em] font-medium">
            indian streetwear. no boring basics. no cap.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-fade-up-4 mt-8 flex flex-wrap gap-4">
            <a
              href="https://wa.me/917990407096?text=yo!%20i%20want%20to%20order%20from%20Z%20Tees%20%F0%9F%94%A5"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-accent font-bold text-sm rounded-sm border-2 border-green-400 uppercase tracking-widest"
            >
              order on whatsapp 💬
            </a>
            <a
              href="https://instagram.com/z_tees.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover flex items-center gap-2 px-6 py-3 text-white font-accent font-bold text-sm rounded-sm border-2 border-white/30 uppercase tracking-widest"
              style={{
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              dm us on ig 📲
            </a>
          </div>

          {/* Extra badges row */}
          <div className="animate-fade-up animate-fade-up-5 mt-8 flex flex-wrap gap-3">
            <span
              className="bg-brand-yellow text-brand-black font-accent font-bold text-xs px-4 py-2 rounded-full shadow"
              style={{ transform: "rotate(2deg)", display: "inline-block" }}
            >
              ₹399 ONWARDS
            </span>
            <span
              className="bg-brand-lime text-brand-black font-accent font-bold text-xs px-4 py-2 rounded-full shadow"
              style={{ transform: "rotate(-3deg)", display: "inline-block" }}
            >
              FREE DELIVERY 🚚
            </span>
            <span
              className="bg-brand-pink text-white font-accent font-bold text-xs px-4 py-2 rounded-full shadow"
              style={{ transform: "rotate(1.5deg)", display: "inline-block" }}
            >
              PAY VIA UPI ✓
            </span>
          </div>
        </div>

        {/* Right: product images stacked */}
        <div className="relative flex items-center justify-center animate-fade-up animate-fade-up-3">
          {/* Back card — King in the North */}
          <div
            className="absolute w-full max-w-xs aspect-[3/4] border-4 border-brand-pink overflow-hidden"
            style={{ transform: "rotate(-5deg) translate(-20px, 10px)", boxShadow: "6px 6px 0 #FF2D78", zIndex: 1 }}
          >
            <img src={kingNorthHero} alt="King in the North" className="w-full h-full object-cover" />
          </div>

          {/* Front card — Gotham Nights */}
          <div
            className="relative w-full max-w-xs aspect-[3/4] border-4 border-brand-yellow overflow-hidden"
            style={{ transform: "rotate(3deg)", boxShadow: "8px 8px 0 #FFE600", zIndex: 2 }}
          >
            <img src={gothamHero} alt="Gotham Nights" className="w-full h-full object-cover" />
            {/* LIMITED EDITION overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-brand-black/80 py-2 text-center">
              <span className="font-display text-brand-yellow text-sm tracking-widest">LIMITED EDITION</span>
            </div>
          </div>

          {/* Floating badge */}
          <div
            className="absolute top-2 right-2 bg-brand-orange text-white font-display text-base px-3 py-1.5 shadow-lg z-10"
            style={{ transform: "rotate(8deg)" }}
          >
            HOT 🔥
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-brand-yellow/50 font-accent text-xs uppercase tracking-widest">scroll</span>
        <div className="w-px h-8 bg-brand-yellow/30" />
      </div>
    </section>
  );
}
