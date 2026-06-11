import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, Star, Clock, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const LOCATIONS = [
  { group: "Bangladesh", cities: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Comilla", "Narayanganj", "Gazipur", "Mymensingh", "Jessore", "Bogra"] },
  { group: "India", cities: ["Kolkata", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"] },
  { group: "United States", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"] },
  { group: "United Kingdom", cities: ["London", "Manchester", "Birmingham", "Leeds"] },
  { group: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah"] },
];

const ALL_FOODS = [
  "Classic Smash Burger", "Margherita Pizza", "Dragon Roll Sushi", "Garden Fresh Salad",
  "Spicy Ramen Bowl", "Chocolate Lava Cake", "Grilled Chicken Wings", "Beef Tacos",
];
const ALL_RESTAURANTS = [
  "McDonald's", "Papa John's", "Tokyo Kitchen", "KFC", "Burger King", "Subway",
];

export function HeroSection() {
  const [location, setLocation] = useState("Dhaka");
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setLocationOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredLocations = LOCATIONS.map((g) => ({
    ...g,
    cities: locationFilter ? g.cities.filter((c) => c.toLowerCase().includes(locationFilter.toLowerCase())) : g.cities,
  })).filter((g) => g.cities.length > 0);

  const searchResults = searchQuery.length > 1
    ? [
        ...ALL_FOODS.filter((f) => f.toLowerCase().includes(searchQuery.toLowerCase())).map((f) => ({ type: "food" as const, label: f })),
        ...ALL_RESTAURANTS.filter((r) => r.toLowerCase().includes(searchQuery.toLowerCase())).map((r) => ({ type: "restaurant" as const, label: r })),
      ]
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    document.getElementById("foods")?.scrollIntoView({ behavior: "smooth" });
    setSearchFocused(false);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0d1117]">
      {/* Full-bleed hero image with parallax overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&h=1000&fit=crop&auto=format&q=90"
          alt="Delicious food spread"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Multi-layer gradient — darker on left for text legibility, subtle warm glow on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-[#0d1117]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
      </div>

      {/* Floating food cards — right side decorative */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
        {[
          { img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=180&h=130&fit=crop&auto=format", name: "Smash Burger", price: "$12.99", rating: "4.8" },
          { img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=180&h=130&fit=crop&auto=format", name: "Margherita Pizza", price: "$15.49", rating: "4.7" },
          { img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=180&h=130&fit=crop&auto=format", name: "Dragon Roll", price: "$18.99", rating: "4.9" },
        ].map((card, i) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden w-52 shadow-2xl"
          >
            <img src={card.img} alt={card.name} className="w-full h-28 object-cover" />
            <div className="px-3 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">{card.name}</p>
                <p className="text-[#FF6B35] font-black text-sm">{card.price}</p>
              </div>
              <span className="flex items-center gap-1 bg-amber-400/20 text-amber-300 text-xs font-bold px-2 py-1 rounded-lg">
                <Star size={10} className="fill-amber-300 text-amber-300" />
                {card.rating}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#FF6B35]/20 border border-[#FF6B35]/30 text-[#FF6B35] text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-[#FF6B35] rounded-full animate-pulse" />
            🚀 Fast Delivery · 30 min or FREE
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white font-black leading-[1.1] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            Feast Your
            <br />
            <span className="text-[#FF6B35]">Senses,</span>
            <br />
            Fast &amp; Fresh
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 text-lg mb-8 leading-relaxed max-w-lg"
          >
            Order from hundreds of restaurants near you. Hot meals delivered to your door in under 30 minutes.
          </motion.p>

          {/* Search form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            {/* Location picker */}
            <div ref={locationRef} className="relative shrink-0">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl px-4 py-3.5 text-sm font-semibold w-full sm:w-auto whitespace-nowrap transition"
              >
                <MapPin size={16} className="text-[#FF6B35]" />
                <span className="max-w-[120px] truncate">{location}</span>
                <ChevronDown size={14} className={`text-white/60 transition-transform ml-auto ${locationOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 gap-2">
                        <Search size={14} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search city..."
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="flex-1 text-sm text-gray-800 bg-transparent outline-none"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto py-2">
                      {filteredLocations.map((group) => (
                        <div key={group.group}>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-1.5">{group.group}</p>
                          {group.cities.map((city) => (
                            <button
                              key={city}
                              onClick={() => { setLocation(city); setLocationOpen(false); setLocationFilter(""); }}
                              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-orange-50 transition text-left ${location === city ? "text-[#FF6B35] font-semibold" : "text-gray-700"}`}
                            >
                              <MapPin size={13} className={location === city ? "text-[#FF6B35]" : "text-gray-300"} />
                              {city}
                              {location === city && <span className="ml-auto text-[#FF6B35]">✓</span>}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search input */}
            <div ref={searchRef} className="relative flex-1">
              <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <Search size={16} className="ml-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search food, restaurants, cuisines..."
                  className="flex-1 px-3 py-3.5 text-gray-800 text-sm outline-none bg-transparent"
                />
                <button type="submit" className="bg-[#FF6B35] hover:bg-[#e85a24] active:scale-95 transition-all text-white font-bold px-5 py-3.5 shrink-0">
                  Find Food
                </button>
              </form>

              <AnimatePresence>
                {searchFocused && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {searchResults.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => { setSearchQuery(r.label); setSearchFocused(false); document.getElementById("foods")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition text-left border-b border-gray-50 last:border-0"
                      >
                        <span className="text-xl">{r.type === "food" ? "🍽️" : "🏪"}</span>
                        <div>
                          <p className="text-gray-900 text-sm font-semibold">{r.label}</p>
                          <p className="text-gray-400 text-xs capitalize">{r.type}</p>
                        </div>
                        <Search size={14} className="ml-auto text-gray-300" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: <Clock size={15} />, label: "30 Min Delivery" },
              { icon: <Star size={15} />, label: "4.9★ Rated App" },
              { icon: <Shield size={15} />, label: "Safe & Secure" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-[#FF6B35]">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 50 C480 10 960 10 1440 50 L1440 50 L0 50Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>
  );
}
