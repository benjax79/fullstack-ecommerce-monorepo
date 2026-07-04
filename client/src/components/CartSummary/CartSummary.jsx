import style from "./CartSummary.module.css"
import { useNavigate } from "react-router-dom";

function CartSummary ({productsCart,amount,totalPrice,setProductCart}){

    const navigate = useNavigate();

    const comprar_ahora = () =>{
        if(productsCart.length === 0){
            alert("El carrito está vacío");
            return;
        }
        
        // Redirigir a la página de Checkout pasando el estado del carrito
        navigate('/checkout', { 
            state: { 
                productsCart, 
                totalPrice, 
                amount 
            } 
        });
    }

    return(
        <article className={style.article}>
            <p>Resumen de compra</p>
            <div className={style.list}>
                <p>Productos({amount}) = $ {totalPrice}</p>
                
            </div >
            <button onClick={comprar_ahora} className={style.buyButton}>Comprar ahora</button>
            
        </article>
    )
}

export default CartSummary