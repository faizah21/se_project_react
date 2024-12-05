import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  isLoggedIn,
  anonymous = false,
}) {
  if (!isLoggedIn && !anonymous) {
    return <Navigate to="/" />;
  }

  return children;
}
