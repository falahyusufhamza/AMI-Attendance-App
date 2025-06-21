import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext({
    username: "Test",
    userId: "",
  });

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        username: "Test Falah",
        userId: "",
      });
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);
