import React from "react";
import { Link } from "react-router-dom";
import { Calendar, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
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
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-amber-800 mb-4">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Founded in 2010, Savoria has been serving exquisite dishes made
              with the freshest ingredients. Our passion for culinary excellence
              and warm hospitality has made us a favorite dining destination.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Exquisite Cuisine
              </h3>
              <p className="text-gray-600">
                Our master chefs prepare dishes that blend traditional flavors
                with modern techniques.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Special Occasions
              </h3>
              <p className="text-gray-600">
                Make your celebrations memorable with our special event services
                and custom menus.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md text-center"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <h3 className="text-xl font-semibold text-amber-800 mb-2">
                Friendly Service
              </h3>
              <p className="text-gray-600">
                Our attentive staff is dedicated to providing you with an
                exceptional dining experience.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-amber-800 mb-4">
              Featured Dishes
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover our chef's special creations that have become customer
              favorites.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt="Ribeye Steak"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  Prime Ribeye Steak
                </h3>
                <p className="text-gray-600 mb-4">
                  Perfectly aged and grilled to your preference, served with
                  roasted vegetables and truffle mashed potatoes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold text-lg">
                    $32.99
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      to="/menu"
                      className="text-amber-800 hover:text-amber-600 font-medium"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <img
                src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Seafood Pasta"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  Seafood Linguine
                </h3>
                <p className="text-gray-600 mb-4">
                  Fresh linguine pasta tossed with shrimp, scallops, and mussels
                  in a rich garlic white wine sauce.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold text-lg">
                    $28.99
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      to="/menu"
                      className="text-amber-800 hover:text-amber-600 font-medium"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
                alt="Chocolate Dessert"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-2">
                  Chocolate Lava Cake
                </h3>
                <p className="text-gray-600 mb-4">
                  Warm chocolate cake with a molten center, served with vanilla
                  bean ice cream and fresh berries.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600 font-bold text-lg">
                    $12.99
                  </span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      to="/menu"
                      className="text-amber-800 hover:text-amber-600 font-medium"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition inline-block"
              >
                View Full Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold text-amber-800 mb-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center mb-4">
                <div className="text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The food was absolutely amazing! The flavors were perfectly
                balanced, and the service was impeccable. Will definitely be
                coming back soon!"
              </p>
              <div className="font-semibold text-amber-800">
                - Sarah Johnson
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center mb-4">
                <div className="text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "We celebrated our anniversary here and couldn't have chosen a
                better place. The ambiance was romantic, and the chef's special
                was outstanding."
              </p>
              <div className="font-semibold text-amber-800">
                - Michael & Lisa Thompson
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="flex items-center mb-4">
                <div className="text-amber-500">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                  <span className="text-xl">☆</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The online booking system was so convenient, and our table was
                ready right on time. The seafood pasta was the best I've ever
                had!"
              </p>
              <div className="font-semibold text-amber-800">
                - David Rodriguez
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Experience Savoria?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Book your table now and enjoy an unforgettable dining experience
            with us.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/book-table"
                className="bg-white hover:bg-gray-100 text-amber-800 font-bold py-3 px-6 rounded-lg transition"
              >
                Reserve a Table
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/menu"
                className="bg-transparent hover:bg-amber-700 border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Browse Our Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
