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
              <h1 className="text-4xl font-bold text-amber-800 mb-4">
                Reserve Your Table
              </h1>
              <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Book your dining experience at Savoria. We recommend making
                reservations at least 2 hours in advance.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Booking Form */}
              <motion.div
                className="bg-white rounded-lg shadow-md p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                  Reservation Details
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="John Doe"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-medium mb-2"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="john@example.com"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-medium mb-2"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        placeholder="(555) 123-4567"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="guests"
                        className="block text-gray-700 font-medium mb-2"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 appearance-none"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-gray-700 font-medium mb-2"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-gray-700 font-medium mb-2"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 appearance-none"
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

                  <div className="mb-6">
                    <label
                      htmlFor="specialRequests"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Special Requests (Optional)
                    </label>
                    <motion.textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Any special requests, dietary restrictions, or occasion details..."
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    ></motion.textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Confirm Reservation
                  </motion.button>
                </form>
              </motion.div>

              {/* Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  className="bg-white rounded-lg shadow-md p-8 mb-8"
                  whileHover={{ y: -5 }}
                >
                  <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                    Reservation Information
                  </h2>

                  <div className="space-y-4">
                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 text-amber-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Reservation Hours
                        </h3>
                        <p className="text-gray-600">
                          Monday - Friday: 11:00 AM - 10:00 PM
                        </p>
                        <p className="text-gray-600">
                          Saturday - Sunday: 10:00 AM - 11:00 PM
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 text-amber-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Reservation Policy
                        </h3>
                        <p className="text-gray-600">
                          We hold reservations for 15 minutes past the scheduled
                          time. After that, tables may be given to waiting
                          guests.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.9 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 text-amber-600 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Cancellation Policy
                        </h3>
                        <p className="text-gray-600">
                          Please notify us at least 2 hours in advance for
                          cancellations or changes to your reservation.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-amber-100 rounded-lg shadow-md p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h2 className="text-2xl font-semibold text-amber-800 mb-6">
                    Need Help?
                  </h2>
                  <p className="text-gray-700 mb-4">
                    For parties larger than 10, special events, or if you need
                    immediate assistance, please contact us directly:
                  </p>
                  <motion.div
                    className="flex items-center text-amber-800 font-medium mb-2"
                    whileHover={{ x: 5 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    (555) 123-4567
                  </motion.div>
                  <motion.div
                    className="flex items-center text-amber-800 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    reservations@savoria.com
                  </motion.div>
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
