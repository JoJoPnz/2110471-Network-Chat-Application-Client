import { Navigate, Outlet } from "react-router-dom";
import { checkToken } from "../utils/auth";

const ProtectedRoutesAuth = () => {
  const isLogin = checkToken();
  return !isLogin ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutesAuth;
