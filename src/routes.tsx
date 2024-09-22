import { createBrowserRouter } from "react-router-dom";
import FlowPage from "./pages/FlowPage";
import Login from "./pages/Login";
import Home from "./pages/Home";




function getCookie(name: string): string | null {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null; // Retorna null se o cookie não for encontrado
  }
  



const auth = getCookie("token");


export const validarLogin = () => {
    if(!auth){
              
        return document.location.href = "login"
      }

      return true;
}





export const router = createBrowserRouter([
    {
        path: "/",
        element: <FlowPage />,
        loader: async () => validarLogin(),

          children: [
            {
                path: "home",
                element: <Home />,
                loader: async () => validarLogin(),
            },
          ]
          
          
    },

    {
        path: 'login',
        element: <Login />
    }

  
])