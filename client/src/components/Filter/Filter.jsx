import { useLocation, useNavigate } from "react-router-dom";
import style from "./Filter.module.css";
import { useRef, useEffect, useState } from "react";

function Filter() {
    const navegador = useNavigate();
    const localizacion = useLocation();
    const path = localizacion.pathname;
    const timer = useRef(null);
    
    // Obtenemos los parámetros actuales de la URL de forma segura
    const searchParams = new URLSearchParams(localizacion.search);
    
    const [coloresDisponibles, setColoresDisponibles] = useState([]);
    const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);

    useEffect(() => {
        const cargarFiltros = async () => {
            try {
                // Cargar Colores
                const resColor = await fetch(`${import.meta.env.VITE_API_URL}/producto/color`);
                const colores = await resColor.json();
                setColoresDisponibles(colores.map(obj => obj.color));
                
                // Cargar Categorías
                const resCat = await fetch(`${import.meta.env.VITE_API_URL}/producto/categoria`);
                const categorias = await resCat.json();
                setCategoriasDisponibles(categorias.map(obj => obj.categoria));
            } catch (error) {
                console.error("Error cargando filtros:", error);
            }
        };
        cargarFiltros();
        
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    // Función genérica para actualizar la URL usando URLSearchParams
    const actualizarFiltro = (clave, valor) => {
        clearTimeout(timer.current);
        
        const params = new URLSearchParams(localizacion.search);
        
        if (valor) {
            // Si el mismo valor ya estaba (ej. click en el mismo color), lo quitamos (toggle)
            if (params.get(clave) === valor && clave !== 'orden' && clave !== 'precio_maximo' && clave !== 'precio_minimo') {
                params.delete(clave);
            } else {
                params.set(clave, valor);
            }
        } else {
            // Si el valor es vacío (borraron el input), eliminamos la clave
            params.delete(clave);
        }

        const url_final = `${path}?${params.toString()}`;
        
        timer.current = setTimeout(() => {
            navegador(url_final);
        }, 300);
    };

    return (
        <section className={style.filter}>
            <div className={style.precio_maximo}>
                <p>Ordenar por</p>
                <select 
                    onChange={(e) => actualizarFiltro("orden", e.target.value)}
                    value={searchParams.get("orden") || "ASC"}
                    style={{ width: "100%", padding: "5px" }}
                >
                    <option value="ASC">Menor precio</option>
                    <option value="DESC">Mayor precio</option>
                </select>
            </div>

            <details>
                <summary className={style.titulo_lista}>Categorías</summary>
                {categoriasDisponibles.map((cat, indice) => (
                    <li 
                        key={indice} 
                        onClick={() => actualizarFiltro("categoria", cat)} 
                        className={style.lista}
                        style={{ fontWeight: searchParams.get("categoria") === cat ? "bold" : "normal" }}
                    >
                        {cat}
                    </li>
                ))}
            </details>

            <details>
                <summary className={style.titulo_lista}>Colores disponibles</summary>
                {coloresDisponibles.map((color, indice) => (
                    <li 
                        key={indice} 
                        onClick={() => actualizarFiltro("color", color)} 
                        className={style.lista}
                        style={{ fontWeight: searchParams.get("color") === color ? "bold" : "normal" }}
                    >
                        {color}
                    </li>
                ))}
            </details>
            
            <div className={style.precio_maximo}>
                <p>Precio mínimo</p>
                <input 
                    type="number" 
                    placeholder="Ej. 1000"
                    defaultValue={searchParams.get("precio_minimo") || ""}
                    onChange={(e) => actualizarFiltro("precio_minimo", e.target.value)} 
                />
            </div>

            <div className={style.precio_maximo}>
                <p>Precio máximo</p>
                <input 
                    type="number" 
                    placeholder="Ej. 50000"
                    defaultValue={searchParams.get("precio_maximo") || ""}
                    onChange={(e) => actualizarFiltro("precio_maximo", e.target.value)} 
                />
            </div>
            
        </section>
    );
}

export default Filter;