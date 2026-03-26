import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Choose Your Fit",
    desc: "Browse our collection and select your preferred design and size.",
    color: "#FFE600",
    textColor: "#0D0D0D",
  },
  {
    num: "02",
    title: "Contact Us",
    desc: "Send us a message on WhatsApp or Instagram with your product, size, and delivery address.",
    color: "#FF2D78",
    textColor: "#FAFAFA",
  },
  {
    num: "03",
    title: "Fast Delivery",
    desc: "Complete your payment via UPI. We pack and dispatch your order promptly.",
    color: "#CCFF00",
    textColor: "#0D0D0D",
  },
];

export default function HowToOrder() {
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
    <section id="how-to-order" ref={sectionRef} className="bg-brand-black py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h2
            className="reveal font-display text-brand-white"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)", lineHeight: 0.9 }}
          >
            HOW TO ORDER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${i + 1} relative overflow-hidden border-2 border-brand-black p-8`}
              style={{ background: step.color, boxShadow: "4px 4px 0 #0D0D0D" }}
            >
              <div
                className="absolute -right-4 -bottom-6 font-display leading-none select-none pointer-events-none"
                style={{ fontSize: "clamp(7rem, 18vw, 12rem)", color: "rgba(0,0,0,0.08)" }}
              >
                {step.num}
              </div>
              <span
                className="font-accent font-bold text-xs uppercase tracking-widest opacity-70"
                style={{ color: step.textColor }}
              >
                Step {step.num}
              </span>
              <h3
                className="font-display mt-3 mb-4"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: step.textColor, lineHeight: 1.1 }}
              >
                {step.title}
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: step.textColor, opacity: 0.85 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
