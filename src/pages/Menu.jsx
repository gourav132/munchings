import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { subscribeToMenu } from "../services/firestore";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, setTableNumber, cart } = useCart();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    if (tableNumber) {
      setTableNumber(tableNumber);
    }
  }, [tableNumber, setTableNumber]);

  useEffect(() => {
    const unsubscribe = subscribeToMenu((items) => {
      setMenuItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = [
    "all",
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item) => {
    if (tableNumber) {
      addToCart(item);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Our Menu</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore our carefully crafted menu featuring the finest ingredients
            and flavors. Add your favorite dishes to your cart for dine-in
            ordering.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full capitalize ${
                activeCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loading ? (
              // Skeleton Loading Animation
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-full h-64 bg-gray-200 animate-pulse" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      {tableNumber && (
                        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  layout
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-amber-800">
                        {item.name}
                      </h3>
                      <span className="text-amber-600 font-bold text-lg">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm font-semibold mb-4">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold py-0.5 text-white capitalize bg-amber-400 px-2 rounded-full">
                        {item.category}
                      </span>
                      {tableNumber && (
                        <motion.button
                          onClick={() => handleAddToCart(item)}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center transition text-xs font-semibold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Order
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <Toaster />
      {tableNumber && (
        <motion.button
          onClick={() => navigate(`/cart/${tableNumber}`)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-20 bg-amber-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-700 transition-colors z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              className="absolute -top-2 -right-2 bg-white text-amber-800 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default Menu;
