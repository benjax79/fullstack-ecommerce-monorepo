import { useEffect, useState } from "react"
import style from "./CarritoPage.module.css"
import ProductCartList from "../../components/ProductCartList/ProductCartList.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx"
import { CartListSkeleton } from "../../components/Skeleton/Skeleton"
import { useCart } from "../../context/CartContext.jsx";
import toast from "react-hot-toast";

function CarritoPage(){
    
    const [productsCart,setProductCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const { refreshCartCount } = useCart();


    const eliminarProductoCarrito = async(id_producto) => {
        try{ 
            const id_cliente = JSON.parse(localStorage.getItem("user")).id_cliente
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito/eliminarDeCarrito`,{
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id_cliente:id_cliente,
                id_producto:id_producto
               

            })
            
        })
        if (!response.ok){
            throw new Error(`Error en la petición de eliminacion del carrito: ${response.status}`);
        }
        const filtraje= productsCart.filter( (producto) => producto.id_producto !==id_producto)
        setProductCart(filtraje)
        refreshCartCount();
        }
        catch (e) {
            console.error("Error al eliminar de carrito",e)
        }
    } 

    
    const modificarCantidadCarrito = async (id_producto, nueva_cantidad) => {
        if (nueva_cantidad <= 0) {
            return eliminarProductoCarrito(id_producto);
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito/actualizarCantidad`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id_producto, nueva_cantidad })
            });

            if (!response.ok) {
                const errData = await response.json();
                toast.error(errData.error || "No se pudo actualizar la cantidad");
                return;
            }

            // Update state
            const updatedProducts = productsCart.map(prod => {
                if (prod.id_producto === id_producto) {
                    return { ...prod, cantidad: nueva_cantidad };
                }
                return prod;
            });
            setProductCart(updatedProducts);
            refreshCartCount();

        } catch (e) {
            console.error("Error al actualizar cantidad", e);
            toast.error("Error de conexión");
        }
    }

    let amount=0;
    let totalPrice=0;
    const getCartProducts = async(id_cliente)=>{
        const token = localStorage.getItem("token");
        const request = await fetch(`${import.meta.env.VITE_API_URL}/carrito/getCartProducts/${id_cliente}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        const product_list = await request.json()
        setProductCart(product_list);
    }
    productsCart.forEach( ({precio, cantidad}) => {
        amount+=cantidad;
        totalPrice+=precio*cantidad;
    })

    useEffect( ()=>{
        if(!localStorage.getItem("user")){
            setLoading(false);
            return
        }
        
        const user=JSON.parse(localStorage.getItem("user"));
        const fecthData=async()=>{
            await getCartProducts(user.id_cliente)
            setLoading(false);
        }
        fecthData();
       
    },[])


    return(
        
        
        <section className={style.section}>
            <div className={style.cartListContainer}>
                {loading ? (
                    <CartListSkeleton count={3} />
                ) : (
                    <ProductCartList eliminarProductoCarrito={eliminarProductoCarrito} modificarCantidadCarrito={modificarCantidadCarrito} productsCart={productsCart} />
                )}
            </div>
            <div className={style.summaryContainer}>
                <CartSummary productsCart={productsCart} setProductCart={setProductCart} {...{amount,totalPrice}} />
            </div>
        </section>

        
        
    )
}


export default CarritoPage;