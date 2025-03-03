import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@restaurant.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const user = getAuth();
  console.log(user.currentUser)

  useEffect(() => {
    if (user.currentUser) {
      navigate("/admin");
    }
  }, [user.currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = "Failed to log in. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-amber-50">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
  //     </div>
  //   );
  // }

  return (
    <motion.div
      className="bg-amber-50 min-h-screen py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span className="ml-2">Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
