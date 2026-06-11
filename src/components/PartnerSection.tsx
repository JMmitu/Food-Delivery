import { motion } from "motion/react";

export function PartnerSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Partner with us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden h-56 bg-[#2F4858] group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop&auto=format"
              alt="Restaurant kitchen"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2F4858] via-[#2F4858]/80 to-transparent" />
            <div className="relative p-8 h-full flex flex-col justify-center">
              <span className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase mb-2">For Restaurants</span>
              <h3 className="text-white font-black text-2xl mb-2">Partner with us</h3>
              <p className="text-gray-300 text-sm mb-5 max-w-xs">
                Grow your restaurant business. Reach thousands of new customers every day.
              </p>
              <button className="self-start bg-[#FF6B35] hover:bg-[#e85a24] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                Get Started →
              </button>
            </div>
          </motion.div>

          {/* Ride with us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden h-56 bg-[#111827] group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&auto=format"
              alt="Delivery rider"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent" />
            <div className="relative p-8 h-full flex flex-col justify-center">
              <span className="text-[#FF6B35] text-xs font-bold tracking-widest uppercase mb-2">For Riders</span>
              <h3 className="text-white font-black text-2xl mb-2">Ride with us</h3>
              <p className="text-gray-300 text-sm mb-5 max-w-xs">
                Earn money on your schedule. Join our delivery fleet and set your own hours.
              </p>
              <button className="self-start bg-[#FF6B35] hover:bg-[#e85a24] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                Start Earning →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
