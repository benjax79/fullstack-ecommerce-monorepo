import { useEffect, useState } from "react"
import style from "./CarritoPage.module.css"
import ProductCartList from "../../components/ProductCartList/ProductCartList.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx"
import { CartListSkeleton } from "../../components/Skeleton/Skeleton"
import { useCart } from "../../context/CartContext.jsx";

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
                    <ProductCartList eliminarProductoCarrito={eliminarProductoCarrito} productsCart={productsCart} />
                )}
            </div>
            <div className={style.summaryContainer}>
                <CartSummary productsCart={productsCart} setProductCart={setProductCart} {...{amount,totalPrice}} />
            </div>
        </section>

        
        
    )
}


export default CarritoPage;