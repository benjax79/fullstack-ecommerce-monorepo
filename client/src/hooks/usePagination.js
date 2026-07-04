import { useState ,useEffect} from "react";
import { useSearchParams } from "react-router-dom";


export const usePagination = () => {
    
    
    const [productos,setProductos] = useState([]);
    const [offset,setoffset] = useState(0);
    const [atrasButtonIsDisabled,setAtrasButtonIsDisabled] = useState(true);
    const [adelanteButtonIsDisabled,setAdelanteButtonIsDisabled] = useState(false);
    const LIMIT =12;
    const [urlSearchParams]= useSearchParams()
    const searchParam = urlSearchParams.get("search");
    const searchColor = urlSearchParams.get("color");
    const searchCategoria = urlSearchParams.get("categoria");
    const searchPrecio_maximo = urlSearchParams.get("precio_maximo");
    const searchPrecio_minimo = urlSearchParams.get("precio_minimo");
    const searchOrden = urlSearchParams.get("orden"); // "ASC" o "DESC"

    useEffect(  ()=>{
      cargarProductos(0);
    },[]);

    useEffect( () =>{
        cargarProductos(0,searchParam)

    },[searchParam,searchPrecio_maximo,searchPrecio_minimo,searchColor,searchCategoria,searchOrden] );

    
 
    const cargarProductos=  async(newOffSet,textToSearch)=>{
        try{

            let datos;

            let consulta = [`http://localhost:3000/producto/searcher?limit=${LIMIT+1}&offset=${newOffSet}`];
            if(searchColor){
                consulta.push(`color=${searchColor}`)
            }
            if(searchCategoria){
                consulta.push(`categoria=${searchCategoria}`)
            }
            if(searchPrecio_maximo){
                consulta.push(`precio_maximo=${searchPrecio_maximo}`)
            }
            if(searchPrecio_minimo){
                consulta.push(`precio_minimo=${searchPrecio_minimo}`)
            }
            if(searchOrden){
                consulta.push(`orden=${searchOrden}`)
            }
            if(searchParam){
                consulta.push(`petition=${textToSearch}`)
            }

            consulta = consulta.join("&")
            
            
            
            datos = await fetch(consulta);
            
            let resultado=  await datos.json()
            if(newOffSet!==0 ){
                setAtrasButtonIsDisabled(false);    
            }
            else{
                setAtrasButtonIsDisabled(true)
            }

            if(resultado.length===LIMIT+1){   
                setAdelanteButtonIsDisabled(false)
                resultado.pop() // Quitamos producto comprobatorio de la vista
                                  
            }
            else{
                setAdelanteButtonIsDisabled(true)
                
            } 
            
            setProductos(resultado);
        }
        catch(error){
            console.error("Error inesperado",error)
        }
        
    }

    const handlerAdelanteButtonClick = () => {
        const newOffSet=offset+LIMIT
        cargarProductos(newOffSet,searchParam);
        setoffset(newOffSet);
    }
    const handlerAtrasButtonClick = () => {
        const newOffSet=offset-LIMIT
        cargarProductos(newOffSet,searchParam);
        setoffset(newOffSet);
    }

    



    return {
            handlerAtrasButtonClick,
            handlerAdelanteButtonClick,
            atrasButtonIsDisabled,
            adelanteButtonIsDisabled,
            productos
        }
        
    
}