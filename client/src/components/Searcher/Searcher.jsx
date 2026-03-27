import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./Searcher.module.css"


function Searcher(){

    const navigation = useNavigate()
    const timerRef = useRef(null)

    // Limpieza de componente
    useEffect( ()=> {
        return () => {
            clearTimeout(timerRef.current);
        } 
    }, [])

    const writeOnNavegator= (event) => {
        const texto =event.target.value;
        clearTimeout(timerRef.current);
        const new_time_out = setTimeout(() => {
            navigation(`/productos?search=${encodeURIComponent(texto)}`)
        }, 300);
        timerRef.current= new_time_out;
    }
    
    return(
        <div >    
        <input className={style.searcher}  onChange={writeOnNavegator} type="text" placeholder="Escriba lo que desee buscar ..."/>
        </div>
    )
}

export default Searcher