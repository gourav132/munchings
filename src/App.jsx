import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import BookTable from "./pages/BookTable";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <AdminProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/book-table" element={<BookTable />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <Toaster position="bottom-center" />
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
