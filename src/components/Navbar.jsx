import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Menu, X, ShoppingCart, Utensils } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  // const tableNumber = location.pathname.startsWith("/menu/")
  //   ? location.pathname.split("/menu/")[1]
  //   : null;

  const tableNumber = location.pathname.match(/\/(?:menu|cart)\/(\d+)/)?.[1];

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  console.log("table number logging from navbar", tableNumber);

  return (
    <nav className="bg-amber-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ rotate: 20 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Utensils className="h-8 w-8 mr-2" />
              </motion.div>
              <motion.span
                className="font-bold text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                munching
              </motion.span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Link
              to="/"
              className={`px-3 py-2 rounded-md transition ${
                location.pathname === "/"
                  ? "bg-amber-700"
                  : "hover:bg-amber-700"
              }`}
            >
              Home
            </Link> */}
            <Link
              to={tableNumber ? `/menu/${tableNumber}` : "/menu"}
              className={`px-3 py-2 rounded-md transition ${
                location.pathname.startsWith === "/menu/"
                  ? "bg-amber-700"
                  : "hover:bg-amber-700"
              }`}
            >
              Menu
            </Link>
            {!tableNumber && (
              <Link
                to="/book-table"
                className={`px-3 py-2 rounded-md transition ${
                  location.pathname === "/book-table"
                    ? "bg-amber-700"
                    : "hover:bg-amber-700"
                }`}
              >
                Book a Table
              </Link>
            )}
            {tableNumber && (
              <Link
                to={`/cart/${tableNumber}`}
                className={`px-3 py-2 rounded-md transition flex items-center ${
                  location.pathname === "/cart"
                    ? "bg-amber-700"
                    : "hover:bg-amber-700"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <motion.span
                    className="bg-white text-amber-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                    key={totalItems}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {totalItems}
                  </motion.span>
                </motion.div>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-amber-700 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md transition ${
                  location.pathname === "/"
                    ? "bg-amber-700"
                    : "hover:bg-amber-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`block px-3 py-2 rounded-md transition ${
                  location.pathname === "/menu"
                    ? "bg-amber-700"
                    : "hover:bg-amber-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/book-table"
                className={`block px-3 py-2 rounded-md transition ${
                  location.pathname === "/book-table"
                    ? "bg-amber-700"
                    : "hover:bg-amber-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Book a Table
              </Link>
              <Link
                to="/cart"
                className={`px-3 py-2 rounded-md transition flex items-center ${
                  location.pathname === "/cart"
                    ? "bg-amber-700"
                    : "hover:bg-amber-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-1" />
                <span className="bg-white text-amber-800 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
