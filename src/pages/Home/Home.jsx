import React from "react";
import { Link } from "react-router-dom";
import { Calendar, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { toast } from "react-hot-toast";
import CTA from "./CTA";
import Testimonials from "./Testimonials";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { addToCart } = useCart();
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

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-white px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to Munchings
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Experience the finest culinary delights
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/book-table"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 text-xs rounded-lg transition flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Table
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/menu"
                  className="bg-white hover:bg-gray-100 text-amber-800 font-bold py-3 px-6 rounded-lg text-xs transition flex items-center justify-center"
                >
                  <UtensilsCrossed className="mr-2 h-5 w-5" />
                  View Menu
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light text-amber-800 mb-6 tracking-wide">
              Our Story
            </h2>
            <div className="w-16 h-0.5 bg-amber-600 mx-auto mb-12 opacity-50"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Founded in 2010, Savoria has been serving exquisite dishes made
              with the freshest ingredients. Our passion for culinary excellence
              and warm hospitality has made us a favorite dining destination.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm text-center group hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors duration-300">
                <UtensilsCrossed className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-medium text-amber-800 mb-4">
                Exquisite Cuisine
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our master chefs prepare dishes that blend traditional flavors
                with modern techniques.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm text-center group hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-amber-800 mb-4">
                Special Occasions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Make your celebrations memorable with our special event services
                and custom menus.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm text-center group hover:shadow-md transition-shadow duration-300"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-amber-800 mb-4">
                Friendly Service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our attentive staff is dedicated to providing you with an
                exceptional dining experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-amber-800 mb-6 tracking-tight">
              Featured Dishes
            </h2>
            <div className="w-32 h-1 bg-amber-600 mx-auto mb-8 opacity-60"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Discover our chef's special creations that have become customer
              favorites
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
              variants={fadeIn}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                  alt="Ribeye Steak"
                  className="w-full h-72 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent">
                <div className="absolute bottom-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Prime Ribeye Steak
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    Perfectly aged and grilled to your preference
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-2xl font-bold">
                      $32.99
                    </span>
                    <button
                      onClick={() => {
                        addToCart({
                          id: "ribeye-steak",
                          name: "Prime Ribeye Steak",
                          price: 32.99,
                          image:
                            "https://images.unsplash.com/photo-1544025162-d76694265947",
                        });
                        toast.success("Prime Ribeye Steak added to cart!");
                      }}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
              variants={fadeIn}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Seafood Pasta"
                  className="w-full h-72 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent">
                <div className="absolute bottom-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Seafood Linguine
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    Fresh pasta with premium seafood selection
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-2xl font-bold">
                      $28.99
                    </span>
                    <button
                      onClick={() => {
                        addToCart({
                          id: "seafood-linguine",
                          name: "Seafood Linguine",
                          price: 28.99,
                          image:
                            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
                        });
                        toast.success("Seafood Linguine added to cart!");
                      }}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
              variants={fadeIn}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                  alt="Chocolate Dessert"
                  className="w-full h-72 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent">
                <div className="absolute bottom-0 p-8 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Chocolate Lava Cake
                  </h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">
                    Warm chocolate cake with a molten center
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-2xl font-bold">
                      $12.99
                    </span>
                    <button
                      onClick={() => {
                        addToCart({
                          id: "chocolate-lava-cake",
                          name: "Chocolate Lava Cake",
                          price: 12.99,
                          image:
                            "https://images.unsplash.com/photo-1551024601-bec78aea704b",
                        });
                        toast.success("Chocolate Lava Cake added to cart!");
                      }}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 inline-flex items-center gap-2"
              >
                Explore Full Menu
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
      {/* CTA Section */}
      <CTA />
      <Toaster />
    </div>
  );
};

export default Home;
