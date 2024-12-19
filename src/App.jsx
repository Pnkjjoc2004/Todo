import React from "react";
import { UserProvider } from "./customHooks/UserContext";
import List from "./components/List";
// import AddTask from "./AddTask";

const App = () => {
  return (
    <UserProvider>
      <div>
        {/* <AddTask /> */}
        <List />
      </div>
    </UserProvider>
  );
};

export default App;
