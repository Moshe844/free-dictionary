import { createContext, useState } from "react";

export const InputContext = createContext();

export const IndexProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const value = { inputValue, setInputValue };

  return (
    <InputContext.Provider value={value}> {children}</InputContext.Provider>
  );
};
