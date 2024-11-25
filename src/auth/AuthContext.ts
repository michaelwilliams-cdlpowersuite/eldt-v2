import { jwtDecode } from "jwt-decode";
import React from "react";

const BUFFER_TIME = 60 * 10; // 10 minutes before token expiry

interface DecodedToken {
  exp: number; // Token expiration in seconds since epoch
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthentication: (token: string) => void;
  handleRefresh: () => void;
  clearAuthentication: () => void;
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

export const isTokenExpired = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  } catch {
    return true; // If decoding fails, treat as expired
  }
};

export const shouldTokenBeRefreshed = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime + BUFFER_TIME;
  } catch {
    return false;
  }
};
