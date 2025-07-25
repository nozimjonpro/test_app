import { createContext, useEffect, useState } from "react";

interface ContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<ContextType | null>(null);

function Provider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Context.Provider value={{ token, setToken, isLoading, setIsLoading }}>
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };
