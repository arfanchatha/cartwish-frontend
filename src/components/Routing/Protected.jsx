import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function Protected() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
}

export default Protected;
