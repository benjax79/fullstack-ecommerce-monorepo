import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import cart from "../../assets/shoppingCartImg.png"
import Searcher from "../Searcher/Searcher.jsx"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx";

function Header(){

    const {user}=useAuth();
    let loginText;
   
    


    return (
        <header className = {styles.header}>
            <div className={styles.logo}>
                <img  src={logo} alt="Logo image" />
            </div>
            <div className={styles.searcher}>
                <Searcher  ></Searcher>
            </div>
            <div className={styles.home_button}><Link to="/"><p>Inicio</p></Link></div>
            <div className={styles.product_button}> <Link to="/productos"><p >Productos</p></Link></div>
            <Link to="/carrito">
                <div className={styles.shopping_cart}>
                    <img  src={cart} alt="shopping cart image" />
                </div>
            </Link>
            <Link to="/sesion"><div className={styles.login}>{user ?`Bienvenido ${user.nombre}`: loginText=`Iniciar sesion`}</div></Link>
            
        </header>
    )
}



export default Header;