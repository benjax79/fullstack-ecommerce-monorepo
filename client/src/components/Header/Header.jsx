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
            <div className={styles.navLinks}>
                <div className={styles.home_button}><Link to="/"><p>Inicio</p></Link></div>
                <div className={styles.product_button}> <Link to="/productos"><p >Productos</p></Link></div>
                <Link to="/carrito">
                    <div className={styles.shopping_cart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--text-main)'}}>
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </div>
                </Link>
                <Link to="/sesion"><div className={styles.login}>{user ?`Bienvenido ${user.nombre}`: loginText=`Iniciar sesion`}</div></Link>
            </div>
            
        </header>
    )
}



export default Header;