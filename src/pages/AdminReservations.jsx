import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const q = query(
      collection(db, "reservations"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reservationsData = [];
      querySnapshot.forEach((doc) => {
        reservationsData.push({ id: doc.id, ...doc.data() });
      });
      setReservations(reservationsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      const reservationRef = doc(db, "reservations", reservationId);
      await updateDoc(reservationRef, {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating reservation: ", error);
    }
  };

  const filteredReservations = reservations
    .filter((reservation) => {
      if (filter === "all") return true;
      return reservation.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-800">
          Reservation Management
        </h1>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Reservations</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="declined">Declined</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="date">Sort by Reservation Date</option>
            <option value="created">Sort by Creation Date</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReservations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reservations found
          </div>
        ) : (
          filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`p-6 rounded-lg shadow-md transition-all duration-200 ${
                reservation.status === "pending"
                  ? "bg-yellow-50 border-l-4 border-yellow-400"
                  : reservation.status === "confirmed"
                  ? "bg-green-50 border-l-4 border-green-400"
                  : "bg-red-50 border-l-4 border-red-400"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {reservation.name}
                  </h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-gray-600">
                    <p>📧 {reservation.email}</p>
                    <p>📱 {reservation.phone}</p>
                    <p>
                      📅{" "}
                      {new Date(reservation.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>⏰ {reservation.time}</p>
                    <p>
                      👥 {reservation.guests}{" "}
                      {reservation.guests === 1 ? "guest" : "guests"}
                    </p>
                    <p className="capitalize">
                      📋 Status:{" "}
                      <span
                        className={`
                      font-semibold
                      ${
                        reservation.status === "pending"
                          ? "text-yellow-600"
                          : reservation.status === "confirmed"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    `}
                      >
                        {reservation.status}
                      </span>
                    </p>
                  </div>
                  {reservation.specialRequests && (
                    <p className="text-gray-600 mt-2">
                      💬 Special Requests: {reservation.specialRequests}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {reservation.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "confirmed")
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "declined")
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReservations;
