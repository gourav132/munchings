import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, setTableNumber } =
    useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (tableNumber) {
      setTableNumber(tableNumber);
    }
  }, [tableNumber, setTableNumber]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // In a real app, you would send the order to your backend
    console.log("Order placed:", {
      items: cart,
      tableNumber,
      specialInstructions,
      subtotal,
      tax,
      total,
    });

    setOrderPlaced(true);
    clearCart();
  };

  return (
    <AnimatePresence mode="wait">
      {orderPlaced ? (
        <motion.div
          className="bg-amber-50 min-h-screen py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-white rounded-lg shadow-md p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              >
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-amber-800 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Order Placed Successfully!
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Your order has been sent to the kitchen and will be prepared for
                table #{tableNumber}.
              </motion.p>
              <motion.p
                className="text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                A server will bring your food to your table shortly. Thank you
                for dining with us!
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/menu/${tableNumber}`}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition inline-flex items-center"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Menu
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="bg-amber-50 min-h-screen py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold text-amber-800 mb-4">
                Your Order
              </h1>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Review your selections and place your order for dine-in service.
              </p>
            </motion.div>

            {cart.length === 0 ? (
              <motion.div
                className="bg-white rounded-lg shadow-md p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <ShoppingBag className="h-8 w-8 text-amber-600" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-amber-800 mb-4">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any items to your order yet.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/menu/${tableNumber}`}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    Browse Menu
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-2xl font-semibold text-amber-800">
                        Order Items
                      </h2>
                    </div>

                    <AnimatePresence>
                      <ul className="divide-y divide-gray-200">
                        {cart.map((item) => (
                          <motion.li
                            key={item.id}
                            className="p-6 flex flex-col sm:flex-row sm:items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              marginTop: 0,
                              marginBottom: 0,
                              padding: 0,
                            }}
                            transition={{ duration: 0.3 }}
                            layout
                          >
                            <div className="sm:flex-shrink-0 mb-4 sm:mb-0">
                              <motion.img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-md"
                                whileHover={{ scale: 1.1 }}
                              />
                            </div>
                            <div className="sm:ml-6 sm:flex-1">
                              <div className="flex justify-between">
                                <h3 className="text-lg font-medium text-gray-900">
                                  {item.name}
                                </h3>
                                <p className="text-lg font-medium text-amber-600">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.description}
                              </p>
                              <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center border border-gray-300 rounded-md">
                                  <motion.button
                                    onClick={() =>
                                      updateQuantity(
                                        item.id,
                                        Math.max(1, item.quantity - 1)
                                      )
                                    }
                                    className="p-2 text-gray-600 hover:text-amber-600"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </motion.button>
                                  <motion.span
                                    className="px-4"
                                    key={item.quantity}
                                    initial={{ scale: 1.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                    }}
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="p-2 text-gray-600 hover:text-amber-600"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </motion.button>
                                </div>
                                <motion.button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700 flex items-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Remove
                                </motion.button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </ul>
                    </AnimatePresence>

                    <div className="p-6 border-t border-gray-200">
                      <motion.div whileHover={{ x: -5 }}>
                        <Link
                          to={`/menu/${tableNumber}`}
                          className="text-amber-600 hover:text-amber-800 font-medium flex items-center"
                        >
                          <ArrowLeft className="mr-2 h-5 w-5" />
                          Continue Ordering
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                {/* Order summary section */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                    <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                      Order Summary
                    </h2>

                    <form onSubmit={handlePlaceOrder}>
                      <div className="mb-6">
                        <label
                          htmlFor="tableNumber"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Table Number:{" "}
                          <span className="text-black font-bold">
                            {tableNumber}
                          </span>
                        </label>
                        <motion.input
                          type="text"
                          id="tableNumber"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 hidden"
                          placeholder="Enter your table number"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="specialInstructions"
                          className="block text-gray-700 font-medium mb-2"
                        >
                          Special Instructions (Optional)
                        </label>
                        <motion.textarea
                          id="specialInstructions"
                          value={specialInstructions}
                          onChange={(e) =>
                            setSpecialInstructions(e.target.value)
                          }
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Any special requests or dietary restrictions..."
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        ></motion.textarea>
                      </div>

                      <motion.div
                        className="space-y-3 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal</span>
                          <motion.span
                            key={subtotal}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ${subtotal.toFixed(2)}
                          </motion.span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Tax (8%)</span>
                          <motion.span
                            key={tax}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ${tax.toFixed(2)}
                          </motion.span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-amber-800 pt-3 border-t border-gray-200">
                          <span>Total</span>
                          <motion.span
                            key={total}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ${total.toFixed(2)}
                          </motion.span>
                        </div>
                      </motion.div>

                      <motion.button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Place Order
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
