import { useEffect, useRef } from "react";
import { Instagram } from "lucide-react";

const pillars = [
  { icon: "▶", title: "Reels", desc: "Styling videos, new arrivals, and outfit inspiration.", color: "#FF6B00" },
  { icon: "◈", title: "Behind the Scenes", desc: "A closer look at how we pack orders and craft every tee.", color: "#FF2D78" },
  { icon: "◆", title: "Customer Styles", desc: "Real customers. Real outfits. Authentic and unfiltered.", color: "#FFE600", textColor: "#0D0D0D" },
];

export default function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-20 px-4 sm:px-6 border-t-2 border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2
            className="reveal font-display text-brand-white"
            style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)", lineHeight: 0.9 }}
          >
            FOLLOW US ON INSTAGRAM
          </h2>
          <p className="reveal reveal-delay-1 font-body text-muted-foreground mt-3 text-sm max-w-md">
            Stay updated with new arrivals, behind-the-scenes content, and customer styles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-delay-${i + 1} border-2 border-white/20 p-8`}
              style={{ boxShadow: "4px 4px 0 rgba(255,255,255,0.08)" }}
            >
              <div
                className="font-display text-3xl mb-4 w-14 h-14 flex items-center justify-center text-white"
                style={{ background: p.color, color: p.textColor || "#FAFAFA" }}
              >
                {p.icon}
              </div>
              <h3 className="font-display text-2xl text-brand-white mb-2" style={{ letterSpacing: "0.05em" }}>
                {p.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-4 border-2 border-white/10 p-6 mb-10 text-center">
          <p className="font-accent text-muted-foreground text-xs uppercase tracking-widest">
            Instagram feed — coming soon
          </p>
        </div>

        <div className="reveal reveal-delay-4 flex justify-center">
          <a
            href="https://instagram.com/z_tees.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover flex items-center gap-3 px-10 py-4 text-white font-display text-2xl tracking-widest"
            style={{
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              border: "3px solid transparent",
            }}
          >
            <Instagram size={24} />
            Follow @z_tees.in
          </a>
        </div>
      </div>
    </section>
  );
}
