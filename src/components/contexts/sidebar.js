import { createContext } from "react";

const context = createContext();

export function SidebarContext({ value, children }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

export default context;
