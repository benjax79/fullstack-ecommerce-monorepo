import { pool } from "../config/db.js"

export const agregarAlCarrito = async(req,res)=>{
    try{
        const { id_producto, cantidad = 1 } = req.body;
        const id_cliente = req.user.id_cliente;

        // 1. Verificar stock actual del producto
        const productCheck = await pool.query("SELECT stock, nombre FROM producto WHERE id_producto = $1", [id_producto]);
        
        if (productCheck.rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        const stock_disponible = productCheck.rows[0].stock;
        
        // 2. Verificar cuánto tiene ya el cliente en el carrito
        const cartCheck = await pool.query(
            "SELECT cantidad FROM cliente_producto WHERE id_cliente = $1 AND id_producto = $2", 
            [id_cliente, id_producto]
        );
        
        const cantidad_en_carrito = cartCheck.rows.length > 0 ? cartCheck.rows[0].cantidad : 0;
        
        // 3. Validar si excede el stock
        if (cantidad_en_carrito + cantidad > stock_disponible) {
            return res.status(400).json({ 
                error: `No hay suficiente stock. Ya tienes ${cantidad_en_carrito} en el carrito y el stock total es ${stock_disponible}.` 
            });
        }

        await pool.query(
            `INSERT INTO cliente_producto (id_cliente, id_producto, cantidad)
             VALUES ($1, $2, $3)
             ON CONFLICT (id_cliente, id_producto)
             DO UPDATE SET cantidad = cliente_producto.cantidad + EXCLUDED.cantidad`,
            [id_cliente, id_producto, cantidad]
        );
        res.status(200).send("Exito en la operacion")
    }   
    
    catch(error){
        res.status(500).send("Fallo al agregar al carrito")
        console.error("Error al agregar carrito",error)
    }
}

export const eliminarDeCarrito = async (req,res)=>{
     try{
        const {id_producto}= req.body;
        const id_cliente = req.user.id_cliente;
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
        // Ignoramos req.params.id_cliente y usamos la identidad del token
        const id_cliente = req.user.id_cliente;
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
    const client = await pool.connect(); // Obtener conexión dedicada para la transacción
    
    try{
        const { productos, direccion_envio, metodo_pago} = req.body;
        const id_cliente = req.user.id_cliente;
        const clave_valor_list = productos.items;
        
        // ========== INICIAR TRANSACCIÓN ==========
        await client.query("BEGIN");
        
        // 1. Validar stock de TODOS los productos antes de hacer cualquier cambio
        for (const producto of clave_valor_list) {
            const { id_producto, cantidad } = producto;
            
            // FOR UPDATE bloquea la fila para que nadie más la modifique hasta que termine la transacción
            const stockCheck = await client.query(
                "SELECT nombre, stock FROM producto WHERE id_producto = $1 FOR UPDATE",
                [id_producto]
            );
            
            if (stockCheck.rows.length === 0) {
                await client.query("ROLLBACK");
                return res.status(400).json({ 
                    error: `El producto con ID ${id_producto} no existe.` 
                });
            }
            
            const { nombre, stock } = stockCheck.rows[0];
            
            if (stock < cantidad) {
                await client.query("ROLLBACK");
                return res.status(400).json({ 
                    error: `Stock insuficiente de "${nombre}". Disponible: ${stock}, solicitado: ${cantidad}.` 
                });
            }
        }
        
        // 2. Calcular el precio total
        let precio_total = 0;
        for (const producto of clave_valor_list) {
            precio_total += producto.precio * producto.cantidad;
        }
        
        // 3. Crear la boleta
        const resultBoleta = await client.query(
            "INSERT INTO boleta (id_cliente, precio_total, direccion_envio, metodo_pago) VALUES ($1, $2, $3, $4) RETURNING id_boleta",
            [id_cliente, precio_total, direccion_envio, metodo_pago]
        );
        const id_boleta = resultBoleta.rows[0].id_boleta;
        
        // 4. Insertar detalle de cada producto y descontar stock
        for (const producto of clave_valor_list){
            const {id_producto, precio, cantidad} = producto;
            
            // Insertar en boleta_producto
            await client.query(
                "INSERT INTO boleta_producto (id_boleta, id_producto, precio_unidad, cantidad) VALUES ($1, $2, $3, $4)",
                [id_boleta, id_producto, precio, cantidad]
            );
            
            // Descontar stock
            await client.query(
                "UPDATE producto SET stock = stock - $1 WHERE id_producto = $2",
                [cantidad, id_producto]
            );
        }
        
        // 5. Eliminar productos del carrito después de la compra
        await client.query("DELETE FROM cliente_producto WHERE id_cliente = $1", [id_cliente]);

        // ========== CONFIRMAR TRANSACCIÓN ==========
        await client.query("COMMIT");
        
        res.status(200).json({ mensaje: "¡Compra exitosa!", id_boleta });
    }
    catch(e){
        // ========== REVERTIR TODO SI ALGO FALLA ==========
        await client.query("ROLLBACK");
        console.error("Error durante compra:", e);
        res.status(500).send("Error durante la compra");
    }
    finally {
        // Siempre devolver la conexión al pool
        client.release();
    }
}
