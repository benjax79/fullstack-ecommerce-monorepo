import { useEffect } from "react";
import { useState } from "react";
import { useContext,createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const login = async(email,password)=>{

        const respuesta= await fetch("http://localhost:3000/auth/login",{"method":"POST","headers":{"Content-Type":"application/json"},  "body": JSON.stringify({"email":email,"password":password})});
        if(!respuesta.ok){
            return false;
        }

        const datos=await  respuesta.json()

        localStorage.setItem("token",datos.token);
        localStorage.setItem("user",JSON.stringify(datos.user));
        setUser(datos.user);
        return true;

    }

    const logOut = ()=>{
        if(localStorage.getItem("token")===null){
            throw new Error("Error inesperado al cerrar sesion (TOKEN ERA NULL)");
        }
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);

    }
    

    // Carga inicial de datos (Falta manejar logica de expiracion de token)
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }

    },[] )

    return(
        <AuthContext.Provider value={{user,setUser,login,logOut}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth= ()=>useContext(AuthContext);
