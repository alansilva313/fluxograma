import { createContext, ReactNode } from "react";

interface Login {
  email: string;
  password: string;
}

interface AuthContextType {
  login: (credentials: Login) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  async function login({ email, password }: Login) {
    if (email && password) {
      const data = {
        email: email,
        success: true,
        token: "vqtrtqoVBoZ79SMKUG7XW6rDs0EShIrCtie8PBWlcbsgFByfqrgk63LH7ThPT5GTzrr66ef8fe189fc3",
      };

      // Armazenando o token nos cookies corretamente
      document.cookie = `token=${data.token}; path=/; SameSite=Strict; Secure`;

      // Redirecionando para a página principal
      window.location.href = "/";
    }
  }

  return <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>;
}
