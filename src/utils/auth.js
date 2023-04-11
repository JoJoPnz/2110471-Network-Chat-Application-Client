import jwtDecode from "jwt-decode";
import { storage } from "./storage";

export const checkToken = () => {
  const token = storage.getAccessToken();
  try {
    if (!token) return false;
    const decodedToken = jwtDecode(token ? token : "");
    const currentTime = new Date().getTime() / 1000;
    if (decodedToken.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
};

export const getUserIdFromToken = () => {
  const token = storage.getAccessToken();
  const decodedToken = jwtDecode(token ? token : "");
  if (decodedToken && decodedToken.id) {
    return decodedToken.id;
  }
  return null;
};
