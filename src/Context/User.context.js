import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../pages/firebase';

export const UserContext = createContext({
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
      console.log({ currentUser });
    });
  }, [currentUser]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
