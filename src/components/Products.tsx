import { useEffect, useRef, useState } from "react";
import { Instagram, X, Truck, Package, Star } from "lucide-react";

import shinchanVibes from "@/assets/shinchan-vibes.jpeg";
import peaceOut from "@/assets/peace-out.jpeg";
import gangWalk from "@/assets/gang-walk.jpeg";
import kingNorth from "@/assets/king-north.jpeg";
import wowCats from "@/assets/wow-cats.jpeg";
import gothamNights from "@/assets/gotham-nights.jpeg";
import painTee from "@/assets/pain-tee.jpeg";
import gojoTee from "@/assets/gojo-tee.jpeg";

const WA_BASE = "https://wa.me/917990407096?text=";
const IG_LINK = "https://instagram.com/z_tees.in";
const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export type Product = {
  id: number; name: string; color: string; desc: string; fullDesc: string;
  price: string; badge: string; badgeColor: string; badgeTextColor?: string;
  badgeBorder?: string; image: string; fabric: string; fit: string; highlight: string;
};

const products: Product[] = [
  { id: 1, name: "SHINCHAN VIBES", color: "Navy Blue",
    desc: "Bold character print on premium navy cotton. A conversation starter.",
    fullDesc: "A bold Shinchan character print on premium navy blue cotton. Clean graphic placement with the words Choose Peace, Love Yourself, Be Happy. A relaxed, everyday tee with personality.",
    price: "₹419", badge: "Popular", badgeColor: "#FF6B00", image: shinchanVibes,
    fabric: "100% Premium Cotton", fit: "Regular Fit", highlight: "Choose Peace · Love Yourself · Be Happy" },
  { id: 2, name: "PEACE OUT", color: "Black",
    desc: "Back-print graphic featuring a white dove, red rose, and bold Peace typography.",
    fullDesc: "A back-print design featuring a white dove in flight, a red rose, and bold PEACE typography. Clean on the front, expressive on the back. Printed on premium black cotton.",
    price: "₹419", badge: "Best Seller", badgeColor: "#FFE600", badgeTextColor: "#0D0D0D",
    image: peaceOut, fabric: "100% Premium Cotton", fit: "Oversized Fit", highlight: "Enjoy The Wind · Effort Always Pays Off" },
  { id: 3, name: "STRANGER THINGS", color: "Chocolate Brown",
    desc: "All eight Stranger Things characters, illustrated in a single line across rich chocolate brown cotton.",
    fullDesc: "All eight Stranger Things characters illustrated side by side in their signature looks. A clean, minimalist graphic printed on rich chocolate brown cotton. For fans who appreciate subtle references.",
    price: "₹439", badge: "Fan Favourite", badgeColor: "#CCFF00", badgeTextColor: "#0D0D0D",
    image: gangWalk, fabric: "100% Premium Cotton", fit: "Regular Fit", highlight: "Friends Don't Lie." },
  { id: 4, name: "KING IN THE NORTH", color: "Cream / Off-White",
    desc: "Front graphic print with bold King in the North typography on cream cotton.",
    fullDesc: "A detailed front graphic of a warrior holding a sword, paired with bold King in the North typography. Printed on cream off-white cotton. A clean, statement piece for fans of the series.",
    price: "₹399", badge: "Fan Favourite", badgeColor: "#FF2D78",
    image: kingNorth, fabric: "100% Premium Cotton", fit: "Regular Fit", highlight: "The North Remembers." },
  { id: 5, name: "WOW CATS", color: "Dusty Pink",
    desc: "Stacked cartoon cat illustration with a side placement print on soft dusty pink cotton.",
    fullDesc: "Three stacked cartoon cats printed on the side of a dusty pink tee, with WOW!! and Hi typography integrated into the design. A fun, expressive piece on soft premium cotton.",
    price: "₹419", badge: "Customer Favourite", badgeColor: "#FF2D78",
    image: wowCats, fabric: "100% Premium Cotton", fit: "Regular Fit", highlight: "A fun, expressive design for everyday wear." },
  { id: 6, name: "GOTHAM NIGHTS", color: "Black",
    desc: "The Batman symbol with Gothams skyline detailed inside. Limited edition release.",
    fullDesc: "The iconic bat symbol with Gotham's city skyline etched inside. Printed on premium black cotton. A clean, refined graphic with no excess. This is a limited edition release and will not be restocked.",
    price: "₹409", badge: "Limited Edition", badgeColor: "#0D0D0D",
    badgeTextColor: "#FFE600", badgeBorder: "#FFE600",
    image: gothamNights, fabric: "100% Premium Cotton", fit: "Oversized Fit", highlight: "Limited edition. Will not be restocked once sold out." },
  { id: 7, name: "KNOW PAIN", color: "White",
    desc: "Manga-style panel print with Japanese kanji and bold editorial typography on white cotton.",
    fullDesc: "A manga-style graphic panel featuring Japanese kanji and the phrase This World Shall Know Pain. A detailed, dramatic print on premium white cotton. A tribute to one of anime's most iconic story arcs.",
    price: "₹409", badge: "Anime Collection", badgeColor: "#8B00FF",
    image: painTee, fabric: "100% Premium Cotton", fit: "Regular Fit", highlight: "A tribute to one of anime's most defining story arcs." },
  { id: 8, name: "GOJO SATORU", color: "Black",
    desc: "Back-print Gojo Satoru graphic in bold anime art style. Reverse Curse Technique typography.",
    fullDesc: "A bold back-print graphic of Gojo Satoru from Jujutsu Kaisen, featuring red slash accents and Reverse Curse Technique typography in kanji. A striking anime-inspired design on premium black cotton.",
    price: "₹409", badge: "Back Print", badgeColor: "#FF2D78",
    image: gojoTee, fabric: "100% Premium Cotton", fit: "Oversized Fit", highlight: "An iconic quote from Jujutsu Kaisen." },
];

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const waMsg = encodeURIComponent(`Hi! I'd like to order ${product.name} from Z Tees. Please share availability and payment details. Thank you!`);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-3xl bg-card border-2 border-brand-yellow overflow-hidden"
        style={{ boxShadow: "8px 8px 0 #FFE600", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-brand-black border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-black transition-colors">
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-secondary border-b-2 md:border-b-0 md:border-r-2 border-brand-yellow overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 font-accent font-bold text-xs px-3 py-1.5 rounded-full"
              style={{ background: product.badgeColor, color: product.badgeTextColor || "#FAFAFA",
                border: product.badgeBorder ? `1.5px solid ${product.badgeBorder}` : "none", transform: "rotate(-4deg)" }}>
              {product.badge}
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div>
              <p className="font-accent text-xs text-brand-yellow uppercase tracking-widest mb-1">{product.color}</p>
              <h2 className="font-display text-brand-white leading-none" style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)" }}>
                {product.name}
              </h2>
              <p className="font-body text-muted-foreground text-sm mt-2 leading-relaxed">{product.fullDesc}</p>
            </div>
            <div className="border-l-4 border-brand-yellow pl-3">
              <p className="font-accent text-brand-yellow text-xs italic">"{product.highlight}"</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary p-3 border border-white/10">
                <p className="font-accent text-xs text-muted-foreground uppercase tracking-widest mb-1">Fabric</p>
                <p className="font-accent font-bold text-brand-white text-sm">{product.fabric}</p>
              </div>
              <div className="bg-secondary p-3 border border-white/10">
                <p className="font-accent text-xs text-muted-foreground uppercase tracking-widest mb-1">Fit</p>
                <p className="font-accent font-bold text-brand-white text-sm">{product.fit}</p>
              </div>
            </div>
            <div>
              <p className="font-accent text-xs text-muted-foreground uppercase tracking-widest mb-2">Available Sizes</p>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((s) => (
                  <span key={s} className="font-accent text-xs font-bold px-3 py-1.5 border-2 border-brand-yellow text-brand-yellow">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-secondary border border-white/10 p-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-brand-yellow flex-shrink-0" />
                <p className="font-accent text-xs font-bold text-brand-yellow">🎉 Free Delivery in Gujarat</p>
              </div>
              <div className="flex items-center gap-2">
                <Package size={14} className="text-muted-foreground flex-shrink-0" />
                <p className="font-accent text-xs text-muted-foreground">Outside Gujarat — Shipping charges as per state</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
              <div className="font-display text-brand-yellow" style={{ fontSize: "2.5rem", lineHeight: 1 }}>{product.price}</div>
              <div className="flex gap-2">
                <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
                  className="btn-hover flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white font-accent font-bold text-xs uppercase tracking-wider hover:bg-green-600 border-2 border-green-500 transition-colors">
                  WhatsApp 💬
                </a>
                <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                  className="btn-hover w-10 flex items-center justify-center"
                  style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                  <Instagram size={16} className="text-white" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {["Premium Quality", "Secure UPI Payment", "Accurate Product Images", "Fast Dispatch"].map((t) => (
                <span key={t} className="flex items-center gap-1 font-accent text-xs text-muted-foreground">
                  <Star size={10} className="text-brand-yellow fill-brand-yellow" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const waMsg = encodeURIComponent(`Hi! I'd like to order ${product.name} from Z Tees. Please share availability and payment details. Thank you!`);
  return (
    <div className="product-card bg-card border-2 border-brand-black relative flex flex-col cursor-pointer group"
      style={{ boxShadow: "4px 4px 0 #0D0D0D" }} onClick={onClick}>
      <div className="absolute top-3 left-3 z-10 font-accent font-bold text-xs px-3 py-1.5 rounded-full shadow"
        style={{ background: product.badgeColor, color: product.badgeTextColor || "#FAFAFA",
          border: product.badgeBorder ? `1.5px solid ${product.badgeBorder}` : "none", transform: "rotate(-5deg)" }}>
        {product.badge}
      </div>
      <div className="absolute top-3 right-3 z-10 bg-brand-black/75 text-brand-yellow font-accent text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        View Details
      </div>
      <div className="aspect-square overflow-hidden bg-secondary border-b-2 border-brand-black">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="font-accent text-xs text-muted-foreground uppercase tracking-widest">{product.color}</p>
          <h3 className="font-display text-2xl text-foreground mt-0.5 leading-tight">{product.name}</h3>
          <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">{product.desc}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SIZES.map((s) => (
            <span key={s} className="font-accent text-xs font-bold px-2.5 py-1 border-2 border-brand-yellow text-brand-yellow">{s}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <Truck size={11} className="text-brand-yellow" />
          <span className="font-accent text-[11px] text-brand-yellow font-bold">Gujarat: Free Delivery  ·  Others: Charges Apply</span>
        </div>
        <div className="font-display text-4xl text-brand-yellow leading-none">{product.price}</div>
        <div className="flex gap-2 mt-auto pt-2" onClick={(e) => e.stopPropagation()}>
          <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noopener noreferrer"
            className="btn-hover flex-1 py-2.5 text-center bg-green-500 text-white font-accent font-bold text-xs border-2 border-green-500 uppercase tracking-wider hover:bg-green-600 transition-colors">
            WhatsApp 💬
          </a>
          <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
            className="btn-hover w-12 flex items-center justify-center"
            style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
            <Instagram size={16} className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="collection" ref={sectionRef} className="bg-background py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="reveal font-accent text-sm font-bold text-brand-yellow uppercase tracking-[0.3em]">The Collection</span>
            <h2 className="reveal reveal-delay-1 font-display text-brand-white mt-1"
              style={{ fontSize: "clamp(4rem,12vw,9rem)", lineHeight: 0.9 }}>Our Latest Arrivals</h2>
            <p className="reveal reveal-delay-2 font-body text-muted-foreground mt-3 text-sm">
              All products are photographed accurately. Click any item to view full details.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}>
                <ProductCard product={p} onClick={() => setActiveProduct(p)} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />}
    </>
  );
}
