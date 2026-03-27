import style from "./CartSummary.module.css"
function CartSummary ({productsCart,amount,totalPrice,setProductCart}){

        // nombre,cantidad,precio,imagen,id_producto,
        // productos= {items: [{id_producto:IDREADL,precio:PRECIO REAL, cantidad:CANTIDAD REAL},{id_producto:IDREADL,precio:PRECIO REAL, cantidad:CANTIDAD REAL ...}]}
    const comprar_ahora = async () =>{
        try {
            const products_json_list=[]
            
            for(const productos of productsCart){
                const products_json={};
                products_json["id_producto"]=productos.id_producto;
                products_json["precio"]=productos.precio;
                products_json["cantidad"]=productos.cantidad;
                products_json_list.push(products_json);
            }
            
            const user = JSON.parse(localStorage.getItem("user"));
            const id_cliente = user?.id_cliente;
            
            if (!id_cliente) {
                console.error("No se encontró el cliente en localStorage");
                return;
            }
            
            const response = await fetch("http://localhost:3000/carrito/comprarCarrito",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    id_cliente: id_cliente,
                    productos: { items: products_json_list }
                })
            })
            
            if (!response.ok) {
                throw new Error(`Error en la compra: ${response.status}`);
            }
            
            const result = await response.text();
            
            alert("Compra exitosa")
            console.log("Compra exitosa:", result);
            setProductCart([])
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            alert("Hubo un error al procesar la compra. Por favor intenta de nuevo.");
        }
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