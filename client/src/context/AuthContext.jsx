import { useEffect } from "react";
import { useState } from "react";
import { useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = async (email, password) => {

        const respuesta = await fetch("http://localhost:3000/auth/login", { "method": "POST", "headers": { "Content-Type": "application/json" }, "body": JSON.stringify({ "email": email, "password": password }) });
        if (!respuesta.ok) {
            return false;
        }

        const datos = await respuesta.json()

        localStorage.setItem("token", datos.token);
        localStorage.setItem("user", JSON.stringify(datos.user));
        setUser(datos.user);
        return true;

    }

    const logOut = () => {
        if (localStorage.getItem("token") === null) {
            throw new Error("Error inesperado al cerrar sesion (TOKEN ERA NULL)");
        }
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);

    }


    // Función auxiliar para comprobar si el token expiró
    const isTokenValid = (token) => {
        try {
            // El token tiene formato: header.payload.signature
            const payloadBase64 = token.split('.')[1];
            // Decodificamos el Base64 y lo pasamos a JSON
            const decodedJson = JSON.parse(atob(payloadBase64));
            // decodedJson.exp está en segundos, Date.now() en milisegundos
            return decodedJson.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    };

    // Carga inicial de datos (Con manejo de expiración de token)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            if (isTokenValid(token)) {
                // Si el token aún es válido, logueamos al usuario
                setUser(JSON.parse(storedUser));
            } else {
                // Si expiró, borramos todo como si hiciera logOut
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, login, logOut }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);
