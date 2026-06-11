import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import { Navbar } from "./components/Navbar";
import { SectionNavBar } from "./components/SectionNavBar";
import { HeroSection } from "./components/HeroSection";
import { DealsSection } from "./components/DealsSection";
import { CategoriesSection } from "./components/CategoriesSection";
import { PopularFoodsSection } from "./components/PopularFoodsSection";
import { RestaurantsSection } from "./components/RestaurantsSection";
import { AppPromoSection } from "./components/AppPromoSection";
import { PartnerSection } from "./components/PartnerSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { StatsSection } from "./components/StatsSection";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { AuthModal } from "./components/AuthModal";

function AppContent() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Section navigation bar */}
      <SectionNavBar />

      {/* Page sections — each has an id for scroll navigation */}
      <HeroSection />

      <div id="deals" className="scroll-mt-28">
        <DealsSection />
      </div>

      <div id="categories" className="scroll-mt-28">
        <CategoriesSection />
      </div>

      {/* Foods section has id="foods" inside component */}
      <PopularFoodsSection />

      {/* Restaurants section has id="restaurants" inside component */}
      <RestaurantsSection />

      <div id="app-promo" className="scroll-mt-28">
        <AppPromoSection />
      </div>

      <div id="partner" className="scroll-mt-28">
        <PartnerSection />
      </div>

      <TestimonialsSection />
      <StatsSection />
      <Footer />

      {/* Global overlays */}
      <CartDrawer />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
