import { createContext } from "react";

const context = createContext();

export function ConversationContext({ value, children }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}

export default context;
