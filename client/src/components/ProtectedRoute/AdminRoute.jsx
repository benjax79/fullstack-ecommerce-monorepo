import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminRoute = () => {
    const { user } = useAuth();
    
    // Si no hay usuario o si el usuario no es admin, lo redirigimos al inicio
    if (!user || !user.is_admin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
