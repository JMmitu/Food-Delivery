import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCart();
  const { user, openModal } = useAuth();

  const handleCheckout = () => {
    if (!user) { openModal("login"); return; }
    alert("Proceeding to checkout! (Payment integration coming soon)");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[91] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag size={18} className="text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-base">Your Cart</p>
                  <p className="text-gray-500 text-xs">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button onClick={clearCart} className="text-xs text-gray-400 hover:text-red-500 transition font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50">
                    Clear all
                  </button>
                )}
                <button onClick={closeCart} className="w-9 h-9 bg-gray-100 hover:bg-gray-200 transition rounded-full flex items-center justify-center text-gray-500">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-4xl">
                    🛒
                  </div>
                  <p className="text-gray-800 font-bold text-lg mb-1">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mb-5">Add some delicious food to get started!</p>
                  <button onClick={closeCart} className="bg-[#FF6B35] text-white font-bold px-6 py-2.5 rounded-xl hover:bg-[#e85a24] transition">
                    Browse Food
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-4 bg-gray-50 rounded-2xl p-3"
                    >
                      <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-bold text-sm leading-snug truncate">{item.name}</p>
                        <p className="text-gray-400 text-xs mb-2">{item.restaurant}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[#FF6B35] font-black text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#FF6B35] hover:text-[#FF6B35] transition"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-gray-900 font-bold text-sm w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 bg-[#FF6B35] rounded-lg flex items-center justify-center text-white hover:bg-[#e85a24] transition"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-red-300 hover:text-red-500 transition ml-1"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery fee</span>
                    <span className="text-[#22C55E] font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-bold border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span className="text-[#FF6B35] text-base">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#FF6B35] hover:bg-[#e85a24] transition text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/25"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
                <p className="text-center text-xs text-gray-400">Secure checkout · Free cancellation</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
