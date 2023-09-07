import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WrapContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [popup, setpopup] = useState(null);
  const server_add = "https://sagmayam-server.onrender.com/";
  useEffect(() => {
    if (popup) {
      setTimeout(() => setpopup(null), 2000);
    }
  }, [popup]);
  useEffect(() => {
    user && localStorage.setItem("user", JSON.stringify(user));
    !user && setUser(JSON.parse(localStorage.getItem("user")));
  }, [user]);
  const memoedValue = useMemo(
    () => ({
      user,
      server_add,
      setUser,
      popup,
      setpopup,
    }),
    [user, popup]
  );
  return (
    <WrapContext.Provider value={memoedValue}>{children}</WrapContext.Provider>
  );
};

export default function useReducer() {
  return useContext(WrapContext);
}
