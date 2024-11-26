import React, { useContext, useEffect, useState } from "react";
import {
  AuthContext,
  AuthContextProps,
  isTokenExpired,
  shouldTokenBeRefreshed,
} from "./AuthContext";
import { refreshToken } from "../api/api";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

    // Manually trigger the handleStorageChange equivalent
    const currentToken = localStorage.getItem("apiToken");
    if (currentToken && !isTokenExpired(currentToken)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  const handleRefresh = async () => {
    try {
      const data = await refreshToken();
      if (data?.accessToken) {
        setAuthentication(data.accessToken);
      } else {
        clearAuthentication();
      }
    } catch (error) {
      clearAuthentication();
    }
  };

  const clearAuthentication = () => {
    localStorage.removeItem("apiToken");
    setIsAuthenticated(false);
  };

  const handleStorageChange = () => {
    const token = localStorage.getItem("apiToken");
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

  // Automatically check for token expiry every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Checking token for refresh...");
      const token = localStorage.getItem("apiToken");
      if (token && shouldTokenBeRefreshed(token)) {
        console.log("Calling handleRefresh...");
        handleRefresh();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setAuthentication,
        handleRefresh,
        clearAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
