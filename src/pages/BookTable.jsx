import React, { useState } from "react";
import { Calendar, Clock, Users, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../config/firebase"; // Make sure you have this firebase config file
import { collection, addDoc } from "firebase/firestore";

const BookTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
    status: "pending", // Add status field
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Add the current timestamp
      const reservationData = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      // Add to Firestore
      const docRef = await addDoc(
        collection(db, "reservations"),
        reservationData
      );
      console.log("Reservation added with ID: ", docRef.id);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit reservation. Please try again.");
      console.error("Error adding reservation: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate time slots from 11 AM to 10 PM with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 11; hour <= 22; hour++) {
      const hourFormatted = hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? "PM" : "AM";

      slots.push(`${hourFormatted}:00 ${amPm}`);
      slots.push(`${hourFormatted}:30 ${amPm}`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0];

  // Calculate max date (6 months from today)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
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
                <Check className="h-8 w-8 text-green-600" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-amber-800 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Reservation Confirmed!
              </motion.h2>
              <motion.p
                className="text-lg text-gray-700 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Thank you for booking a table with us, {formData.name}. We've
                sent a confirmation email to {formData.email}.
              </motion.p>
              <motion.div
                className="bg-amber-50 p-6 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <h3 className="text-xl font-semibold text-amber-800 mb-4">
                  Reservation Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-600">Date:</p>
                    <p className="font-medium">
                      {new Date(formData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Time:</p>
                    <p className="font-medium">{formData.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Number of Guests:</p>
                    <p className="font-medium">{formData.guests}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                </div>
                {formData.specialRequests && (
                  <div className="mt-4 text-left">
                    <p className="text-gray-600">Special Requests:</p>
                    <p className="font-medium">{formData.specialRequests}</p>
                  </div>
                )}
              </motion.div>
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                If you need to modify or cancel your reservation, please contact
                us at (555) 123-4567.
              </motion.p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Make Another Reservation
              </motion.button>
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
              <motion.span
                className="text-amber-600 uppercase tracking-widest text-sm font-medium mb-4 block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Make a Reservation
              </motion.span>
              <h1 className="text-5xl font-bold text-amber-800 mb-4">
                Reserve Your Table
              </h1>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
                Experience exceptional dining at Munchings. For parties larger
                than 10, please call us directly at (555) 123-4567.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Booking Form */}
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-amber-800 mb-8">
                  Reservation Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <motion.input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <motion.input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="john@example.com"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        placeholder="(555) 123-4567"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="guests"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Number of Guests
                      </label>
                      <div className="relative">
                        <motion.select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 appearance-none"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "person" : "people"}
                            </option>
                          ))}
                          <option value="11">More than 10 (call us)</option>
                        </motion.select>
                        <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <div className="relative">
                        <motion.input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={today}
                          max={maxDateStr}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Time
                      </label>
                      <div className="relative">
                        <motion.select
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 appearance-none"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </motion.select>
                        <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="specialRequests"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Special Requests (Optional)
                    </label>
                    <motion.textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="Any dietary restrictions, allergies, or special occasions..."
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    ></motion.textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-amber-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-amber-700 transition-all duration-300 flex items-center justify-center ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Processing...
                      </div>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </motion.button>

                  {error && (
                    <motion.div
                      className="bg-red-50 text-red-700 p-4 rounded-lg mt-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-8"
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg backdrop-filter"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-amber-800 mb-6">
                    Reservation Guidelines
                  </h2>

                  <div className="space-y-6">
                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Hours of Operation
                        </h3>
                        <p className="text-gray-600">
                          Monday - Friday: 11:00 AM - 10:00 PM
                          <br />
                          Saturday - Sunday: 10:00 AM - 11:00 PM
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Group Reservations
                        </h3>
                        <p className="text-gray-600">
                          For parties larger than 10, please contact us directly
                          for special arrangements and private dining options.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Cancellation Policy
                        </h3>
                        <p className="text-gray-600">
                          Please notify us at least 4 hours in advance for
                          cancellations. For same-day cancellations, contact us
                          directly.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-amber-50 rounded-2xl p-8 border border-amber-100"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-amber-800 mb-4">
                    Need Assistance?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our team is here to help you plan your perfect dining
                    experience. For immediate assistance or special requests,
                    please don't hesitate to call us.
                  </p>
                  <p className="text-amber-800 font-semibold">
                    Call us: (555) 123-4567
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookTable;
