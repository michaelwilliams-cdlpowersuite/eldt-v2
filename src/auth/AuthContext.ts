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
  } catch (e) {
    console.error('failed to verify token: '+e);
    return true; // If decoding fails, treat as expired
  }
};

export const shouldTokenBeRefreshed = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token); // Decodes the token
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime + BUFFER_TIME; // Refresh if within buffer time
  } catch (error) {
    console.error("Failed to decode token for refresh check:", error);
    return false; // If decoding fails, assume no refresh is needed
  }
};
