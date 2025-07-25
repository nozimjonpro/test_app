import { useContext } from "react";
import { Context } from "../context/auth-context";

export const useLoading = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useLoading must be used within a AuthProvider");
  }
  return { isLoading: context.isLoading, setIsLoading: context.setIsLoading };
};
