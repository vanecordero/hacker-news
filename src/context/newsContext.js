import React, { useState } from "react";

const Context = React.createContext({});

export function NewsContextProvider({ children }) {
  const [news, setNews] = useState([]);

  return (
    <Context.Provider value={{ news, setNews }}>{children}</Context.Provider>
  );
}

export default Context;
