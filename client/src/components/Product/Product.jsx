import { useEffect, useState } from "react";
import style from "./Product.module.css"
import { useParams } from "react-router-dom"





function Product(){
    let Params = useParams();
    let {id}= Params;
   

    const [producto,setProducto]= useState(null);
    const [addProductNotification,setAddProductNotification ] = useState(false)
    const loadProduct = async() =>{
        const data = await fetch(`http://localhost:3000/producto/${id}`);
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
        const datos= JSON.parse(localStorage.getItem("user"));

        const response = await fetch("http://localhost:3000/carrito/agregarAlCarrito",{
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({
                id_cliente:datos.id_cliente,
                id_producto:id,
                cantidad:1

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


    return(
        <article className={style.article}>
            
            <div className={style.contentLeft}>
                <div className={style.image}>
                    <img src={producto.imagen}></img> 
                </div>


                <details className={style.description}>
                <summary>Descripcion</summary>
                <p>{producto.descripcion}</p>
                </details>
                <details className={style.specs}>
                    <summary>Especificaciones</summary>
               
                </details>
            </div>

            <div className={style.contentRigth}>
                <p>{`Nombre: ${producto.nombre}`}</p>
                <p>Marca:</p>
                <p>{`Precio:${producto.precio}`}</p>
                <p>{`Stock disponible: ${producto.stock}`}</p>
                <p>{`Color: ${producto.color}`} </p>
                <div >Cantidad</div>
                <div className={style.comprar_ahora}>Comprar ahora</div>
                <div className={style.agregarAlCarrito} onClick={agregarAlCarrito}>Agregar al carrito</div>
                { addProductNotification && <div>Producto agregado al carro</div>  }
                
            </div>


        </article>
    )
}

export default Product