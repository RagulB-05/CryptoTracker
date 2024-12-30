import React, { createContext, useContext, useEffect, useState } from "react";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  return context;
};
