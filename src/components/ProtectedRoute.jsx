import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// If there is no user, kick them back to the login page
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
