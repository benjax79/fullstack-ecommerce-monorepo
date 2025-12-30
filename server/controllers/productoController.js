import { pool } from "../config/db.js";

 export const  getItemById = async (req,res)=>{
    const {id_producto} =req.params;
    const query= await (await pool.query("SELECT * FROM producto WHERE id_producto=$1",[id_producto]));
    const result = query.rows[0]
    return res.json(result)
}

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

export const getSearchedItems = async (req,res) => {
    try{
        let {petition,limit,offset} = req.query;
        petition= `%${petition}%`;

        const query =  await pool.query("SELECT id_producto,nombre,precio,stock,imagen FROM producto WHERE nombre ilike $3 ORDER BY precio LIMIT $1 OFFSET $2",[limit,offset,petition]);
        const result = query.rows;
        res.json(result);
    }
    catch(error){
        res.send(console.error("Error terrible"),error)
    }
}