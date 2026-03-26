import { Instagram } from "lucide-react";
import { Truck, Package, CreditCard } from "lucide-react";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const navLinks = [
    { label: "Collection", href: "#collection" },
    { label: "Sizes", href: "#sizes" },
    { label: "How to Order", href: "#how-to-order" },
    { label: "Instagram", href: "https://instagram.com/z_tees.in", external: true },
    { label: "WhatsApp", href: "https://wa.me/917990407096?text=Hi!%20I%20would%20like%20to%20place%20an%20order%20from%20Z%20Tees.", external: true },
  ];

  return (
    <footer className="bg-brand-black border-t-[3px] border-brand-yellow pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          <div>
            <div className="font-display text-brand-yellow leading-none" style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}>
              Z TEES
            </div>
            <p className="font-accent text-muted-foreground text-sm mt-2 uppercase tracking-widest">
              Wear The Z Attitude
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/z_tees.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/917990407096?text=Hi!%20I%20would%20like%20to%20place%20an%20order%20from%20Z%20Tees."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="font-accent text-sm text-muted-foreground hover:text-brand-yellow transition-colors uppercase tracking-widest"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border border-brand-yellow/30 p-4 mb-8 flex flex-col sm:flex-row gap-3 sm:gap-8 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-brand-yellow flex-shrink-0" />
            <div>
              <p className="font-accent font-bold text-brand-yellow text-sm">Free Delivery in Gujarat</p>
              <p className="font-body text-muted-foreground text-xs">All orders within Gujarat ship free.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package size={16} className="text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-accent font-bold text-brand-white text-sm">Outside Gujarat</p>
              <p className="font-body text-muted-foreground text-xs">Shipping charges apply based on state.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-brand-yellow flex-shrink-0" />
            <div>
              <p className="font-accent font-bold text-brand-yellow text-sm">Secure UPI Payments</p>
              <p className="font-body text-muted-foreground text-xs">GPay, PhonePe, and Paytm accepted.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="font-body text-muted-foreground text-sm text-center">
            © 2025 Z Tees. Designed and Made in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
