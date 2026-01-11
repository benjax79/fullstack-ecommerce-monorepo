import { pool } from "../config/db.js"

export const agregarAlCarrito = async(req,res)=>{
    try{
        const {id_cliente,id_producto,cantidad}= await req.body;
        await pool.query("INSERT INTO cliente_producto (id_cliente,id_producto,cantidad) values ($1,$2,$3)",[id_cliente,id_producto,cantidad])
        res.send("Exito en la operacion")
    }   
    
    catch(error){
        res.send("Fallo al agregar al carrito")
        console.error("Error al agregar carrito",error)
    }
}

export const getCartProducts = async(req,res)=>{
    try{
        const {id_cliente}= await req.params;
        const request =await pool.query("SELECT nombre,precio,imagen, p.id_producto,cp.cantidad FROM  cliente_producto AS cp JOIN producto as p ON cp.id_producto = p.id_producto WHERE id_cliente = $1",[id_cliente]);
        const products = request.rows; 
        res.json(products);

        
    }   
    
    catch(error){
        res.send("Fallo al obtener productos en carro")
        console.error("Fallo al obtener productos en carro",error)
    }
}
