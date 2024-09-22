import { AuthContext } from "@/contexts/Auth";
import { useContext } from "react";





export function useValidaAuth()
{
    const validaAuth = useContext(AuthContext);
    if(!validaAuth){
        throw new Error("validaAuth deve ser usado dentro de um AuthProvider")
    }

    return validaAuth;

}