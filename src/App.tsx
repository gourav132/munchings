import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu";
import BookTable from "./pages/BookTable";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import AdminReservations from "./pages/AdminReservations";

function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:tableNumber" element={<Menu />} />

              <Route path="/book-table" element={<BookTable />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/:tableNumber" element={<Cart />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route
                path="/admin/reservations"
                element={<AdminReservations />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
