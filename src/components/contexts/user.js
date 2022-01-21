import { createContext } from "react";

const context = createContext();

export function UserContext({ children, value }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

export default context;
