import { useState, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth";

export default function useAuth() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  // optional: validate token on mount (lightweight)
  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) setUser(null);
  }, []);

  const login = async ({ email, password }) => {
    const res = await loginRequest({ email, password });
    // expected res.data = { access, refresh, ...maybe user }
    const { access, refresh, user: userData } = res.data;
    if (access) {
      localStorage.setItem("access", access);
    }
    if (refresh) {
      localStorage.setItem("refresh", refresh);
    }
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      setUser({ email });
    }
    return res;
  };

  const register = async (payload) => {
    const res = await registerRequest(payload);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return { user, login, register, logout, isAuthenticated: !!user };
}
