import { AuthContext } from "@/contexts/Auth";
import { useContext } from "react";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}