import React, { createContext, useContext } from "react";
import useFetch from "./useFetch";

// Create the context
const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [data] = useFetch("https://dummyjson.com/todos?limit=10");
  //   const [task, setTask] = useState([]);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

// Custom hook to use context
export const useUserContext = () => useContext(UserContext);
