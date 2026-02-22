import style from "./CartSummary.module.css"
function CartSummary ({productsCart,amount,totalPrice}){
    return(
        <article className={style.article}>
            <p>Resumen de compra</p>
            <div className={style.list}>
                <p>Productos({amount}) = $ {totalPrice}</p>
                
            </div >
            <button className={style.buyButton}>Comprar ahora</button>
            
        </article>
    )
}

export default CartSummary