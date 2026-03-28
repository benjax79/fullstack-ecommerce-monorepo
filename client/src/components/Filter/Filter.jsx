import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import style from "./Filter.module.css"
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";


function Filter(){
    
            
    
    const navegador = useNavigate()
    const localizacion = useLocation()
    const path = localizacion.pathname;
    const timer = useRef(null)
    let parametros = localizacion.search;  
    const [coloresDisponibles,setColoresDisponibles] = useState( ["rojo"])

    

    useEffect( ()=> {
        const llamada = async ()=>{
            const req = await fetch("http://localhost:3000/producto/color");
            const array_json = await req.json()
            const respuesta = array_json.map( (objeto) => objeto.color)
            setColoresDisponibles(respuesta);
            }
            llamada()
        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    
    const filtrarColor = (color) => {
        // Limpiamos posible temporizados anterior
        clearTimeout(timer.current);

        let parametross= parametros;

        if(parametross.includes(color)){
            if(parametross.includes("&")){
                parametross = parametross.replace(`&color=${color}`,"")
                let url_final = path + parametross
                navegador(url_final)
                return;
            }
            else{
                parametross = parametross.replace(`color=${color}`,"")
                let url_final = path + parametross
                navegador(url_final)
                return;

            }
        }
        // Filtramos el mismo parametros si es que ya estaba
        parametross = parametross.split("&").filter( (contenido) => !contenido.includes("color")).join("&"); 
        
        const url_actual = path + parametross;
        
        
        
        const parametro = `&color=${color}`
        let url_final = url_actual + parametro;

        // Si no tiene ? significa que nunca se busco
        if(!url_final.includes("?")){
            url_final = path + `?color=${color}`
        }
        timer.current = setTimeout(() => {
            navegador(url_final);

        }, 300);
    }

     const  filtrarPrecioMaximo= (evento) => {
        // Limpiamos posible temporizados anterior
        clearTimeout(timer.current);

        // Filtramos el mismo parametros si es que ya estaba
        let parametross = parametros.split("&").filter( (contenido) => !contenido.includes("precio_maximo")).join("&"); 
        
        const url_actual = path + parametross;
        const precioMaximo = evento.target.value;
        
        
        const parametro = `&precio_maximo=${precioMaximo}`
        let url_final = url_actual + parametro;

        // Si no tiene ? significa que nunca se busco
        if(!url_final.includes("?")){
            url_final = path + `?precio_maximo=${precioMaximo}`
        }
        timer.current = setTimeout(() => {
            navegador(url_final);

        }, 300);

        
        
    }


    return(
        <section className={style.filter}>
            <div className={style.precio_maximo}>
                <p>Precio maximo</p>
                <input onChange={filtrarPrecioMaximo}/>
            </div>
                <details>
                    <summary className={style.titulo_lista}>Colores disponibles</summary>
                    {coloresDisponibles.map( (color,indice) => (
                        <li key={indice} onClick={()=>filtrarColor(color)} className={style.lista}>{color}</li>
                    )

                    )}
                </details>
                
             <div>
                <p>Categoria 1</p>
            </div>
             <div>
                <p>Categoria 1</p>
            </div>
             <div>
                <p>Categoria 1</p>
            </div>
             <div>
                <p>Categoria 1</p>
            </div>
             <div>
                <p>Categoria 1</p>
            </div>
             <div>
                <p>Categoria 1</p>
            </div>
        </section>
    )
}

export default Filter 