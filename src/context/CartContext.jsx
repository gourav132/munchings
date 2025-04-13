import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState(null);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart;
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        toast.success(`Added another ${item.name} to cart`);
      } else {
        // Item doesn't exist, add new item with quantity 1
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
        toast.success(`${item.name} added to cart`);
      }
      return updatedCart;
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        tableNumber,
        setTableNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
