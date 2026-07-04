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
    const query=await pool.query("SELECT id_producto,nombre,precio,stock,imagen FROM producto ORDER BY precio LIMIT $1 OFFSET $2",[limit,offset]);
    const result =query.rows;
    res.json(result); // Array de jsons
    }
    catch(error){
        res.send(console.error("Error terrible"),error)
    }
    
    
}

// Busqueda de items por nombre y filtros activados
export const getSearchedItems = async (req,res) => {
    try{
        
        let {petition,limit,offset,...valores} = req.query;
        limit= Math.min(50,limit);
        let contador_inicial = 3; // Es 3 porque limit, offset y petition ocuparan los primeros 3 lugares
        
        let parametros = [limit,offset];
        let consulta = ["SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE 1=1"];
        
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


        /*
        if (color){
            query =  await pool.query("SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE nombre ilike $3 and color = $4 ORDER BY precio LIMIT $1 OFFSET $2",[limit,offset,petition,color]);
        }
        else{
            query =  await pool.query("SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE nombre ilike $3 ORDER BY precio LIMIT $1 OFFSET $2",[limit,offset,petition]);
        }
        */
        const result = query.rows;
        res.json(result);
    }
    catch(error){
        res.send(console.error("Error terrible"),error)
    }
}


export const getAllColors = async(req,res) =>{
    const solicitud = "SELECT DISTINCT color from producto where stock > 0";
    let respuesta = await pool.query(solicitud)
    respuesta = respuesta.rows
    res.json(respuesta);
}

export const getAllCategories = async(req,res) =>{
    const solicitud = "SELECT DISTINCT categoria from producto where stock > 0";
    let respuesta = await pool.query(solicitud)
    respuesta = respuesta.rows
    res.json(respuesta);
}