import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold text-amber-800 mb-6 tracking-tight">
            What Our Guests Say
          </h2>
          <div className="w-32 h-1 bg-amber-600 mx-auto mb-8 opacity-60"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
          >
            <div className="flex items-center mb-6">
              <div className="text-amber-500 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              "The food was absolutely amazing! The flavors were perfectly
              balanced, and the service was impeccable. Will definitely be
              coming back soon!"
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl mr-4">
                SJ
              </div>
              <div>
                <div className="font-bold text-amber-800 text-lg">
                  Sarah Johnson
                </div>
                <div className="text-gray-500 text-sm">Regular Customer</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
          >
            <div className="flex items-center mb-6">
              <div className="text-amber-500 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              "We celebrated our anniversary here and couldn't have chosen a
              better place. The ambiance was romantic, and the chef's special
              was outstanding."
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl mr-4">
                MT
              </div>
              <div>
                <div className="font-bold text-amber-800 text-lg">
                  Michael & Lisa
                </div>
                <div className="text-gray-500 text-sm">
                  Anniversary Celebration
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            variants={fadeIn}
          >
            <div className="flex items-center mb-6">
              <div className="text-amber-500 flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl"
                  >
                    ★
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-gray-300"
                >
                  ★
                </motion.span>
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              "The online booking system was so convenient, and our table was
              ready right on time. The seafood pasta was the best I've ever
              had!"
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl mr-4">
                DR
              </div>
              <div>
                <div className="font-bold text-amber-800 text-lg">
                  David Rodriguez
                </div>
                <div className="text-gray-500 text-sm">First-time Visitor</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
