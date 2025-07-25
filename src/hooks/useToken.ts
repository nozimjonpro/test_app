import { useContext } from "react";
import { Context } from "../context/auth-context";

export const useToken = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return {
    token: context.token,
    setToken: context.setToken,
  };
};
