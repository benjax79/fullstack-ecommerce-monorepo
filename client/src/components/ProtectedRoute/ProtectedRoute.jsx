import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
    const { user } = useAuth();

    // Si no hay usuario logueado, redirige a la página de login (/sesion)
    if (!user) {
        return <Navigate to="/sesion" replace />;
    }

    // Si el usuario existe, renderiza la ruta hija (el componente protegido)
    return <Outlet />;
};

export default ProtectedRoute;
