import {pool} from "../config/db.js";
import bscrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const register = async (req,res)=> {
    try {
        const {password,email,nombre,apellido}= req.body
        const query = await pool.query("SELECT * FROM cliente WHERE email = $1",[email]);

        if(query.rows.length>0){
            return res.send("Usuario ya registrado")
        }
        
        const salt = await bscrypt.genSalt(10);
        const hashedPassword = await bscrypt.hash(password,salt);

        await pool.query("INSERT INTO cliente(nombre,apellido,email,password) VALUES ($1,$2,$3,$4) ",[nombre,apellido,email,hashedPassword]);

        res.send(`Usuario ${nombre} ${apellido} creado correctamente con el email ${email}`);
    } catch(error) {
        console.error("Error al registrar:", error);
        res.status(500).send("Error del servidor al registrar usuario");
    }
}


export const login = async (req,res) => {
    try{
        const {email,password} = req.body;

        const data= await pool.query("SELECT nombre,password,email,id_cliente,is_admin FROM cliente WHERE email = $1", [email]);


        if(data.rows.length===0){
            return res.status(401).send("El usuario no existe");
        }
        const hashedDbPassword = data.rows[0].password;
        const {nombre,id_cliente,is_admin}=data.rows[0];

        const isValid = await bscrypt.compare(password,hashedDbPassword);

        if(isValid){
            const payload= {"nombre":nombre,"id_cliente":id_cliente,"email":email, "is_admin": is_admin}
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"});
            return res.status(200).json({token,user:{...payload}})
        }
        else{
            return res.status(401).send("Contraseña incorrecta")
            
        }
    }
    catch(error){
        console.error("Error inesperado en login:",error);
        res.status(500).send("Error del servidor al iniciar sesión");
    }
}
