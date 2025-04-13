import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-amber-600 to-amber-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-4xl font-light tracking-tight mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Ready to Experience Savoria?
        </motion.h2>
        <motion.p
          className="text-lg font-light mb-12 max-w-2xl mx-auto opacity-90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Book your table now and enjoy an unforgettable dining experience with
          us.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/book-table"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-amber-800 font-medium py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
            >
              Reserve a Table
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 border border-white/30 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm min-w-[200px]"
            >
              Browse Our Menu
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-700/20 to-transparent pointer-events-none"></div>
    </section>
  );
}
