import { useEffect, useRef } from "react";

const sizes = [
  { size: "XS",  chest: 36, length: 26 },
  { size: "S",   chest: 38, length: 27 },
  { size: "M",   chest: 40, length: 28 },
  { size: "L",   chest: 42, length: 29 },
  { size: "XL",  chest: 44, length: 30 },
  { size: "XXL", chest: 46, length: 31 },
];

export default function SizeChart() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section id="sizes" ref={sectionRef} className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#fcc200" }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h2 className="reveal font-display text-brand-black"
            style={{ fontSize: "clamp(3rem,10vw,7rem)", lineHeight: 0.9 }}>
            FIND YOUR FIT 📐
          </h2>
          <p className="reveal reveal-delay-1 font-accent text-brand-black/70 mt-3 text-sm font-medium uppercase tracking-widest">
            Measure carefully before ordering to ensure the right fit.
          </p>
        </div>

        <div className="reveal reveal-delay-2 overflow-x-auto">
          <table className="w-full border-collapse" style={{ border: "3px solid #0D0D0D" }}>
            <thead>
              <tr style={{ backgroundColor: "#0D0D0D" }}>
                {["Size", "Chest (in)", "Length (in)", "Stock"].map((h) => (
                  <th key={h} className="font-display text-brand-yellow text-xl px-6 py-4 text-left"
                    style={{ border: "2px solid #0D0D0D", letterSpacing: "0.08em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((row, i) => (
                <tr key={row.size} style={{ backgroundColor: i % 2 === 0 ? "#fcc200" : "#f0b800" }}>
                  <td className="font-display text-brand-black text-2xl px-6 py-4" style={{ border: "2px solid #0D0D0D" }}>
                    {row.size}
                  </td>
                  <td className="font-accent text-brand-black font-semibold px-6 py-4" style={{ border: "2px solid #0D0D0D" }}>
                    {row.chest}"
                  </td>
                  <td className="font-accent text-brand-black font-semibold px-6 py-4" style={{ border: "2px solid #0D0D0D" }}>
                    {row.length}"
                  </td>
                  <td className="font-accent font-bold px-6 py-4" style={{ border: "2px solid #0D0D0D" }}>
                    <span className="inline-flex items-center gap-1.5 bg-brand-black text-brand-yellow font-bold text-xs px-3 py-1.5">
                      ✦ IN STOCK
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal reveal-delay-3 mt-6 flex flex-col gap-2">
          <p className="font-body text-brand-black/60 text-sm italic">📏 All measurements are in inches</p>
          <p className="font-body text-brand-black/60 text-sm italic">⚠️ ±1 inch variation is normal in manufacturing</p>
          <p className="font-body text-brand-black/80 text-sm font-semibold mt-1">Note: Our tees run slightly oversized. If between sizes, we recommend sizing down.</p>
        </div>
      </div>
    </section>
  );
}
