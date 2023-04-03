import { Navigate, Outlet } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";

const ProtectedRoutesAuth = () => {
  const { isLogin } = useTokenContext();
  return !isLogin ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoutesAuth;
