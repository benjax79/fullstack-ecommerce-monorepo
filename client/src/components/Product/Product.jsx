import { useEffect, useState } from "react";
import style from "./Product.module.css"
import { useParams, useNavigate } from "react-router-dom"

function Product(){
    let Params = useParams();
    let {id}= Params;
    const navigate = useNavigate();

    const [producto,setProducto]= useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [addProductNotification,setAddProductNotification ] = useState(false)
    
    const loadProduct = async() =>{
        const data = await fetch(`${import.meta.env.VITE_API_URL}/producto/${id}`);
        const resultado= await data.json();
        setProducto(resultado);
    }

    useEffect( () =>{
        loadProduct();
    },[id] )

    useEffect( ()=> {
        if(addProductNotification){
            setTimeout(() => {
                setAddProductNotification(false)
            }, 5000);
        }
    },[addProductNotification] )

    if(!producto){
        return <p>cargando</p>
    }

    const agregarAlCarrito = async() => {
        try{
            const userString = localStorage.getItem("user");
            if (!userString) {
                navigate("/sesion");
                return;
            }
            
            const datos= JSON.parse(userString);
            const token = localStorage.getItem("token");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/carrito/agregarAlCarrito`,{
                method: "POST",
                headers:{
                    "content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_cliente:datos.id_cliente,
                    id_producto:id,
                    cantidad: cantidad
                })
            })

            if (!response.ok){
                throw new Error(`Error en la petición: ${response.status}`);
            }
            setAddProductNotification(true);
        }
        catch (e) {
            console.error("Error al agregar al carrito",e)
        }
    }

    const handleComprarAhora = () => {
        const userString = localStorage.getItem("user");
        if (!userString) {
            navigate("/sesion");
            return;
        }

        // Simular la estructura del carrito para pasarla al Checkout
        const compraDirecta = [{
            ...producto,
            cantidad: cantidad
        }];
        
        const totalPrice = producto.precio * cantidad;

        navigate('/checkout', {
            state: {
                productsCart: compraDirecta,
                totalPrice: totalPrice,
                amount: cantidad
            }
        });
    }

    const handleCantidadChange = (e) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > producto.stock) value = producto.stock;
        setCantidad(value);
    }

    const decrementarCantidad = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    }

    const incrementarCantidad = () => {
        if (cantidad < producto.stock) setCantidad(cantidad + 1);
    }

    const agotado = producto.stock === 0;

    return(
        <article className={style.article}>
            
            <div className={style.contentLeft}>
                <div className={style.imageContainer}>
                    <img className={style.image} src={producto.imagen} alt={producto.nombre} /> 
                </div>

                <details className={style.details} open>
                    <summary>Descripción</summary>
                    <p>{producto.descripcion}</p>
                </details>
                <details className={style.details}>
                    <summary>Especificaciones</summary>
                    <p>Más detalles sobre el producto pueden ir aquí.</p>
                </details>
            </div>

            <div className={style.contentRigth}>
                <h1 className={style.title}>{producto.nombre}</h1>
                <p className={style.price}>${producto.precio}</p>
                
                <div className={style.infoGroup}>
                    <span className={style.infoLabel}>Categoría</span>
                    <span className={style.infoValue}>{producto.categoria}</span>
                </div>
                
                <div className={style.infoGroup}>
                    <span className={style.infoLabel}>Color</span>
                    <span className={style.infoValue}>{producto.color}</span>
                </div>

                <div className={style.infoGroup}>
                    <span className={style.infoLabel}>Disponibilidad</span>
                    <span className={style.infoValue}>{agotado ? 'Agotado' : `${producto.stock} en stock`}</span>
                </div>

                {!agotado && (
                    <div className={style.quantitySelector}>
                        <span className={style.infoLabel}>Cantidad:</span>
                        <div className={style.quantityControls}>
                            <button className={style.quantityBtn} onClick={decrementarCantidad} disabled={cantidad <= 1}>-</button>
                            <input 
                                type="number" 
                                className={style.quantityInput} 
                                value={cantidad} 
                                onChange={handleCantidadChange}
                                min="1"
                                max={producto.stock}
                            />
                            <button className={style.quantityBtn} onClick={incrementarCantidad} disabled={cantidad >= producto.stock}>+</button>
                        </div>
                    </div>
                )}

                <div className={style.actions}>
                    <button className={style.agregarAlCarrito} onClick={agregarAlCarrito} disabled={agotado}>
                        {agotado ? "Sin Stock" : "Añadir al Carrito"}
                    </button>
                    <button className={style.comprar_ahora} onClick={handleComprarAhora} disabled={agotado}>
                        Comprar Ahora
                    </button>
                </div>
                
                { addProductNotification && <div className={style.notification}>¡Producto agregado al carrito exitosamente!</div> }
            </div>
        </article>
    )
}

export default Product