import { useEffect, useState } from "react"
import style from "./carritoPage.module.css"
import ProductCartList from "../../components/ProductCartList/ProductCartList.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx"

function CarritoPage(){
    
    const [productsCart,setProductCart] = useState([]);


    const eliminarProductoCarrito = async(id_producto) => {
        try{ 
            const id_cliente = JSON.parse(localStorage.getItem("user")).id_cliente
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/carrito/eliminarDeCarrito",{
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
        }
        catch (e) {
            console.error("Error al eliminar de carrito",e)
        }
    } 

    
    let amount=0;
    let totalPrice=0;
    const getCartProducts = async(id_cliente)=>{
        const token = localStorage.getItem("token");
        const request = await fetch(`http://localhost:3000/carrito/getCartProducts/${id_cliente}`, {
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
            return
        }
        
        const user=JSON.parse(localStorage.getItem("user"));
        const fecthData=async()=>{
            await getCartProducts(user.id_cliente)
        }
        fecthData();
       
    },[])


    return(
        
        
        <section className= {style.section} >
            <ProductCartList  eliminarProductoCarrito={eliminarProductoCarrito}   productsCart={productsCart}/>
            <div >
                <CartSummary productsCart={productsCart} setProductCart={setProductCart} {...{amount,totalPrice}}/>
            </div>


        </section>

        
        
    )
}


export default CarritoPage;