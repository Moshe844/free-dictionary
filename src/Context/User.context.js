import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const IndexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const user = { currentUser, setCurrentUser };
  return <UserContext.Provider user={user}>{children}</UserContext.Provider>;
};
