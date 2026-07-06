import { pool } from "../config/db.js";

 export const  getItemById = async (req,res)=>{
    const {id_producto} =req.params;
    const query= await (await pool.query("SELECT * FROM producto WHERE id_producto=$1",[id_producto]));
    const result = query.rows[0]
    return res.json(result)
}
// Items por defecto url = producto/
export const getGroupedItems = async (req,res) =>{
    
    
    
    try{
    let {limit,offset}   =req.query;

    limit= Math.min(50,limit);
    const query=await pool.query("SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE activo = true ORDER BY precio LIMIT $1 OFFSET $2",[limit,offset]);
    const result =query.rows;
    res.json(result); // Array de jsons
    }
    catch(error){
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error del servidor al obtener productos");
    }
    
    
}

// Busqueda de items por nombre y filtros activados
export const getSearchedItems = async (req,res) => {
    try{
        
        let {petition,limit,offset,...valores} = req.query;
        limit= Math.min(50,limit);
        let contador_inicial = 3; // Es 3 porque limit, offset y petition ocuparan los primeros 3 lugares
        
        let parametros = [limit,offset];
        let consulta = ["SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE activo = true"];
        
        if(valores.color){
            consulta.push(`color = $${contador_inicial}`)
            parametros.push(valores.color)
            contador_inicial++;
        }
        if(valores.categoria){
            consulta.push(`categoria = $${contador_inicial}`)
            parametros.push(valores.categoria)
            contador_inicial++;
        }
        if(valores.precio_maximo){
            consulta.push(`precio <= $${contador_inicial}`)
            parametros.push(valores.precio_maximo)
            contador_inicial++;
        }
        if(valores.precio_minimo){
            consulta.push(`precio >= $${contador_inicial}`)
            parametros.push(valores.precio_minimo)
            contador_inicial++;
        }
        if(petition){
            petition= `%${petition}%`;
            consulta.push(`nombre ilike $${contador_inicial}`)
            parametros.push(petition)
            contador_inicial++;
        }

        consulta = consulta.join(" AND ");
        
        let orden_sql = "ASC";
        if (valores.orden === "DESC") {
            orden_sql = "DESC";
        }

        const consulta_lista = [consulta,` ORDER BY precio ${orden_sql} LIMIT $1 OFFSET $2`].join("");
        const query = await pool.query(consulta_lista,parametros); 


        const result = query.rows;
        res.json(result);
    }
    catch(error){
        console.error("Error al buscar productos:", error);
        res.status(500).send("Error del servidor al buscar productos");
    }
}


export const getAllColors = async(req,res) =>{
    const solicitud = "SELECT DISTINCT color from producto where stock > 0 AND activo = true";
    let respuesta = await pool.query(solicitud)
    respuesta = respuesta.rows
    res.json(respuesta);
}

export const getAllCategories = async(req,res) =>{
    const solicitud = "SELECT DISTINCT categoria from producto where stock > 0 AND activo = true";
    let respuesta = await pool.query(solicitud)
    respuesta = respuesta.rows
    res.json(respuesta);
}

// ADMIN: Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { nombre, categoria, color, stock, precio, descripcion, imagen } = req.body;
        
        const query = await pool.query(
            `INSERT INTO producto (nombre, categoria, color, stock, precio, descripcion, imagen, activo) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, true) 
             RETURNING *`,
            [nombre, categoria, color, stock, precio, descripcion, imagen]
        );
        
        res.status(201).json(query.rows[0]);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).send("Error del servidor al crear producto");
    }
};

// ADMIN: Obtener todos los productos activos para el panel
export const getAllProductsAdmin = async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM producto WHERE activo = true ORDER BY id_producto DESC");
        res.status(200).json(query.rows);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error del servidor");
    }
};

// ADMIN: Eliminar producto (Borrado Lógico)
export const deleteProduct = async (req, res) => {
    try {
        const { id_producto } = req.params;
        await pool.query("UPDATE producto SET activo = false WHERE id_producto = $1", [id_producto]);
        res.status(200).send("Producto eliminado exitosamente");
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send("Error del servidor al eliminar producto");
    }
};

// ADMIN: Actualizar producto existente
export const updateProduct = async (req, res) => {
    try {
        const { id_producto } = req.params;
        const { nombre, categoria, color, stock, precio, descripcion, imagen } = req.body;
        
        const query = await pool.query(
            `UPDATE producto 
             SET nombre = $1, categoria = $2, color = $3, stock = $4, precio = $5, descripcion = $6, imagen = $7 
             WHERE id_producto = $8 
             RETURNING *`,
            [nombre, categoria, color, stock, precio, descripcion, imagen, id_producto]
        );
        
        if (query.rows.length === 0) {
            return res.status(404).send("Producto no encontrado");
        }
        
        res.status(200).json(query.rows[0]);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).send("Error del servidor al actualizar producto");
    }
};