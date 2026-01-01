import { useState ,useEffect} from "react";
import { useSearchParams } from "react-router-dom";


export const usePagination = () => {
    
    
    const [productos,setProductos] = useState([]);
    const [offset,setoffset] = useState(0);
    const [atrasButtonIsDisabled,setAtrasButtonIsDisabled] = useState(true);
    const [adelanteButtonIsDisabled,setAdelanteButtonIsDisabled] = useState(false);
    const LIMIT =12;
    const [urlSearchParams]= useSearchParams()
    const searchParam= urlSearchParams.get("search");

    useEffect(  ()=>{
      cargarProductos(0);
    },[]);

    useEffect( () =>{
        cargarProductos(0,searchParam)

    },[searchParam] );

    
    const cargarProductos=  async(newOffSet,textToSearch="")=>{
        try{
            let datos;
            if(textToSearch){
                datos = await fetch(`http://localhost:3000/producto/searcher?limit=${LIMIT+1}&offset=${newOffSet}&petition=${textToSearch}`);
            }
            else{
                datos = await fetch(`http://localhost:3000/producto?limit=${LIMIT+1}&offset=${newOffSet}`);

            }
            
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