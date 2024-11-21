import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const REFRESH_TOKEN_URL = "/refresh-token";

interface DecodedToken {
  exp: number; // Token expiration in seconds since epoch
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("apiToken")
  );

  const isTokenExpired = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime;
    } catch {
      return true; // If decoding fails, treat as expired
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(REFRESH_TOKEN_URL, null, {
        withCredentials: true,
      });
      const { token } = response.data;
      setAuthentication(token);
    } catch (error) {
      console.error("Failed to refresh token", error);
      clearAuthentication();
    }
  };

  const setAuthentication = (token: string) => {
    localStorage.setItem("apiToken", token);
    setIsAuthenticated(!isTokenExpired(token));
  };

  const clearAuthentication = () => {
    localStorage.removeItem("apiToken");
    setIsAuthenticated(false);
  };

  const handleStorageChange = () => {
    const token = localStorage.getItem("apiToken");
    if (token) {
      setIsAuthenticated(!isTokenExpired(token));
    } else {
      setIsAuthenticated(false);
    }
  };

  // Automatically refresh token if near expiry
  useEffect(() => {
    const token = localStorage.getItem("apiToken");
    if (token && isTokenExpired(token)) {
      refreshToken();
    }
  }, []);

  // Listen for token changes in localStorage
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("apiToken");
      if (token && isTokenExpired(token)) {
        refreshToken();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated, setAuthentication, clearAuthentication };
};
