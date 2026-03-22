import { useEffect, useRef } from "react";

const features = [
  {
    icon: "🎨",
    title: "Real Designs",
    desc: "not AI generated. not stolen. actually original.",
    borderColor: "#FF2D78",
    rotate: "-1deg",
  },
  {
    icon: "🧵",
    title: "Quality That Lasts",
    desc: "wash it 50 times. still hits.",
    borderColor: "#FFE600",
    rotate: "1deg",
  },
  {
    icon: "⚡",
    title: "Order In 2 Minutes",
    desc: "whatsapp. done. no forms. no login.",
    borderColor: "#CCFF00",
    rotate: "-1deg",
  },
  {
    icon: "💸",
    title: "Fair Price",
    desc: "₹399 for premium quality. do the math.",
    borderColor: "#FF6B00",
    rotate: "1deg",
  },
];

export default function WhyZTees() {
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
      className="bg-brand-black py-20 px-4 sm:px-6 border-t-2 border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2
            className="reveal font-display text-brand-white"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.9 }}
          >
            WHY US THO? 🤔
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal reveal-delay-${i + 1} bg-card p-8 border-2 border-white/10`}
              style={{
                borderLeft: `5px solid ${f.borderColor}`,
                transform: `rotate(${f.rotate})`,
                boxShadow: `3px 3px 0 ${f.borderColor}30`,
              }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-display text-brand-white text-3xl mb-2 tracking-wide">
                {f.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
