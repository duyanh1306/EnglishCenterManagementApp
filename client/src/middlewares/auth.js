import { jwtDecode } from "jwt-decode";

export function getDecodedToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // { userId, role, iat, exp }
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
}

export function isTokenExpired() {
  const decoded = getDecodedToken();
  if (!decoded) return true;

  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}

export function getUserRole() {
  const decoded = getDecodedToken();
  return decoded?.role || null;
}

export function getUserId() {
  const decoded = getDecodedToken();
  return decoded?.userId || null;
}

export function clearAuthToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token && !isTokenExpired();
}