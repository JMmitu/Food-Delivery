import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ShoppingCart, User, Menu, X, ChevronDown, LogOut, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

const LOCATIONS = [
  { group: "Bangladesh", cities: ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Comilla", "Narayanganj", "Gazipur", "Mymensingh", "Jessore", "Bogra"] },
  { group: "India", cities: ["Kolkata", "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"] },
  { group: "United States", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"] },
  { group: "United Kingdom", cities: ["London", "Manchester", "Birmingham", "Leeds"] },
  { group: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah"] },
];

const ALL_FOODS = [
  "Classic Smash Burger", "Margherita Pizza", "Dragon Roll Sushi", "Garden Fresh Salad",
  "Spicy Ramen Bowl", "Chocolate Lava Cake", "Grilled Chicken Wings", "Beef Tacos x3",
];
const ALL_RESTAURANTS = [
  "McDonald's", "Papa John's", "Tokyo Kitchen", "KFC", "Burger King", "Subway",
];

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const { user, logout, openModal } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState("Dhaka");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");

  const locationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) setLocationOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchFocused(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchResults = searchQuery.length > 1
    ? [
        ...ALL_FOODS.filter((f) => f.toLowerCase().includes(searchQuery.toLowerCase())).map((f) => ({ type: "food", label: f })),
        ...ALL_RESTAURANTS.filter((r) => r.toLowerCase().includes(searchQuery.toLowerCase())).map((r) => ({ type: "restaurant", label: r })),
      ]
    : [];

  const filteredLocations = LOCATIONS.map((g) => ({
    ...g,
    cities: locationFilter
      ? g.cities.filter((c) => c.toLowerCase().includes(locationFilter.toLowerCase()))
      : g.cities,
  })).filter((g) => g.cities.length > 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById("foods");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setSearchFocused(false);
    }
  };

  return (
    <nav className="bg-[#111827] text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" }); }}
            className="flex items-center gap-0.5 shrink-0 cursor-pointer">
            <span className="text-[#FF6B35] font-black text-2xl tracking-tight">Food</span>
            <span className="text-white font-black text-2xl tracking-tight">Express</span>
          </a>

          {/* Location + Search — desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl items-center gap-2">

            {/* Location dropdown */}
            <div ref={locationRef} className="relative shrink-0">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition rounded-xl px-3 py-2 text-sm whitespace-nowrap"
              >
                <MapPin size={14} className="text-[#FF6B35]" />
                <span className="max-w-[90px] truncate text-white/90">{location}</span>
                <ChevronDown size={12} className={`text-white/60 transition-transform ${locationOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
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
                    <div className="max-h-72 overflow-y-auto py-2">
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
                              {location === city && <span className="ml-auto text-[#FF6B35] text-xs">✓</span>}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search bar */}
            <div ref={searchRef} className="relative flex-1">
              <form onSubmit={handleSearch} className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm">
                <Search size={15} className="ml-3 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search food or restaurants..."
                  className="flex-1 px-3 py-2.5 text-gray-800 text-sm outline-none bg-transparent"
                />
                <button type="submit" className="bg-[#FF6B35] hover:bg-[#e85a24] transition text-white text-sm font-bold px-4 py-2.5">
                  Search
                </button>
              </form>

              {/* Search results dropdown */}
              <AnimatePresence>
                {searchFocused && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    {searchResults.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => { setSearchQuery(r.label); setSearchFocused(false); document.getElementById("foods")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition text-left"
                      >
                        <span className="text-lg">{r.type === "food" ? "🍽️" : "🏪"}</span>
                        <div>
                          <p className="text-gray-900 text-sm font-semibold">{r.label}</p>
                          <p className="text-gray-400 text-xs capitalize">{r.type}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
                {searchFocused && searchQuery.length > 1 && searchResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-5 text-center"
                  >
                    <p className="text-gray-400 text-sm">No results for "<strong className="text-gray-700">{searchQuery}</strong>"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 hover:bg-white/10 rounded-xl transition group"
            >
              <ShoppingCart size={20} className="group-hover:text-[#FF6B35] transition-colors" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Wishlist */}
            <button className="p-2.5 hover:bg-white/10 rounded-xl transition group">
              <Heart size={20} className="group-hover:text-[#FF6B35] transition-colors" />
            </button>

            {/* User menu / Sign In */}
            {user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition rounded-xl px-3 py-2"
                >
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-sm font-semibold max-w-[80px] truncate">{user.name}</span>
                  <ChevronDown size={14} className={`text-white/60 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-gray-900 font-bold text-sm">{user.name}</p>
                        <p className="text-gray-400 text-xs truncate">{user.email}</p>
                      </div>
                      {[
                        { icon: "👤", label: "My Profile" },
                        { icon: "📦", label: "My Orders" },
                        { icon: "❤️", label: "Wishlist" },
                        { icon: "📍", label: "Saved Addresses" },
                      ].map((item) => (
                        <button key={item.label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF6B35] transition">
                          <span>{item.icon}</span>
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                        >
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => openModal("login")}
                className="flex items-center gap-2 bg-[#FF6B35] hover:bg-[#e85a24] transition text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-[#FF6B35]/20"
              >
                <User size={15} />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-xl transition relative">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            {totalItems > 0 && !mobileOpen && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#1a2535] border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              <form onSubmit={handleSearch} className="flex items-center bg-white rounded-xl overflow-hidden">
                <Search size={15} className="ml-3 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search food or restaurants..."
                  className="flex-1 px-3 py-2.5 text-gray-800 text-sm outline-none"
                />
                <button type="submit" className="bg-[#FF6B35] text-white text-sm font-bold px-4 py-2.5">Go</button>
              </form>
              <div className="flex gap-2">
                <button
                  onClick={() => setLocationOpen(!locationOpen)}
                  className="flex items-center gap-1.5 text-sm text-white/80 bg-white/10 rounded-xl px-3 py-2"
                >
                  <MapPin size={14} className="text-[#FF6B35]" />
                  {location}
                </button>
                <button onClick={openCart} className="flex items-center gap-1.5 text-sm text-white/80 bg-white/10 rounded-xl px-3 py-2">
                  <ShoppingCart size={14} />
                  {totalItems > 0 && <span className="bg-[#FF6B35] text-white text-xs font-black rounded-full px-1.5">{totalItems}</span>}
                </button>
              </div>
              {user ? (
                <div className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                    <span className="text-sm font-semibold">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-red-400 text-xs font-semibold">Sign Out</button>
                </div>
              ) : (
                <button onClick={() => { openModal("login"); setMobileOpen(false); }} className="w-full bg-[#FF6B35] text-white text-sm font-bold py-2.5 rounded-xl flex items-center justify-center gap-2">
                  <User size={15} />
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
