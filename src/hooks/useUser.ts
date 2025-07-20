import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser is not inside <UserProvider>");
  return context;
}

