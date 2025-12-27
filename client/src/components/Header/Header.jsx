import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import cart from "../../assets/shoppingCartImg.png"
function Header(){



    return (
        <header className = {styles.header}>
            <div className={styles.logo}>
                <img  src={logo} alt="Logo image" />
            </div>
            <div className={styles.searcher}>buscador: </div>
            <div className={styles.home_button}>Inicio</div>
            <div className={styles.product_button}>Productos</div>
            <div className={styles.shopping_cart}>
                <img  src={cart} alt="shopping cart image" />
            </div>
            <div className={styles.login}>Iniciar sesion</div>
            
        </header>
    )
}



export default Header;