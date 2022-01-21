import { createContext } from "react";

const context = createContext();

export function NotificationContext({ children, value }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

export default context;
