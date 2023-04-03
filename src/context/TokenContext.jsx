import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();

export function useTokenContext() {
  return useContext(TokenContext);
}

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <TokenContext.Provider value={{ token, setToken, isLogin, setIsLogin }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
