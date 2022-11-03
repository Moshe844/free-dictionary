import { createContext, useState } from "react";

export const InputContext = createContext({
  inputValue: "",
  setInputValue: () => null,
});

export const IndexProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState("");
  const value = { inputValue, setInputValue };

  return (
    <InputContext.Provider value={value}> {children}</InputContext.Provider>
  );
};
