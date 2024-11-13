// AmountContext.js
import React, { createContext, useContext, useState } from "react";

// Create the context
const AmountContext = createContext();

// Custom hook to use the AmountContext
export const useAmount = () => {
  return useContext(AmountContext);
};

// Provider component
export const AmountProvider = ({ children }) => {
  // State to store the amount
  const [amount, setAmount] = useState(1);

  // Function to update the amount
  const updateAmount = (newAmount) => {
    setAmount(newAmount);
  };

  // Function to reset the amount
  const resetAmount = () => {
    setAmount(0);
  };

  return (
    <AmountContext.Provider value={{ amount, updateAmount, resetAmount }}>
      {children}
    </AmountContext.Provider>
  );
};
