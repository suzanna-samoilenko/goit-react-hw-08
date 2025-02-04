import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate, useLocation } from "react-router-dom";

const RestrictedRoute = ({ component: Component, redirectTo = "/todos" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
export default RestrictedRoute;
