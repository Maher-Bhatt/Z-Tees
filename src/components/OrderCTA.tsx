import { useEffect, useRef } from "react";
import { Instagram } from "lucide-react";

export default function OrderCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ backgroundColor: "#FFE600" }}
    >
      {/* Decorative noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2
          className="reveal font-display text-brand-black"
          style={{ fontSize: "clamp(4rem, 16vw, 13rem)", lineHeight: 0.88 }}
        >
          STOP SCROLLING.
        </h2>
        <h2
          className="reveal reveal-delay-1 font-display text-brand-black"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)", lineHeight: 0.9 }}
        >
          ORDER YOUR TEE.
        </h2>

        <p className="reveal reveal-delay-2 font-body text-brand-black/70 mt-6 text-base max-w-md mx-auto">
          you've been looking at this page long enough.
          you know you want it. just order.
        </p>

        <div className="reveal reveal-delay-3 mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/917990407096?text=yo!%20i%20want%20to%20order%20from%20Z%20Tees%20%F0%9F%94%A5"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover flex items-center gap-2 px-10 py-5 bg-green-500 text-white font-display text-2xl tracking-widest border-3 border-green-600"
            style={{ border: "3px solid #16a34a" }}
          >
            WHATSAPP 💬
          </a>
          <a
            href="https://instagram.com/z_tees.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover flex items-center gap-2 px-10 py-5 bg-brand-black text-brand-yellow font-display text-2xl tracking-widest"
            style={{ border: "3px solid #0D0D0D" }}
          >
            <Instagram size={24} />
            INSTAGRAM 📲
          </a>
        </div>

        <p className="reveal reveal-delay-4 mt-8 font-accent text-brand-black/50 text-xs">
          COD available. UPI preferred. DM to know more.
        </p>
      </div>
    </section>
  );
}
