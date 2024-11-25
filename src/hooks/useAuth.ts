import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "./useRefreshToken";

const REFRESH_TOKEN_URL = "/refresh-token";
const BUFFER_TIME = 60 * 10; // 10 minutes before token expiry

interface DecodedToken {
  exp: number; // Token expiration in seconds since epoch
}

export const isTokenExpired = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // If decoding fails, treat as expired
  }
};

const shouldTokenBeRefreshed = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime + BUFFER_TIME;
  } catch {
    return false;
  }
};

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("apiToken");
    return token ? !isTokenExpired(token) : false;
  });

  const setAuthentication = (token: string) => {
    console.log("Setting authentication with token:", token);
    localStorage.setItem("apiToken", token);

    const expired = isTokenExpired(token);
    console.log("Is token expired?", expired);

    setIsAuthenticated(!expired);

    handleStorageChange();
  };

  const refreshTokenMutation = useRefreshTokenMutation(setAuthentication);
  const handleRefresh = () => {
    refreshTokenMutation.mutate();
  };

  const handleStorageChange = () => {
    const token = localStorage.getItem("apiToken");
    console.log("handle storage change!!!!!!!!!!!!!!!!!!!!!:");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  // Listen for token changes in localStorage
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Automatically refresh token if near expiry
  useEffect(() => {
    const token = localStorage.getItem("apiToken");
    if (token && isTokenExpired(token)) {
      handleRefresh();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("apiToken");
      if (token && shouldTokenBeRefreshed(token)) {
        handleRefresh();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const clearAuthentication = () => {
    localStorage.removeItem("apiToken");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, setAuthentication };
};
