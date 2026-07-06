import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartCount, setCartCount] = useState(0);

    const refreshCartCount = async () => {
        if (!user) {
            setCartCount(0);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito/getCartProducts/${user.id_cliente}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const count = data.reduce((total, item) => total + item.cantidad, 0);
                setCartCount(count);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        }
    };

    useEffect(() => {
        refreshCartCount();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartCount, refreshCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
