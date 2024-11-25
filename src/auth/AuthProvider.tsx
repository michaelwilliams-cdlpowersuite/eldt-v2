import React, { useContext, useEffect, useState } from "react";
import {
  AuthContext,
  AuthContextProps,
  isTokenExpired,
  shouldTokenBeRefreshed,
} from "./AuthContext";

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

  //   const refreshTokenMutation = useRefreshTokenMutation(setAuthentication);

  const handleRefresh = () => {
    // refreshTokenMutation.mutate();
  };

  const clearAuthentication = () => {
    localStorage.removeItem("apiToken");
    setIsAuthenticated(false);
  };

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
