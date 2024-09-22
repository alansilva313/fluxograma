import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

import {  useState } from "react";





export default function Login()
{

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const { login } = useAuth();


    const logar = async (e:  any) => {
        e.preventDefault();
        await login({email, password})

    
    }



    return (
        <div className="w-full h-screen flex">
            
            <div className="flex items-center justify-center w-[50%]">
           <Card className="flex flex-col border-0 w-[650px] h-[550px] p-4 gap-4">

            <form onSubmit={logar} className="flex flex-col p-4 gap-4">
            <div className="text-4xl mb-20">Realizar meu login agora!</div>

                <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-2xl">E-mail</label>
                <Input 
                id="email" 
                onChange={(e) => setEmail(e.target.value)}
                className="p-9 text-2xl"/>
                </div>


                <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-2xl">Senha</label>
                <Input 
                id="password" 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                className=" p-9 text-2xl"/>
                </div>

                <Button className="p-9 bg-violet-700 hover:bg-violet-800 cursor-pointer text-2xl">Realizar login</Button>
            </form>


            </Card>

           </div>
            <div className="w-[50%] border">

            </div>
           




        
        
        </div>
    )
}