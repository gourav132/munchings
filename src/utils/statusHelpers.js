import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
    case "completed":
    case "served":
      return "bg-green-100 text-green-800";
    case "pending":
    case "new":
    case "preparing":
      return "bg-amber-100 text-amber-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
    case "completed":
    case "served":
      return <CheckCircle className="h-4 w-4 mr-1" />;
    case "pending":
    case "new":
    case "preparing":
      return <Clock className="h-4 w-4 mr-1" />;
    case "cancelled":
      return <XCircle className="h-4 w-4 mr-1" />;
    default:
      return <AlertCircle className="h-4 w-4 mr-1" />;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};