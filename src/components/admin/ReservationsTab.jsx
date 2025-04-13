import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  Users,
  Phone,
  Mail,
} from "lucide-react";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const ReservationsTab = ({
  updateReservationStatus,
  formatDate,
  getStatusColor,
  getStatusIcon,
}) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reservations, setReservations] = useState([]); // Add state for reservations
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch reservations from Firebase
  useEffect(() => {
    const q = query(collection(db, "reservations"), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const reservationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to Date object if needed
          date: doc.data().date?.toDate
            ? doc.data().date.toDate()
            : doc.data().date,
        }));
        setReservations(reservationsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const statusOptions = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          Reservation Management
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        </div>
      ) : reservations.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          No reservations found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {reservations.map((reservation) => (
                    <motion.tr
                      key={reservation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedReservation(reservation)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">
                            {reservation.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {reservation.email}
                          </span>
                          <span className="text-sm text-gray-500">
                            {reservation.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(reservation.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reservation.partySize} guests
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {getStatusIcon(reservation.status)}
                          {statusOptions[reservation.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {reservation.status === "pending" && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-green-600 hover:text-green-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateReservationStatus(
                                    reservation.id,
                                    "confirmed"
                                  );
                                }}
                              >
                                Confirm
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-red-600 hover:text-red-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateReservationStatus(
                                    reservation.id,
                                    "cancelled"
                                  );
                                }}
                              >
                                Cancel
                              </motion.button>
                            </>
                          )}
                          {reservation.status === "confirmed" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-amber-600 hover:text-amber-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateReservationStatus(
                                  reservation.id,
                                  "completed"
                                );
                              }}
                            >
                              Mark Complete
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Reservation Details Modal */}
          <AnimatePresence>
            {selectedReservation && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedReservation(null)}
              >
                <motion.div
                  className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Reservation Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-amber-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedReservation.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Party of {selectedReservation.partySize}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedReservation.date)}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-amber-600 mr-2" />
                      <p className="text-sm text-gray-600">
                        {selectedReservation.phone}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-amber-600 mr-2" />
                      <p className="text-sm text-gray-600">
                        {selectedReservation.email}
                      </p>
                    </div>

                    {selectedReservation.specialRequests && (
                      <div className="bg-amber-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-amber-800">
                          Special Requests:
                        </p>
                        <p className="text-sm text-amber-600">
                          {selectedReservation.specialRequests}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                        onClick={() => setSelectedReservation(null)}
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              // </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};

export default ReservationsTab;
