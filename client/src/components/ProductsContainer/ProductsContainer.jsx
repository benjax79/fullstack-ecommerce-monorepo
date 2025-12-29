import style from "./ProductsContainer.module.css"
import ProductCard from "../ProductCard/ProductCard"
import { useState } from "react"



const LIMIT=12


function ProductsContainer({productos,setProductList}){
    const [offset,setoffset] = useState(0);
    const [limitAtrasButton,setlimitAtrasButton] = useState(true);
    const [limitAdelanteButton,setlimitAdelanteButton] = useState(false);
    function handlerAdelanteButtonClick(){
        const query_ =  async() =>  {
            const query = await fetch(`http://localhost:3000/producto?limit=${LIMIT+1}&offset=${offset+LIMIT}`);
            
            let resultado=  await query.json()
            if(resultado.length!==LIMIT+1){
                setlimitAdelanteButton(true)
                setoffset(offset+LIMIT)
                setProductList(resultado)
                setlimitAtrasButton(false)
                return
                
            }
            else{
                setlimitAtrasButton(false)
                setlimitAdelanteButton(false)
            }
            
            resultado.pop();
            setoffset(offset+LIMIT)
            setProductList(resultado)
        }
        query_()
    }

    function handlerAtrasButtonClick(){
        const query_ =  async() =>  {
            if(offset===LIMIT ){
                setlimitAtrasButton(true)
                setlimitAdelanteButton(false)
            }
            else{
                setlimitAtrasButton(false)
                setlimitAdelanteButton(false)
            }

            const query = await fetch(`http://localhost:3000/producto?limit=${LIMIT}&offset=${offset-LIMIT}`);
            
            let resultado=  await query.json()

            
            setoffset(offset-LIMIT)
            setProductList(resultado)
        }
        query_()
    }


    return(
        
        <div>
        <section className= {style.ProductsContainer}>
            
            {productos.map(({id_producto,...parametros}) =>  <ProductCard key={id_producto} {...parametros}></ProductCard> )}
            
                
            
        </section>
        <div className={style.buttons}>
                <button disabled={limitAtrasButton} onClick={handlerAtrasButtonClick} >Atras</button >
                <button disabled={limitAdelanteButton} onClick={handlerAdelanteButtonClick}>adelante</button>
        </div>
        </div>
        
    )
}

export default ProductsContainer