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

export const eliminarDeCarrito = async (req,res)=>{
     try{
        const {id_cliente,id_producto}= await req.body;
        await pool.query("DELETE from cliente_producto WHERE id_cliente = $1 and id_producto = $2",[id_cliente,id_producto])
        res.send("Exito en la operacion")
    }   
    
    catch(error){
        res.send("Fallo al borrar producto del carrito")
        console.error("Error al borrar producto del carrito",error)
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

export const comprarCarrito = async(req,res) => {
    // Crear boleta ( Recibimos la id_boleta ) -> Asociar cada producto con cantidad a boleta  ( id_boleta + id_producto + cantidad) * cada producto
    // productos= {items: [{id_producto:IDREADL,precio:PRECIO REAL, cantidad:CANTIDAD REAL},{id_producto:IDREADL,precio:PRECIO REAL, cantidad:CANTIDAD REAL ...}]}
    try{
        const {id_cliente, productos} = req.body;
        
        // Calcular el precio total
        const clave_valor_list = productos.items;
        let precio_total = 0;
        for (const producto of clave_valor_list) {
            precio_total += producto.precio * producto.cantidad;
        }
        
        // Crear la boleta con el precio_total
        const resultBoleta = await pool.query(
            "INSERT INTO boleta (id_cliente, precio_total) values ($1, $2) RETURNING id_boleta",
            [id_cliente, precio_total]
        );
        const id_boleta = resultBoleta.rows[0].id_boleta;
        
        for (const producto of clave_valor_list){
            const {id_producto,precio,cantidad} = producto;
            await pool.query(`
                            WITH insert_detalle AS (
                                INSERT INTO boleta_producto (id_boleta, id_producto, precio_unidad, cantidad)
                                VALUES ($1, $2, $3, $4)
                                RETURNING id_producto, cantidad
                            )
                            UPDATE producto 
                            SET stock = producto.stock - insert_detalle.cantidad
                            FROM insert_detalle
                            WHERE producto.id_producto = insert_detalle.id_producto
                            RETURNING producto.stock AS stock_restante;`
                            ,[id_boleta,id_producto,precio,cantidad]);
        }
        
        // Eliminar productos del carrito después de la compra
        await pool.query("DELETE FROM cliente_producto WHERE id_cliente = $1", [id_cliente]);

        res.send("Exito en la compra")
    }
    catch(e){
        console.error("Error durante compra",e)
        res.status(500).send("Error durante la compra")
    }
}
