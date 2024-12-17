import { Navigate } from "react-router-dom";

// Util
import facade from "../util/apiFacade";

const ProtectedRoute = ({ children, role }) => {
  if (!facade.loggedIn() || !facade.hasUserAccess(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
