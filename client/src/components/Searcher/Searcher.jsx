import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./Searcher.module.css"


function Searcher(){


    const navigation = useNavigate()
   
    
    const writeOnNavegator= (event) => {
    const texto =event.target.value;
    navigation(`/productos?search=${texto}`)
    }
    

    

    return(
        <div >
                        
        <input className={style.searcher}  onChange={writeOnNavegator} type="text" placeholder="Escriba lo que desee buscar ..."/>
                
           
        </div>
    )
}



export default Searcher