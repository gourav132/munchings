import React from "react";
import {
  Calendar,
  ShoppingBag,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { motion } from "framer-motion";

const StatsOverview = ({ reservations = [], orders = [] }) => {
  // Calculate statistics
  const pendingReservationsCount = reservations.filter(
    (r) => r.status === "pending"
  ).length;
  const confirmedReservationsCount = reservations.filter(
    (r) => r.status === "confirmed"
  ).length;
  const newOrdersCount = orders.filter((o) => o.status === "new").length;
  const completedOrdersCount = orders.filter(
    (o) => o.status === "completed"
  ).length;

  const stats = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Pending Reservations",
      count: pendingReservationsCount,
      trend: <TrendingUp className="h-4 w-4 text-green-500" />,
      trendText: "5% increase",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      needsAttention: true,
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Confirmed Reservations",
      count: confirmedReservationsCount,
      trend: <TrendingUp className="h-4 w-4 text-green-500" />,
      trendText: "12% increase",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: "New Orders",
      count: newOrdersCount,
      trend: <TrendingDown className="h-4 w-4 text-red-500" />,
      trendText: "3% decrease",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      needsAttention: true,
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Completed Orders",
      count: completedOrdersCount,
      trend: <TrendingUp className="h-4 w-4 text-green-500" />,
      trendText: "8% increase",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
    },
  ];
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} delay={index * 0.1} />
      ))}
    </motion.div>
  );
};

const StatCard = ({
  icon,
  title,
  count,
  trend,
  trendText,
  bgColor,
  textColor,
  needsAttention,
  delay,
}) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      y: -5,
      boxShadow: "0 12px 28px -5px rgba(0, 0, 0, 0.15)",
    }}
  >
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>{icon}</div>
      <div className="ml-5 flex-grow">
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
          {title}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <motion.h3
            className="text-3xl font-bold text-gray-900"
            key={count}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {count}
          </motion.h3>
          <div className="flex items-center space-x-2">
            {trend}
            <span className="text-sm text-gray-600">{trendText}</span>
          </div>
        </div>
        {needsAttention && count > 0 && (
          <motion.div
            className="mt-2 flex items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className={`px-2 py-1 text-xs rounded-full ${bgColor} ${textColor} font-medium`}
            >
              Needs Attention
            </span>
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
);

export default StatsOverview;
