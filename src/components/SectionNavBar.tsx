import { useState, useEffect } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "deals", label: "Offers" },
  { id: "categories", label: "Categories" },
  { id: "foods", label: "Popular Foods" },
  { id: "restaurants", label: "Restaurants" },
  { id: "app-promo", label: "Mobile App" },
  { id: "partner", label: "Partner With Us" },
];

export function SectionNavBar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`relative shrink-0 px-4 py-3.5 text-sm font-semibold transition-colors whitespace-nowrap ${
                active === s.id ? "text-[#FF6B35]" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {s.label}
              {active === s.id && (
                <motion.div
                  layoutId="section-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
