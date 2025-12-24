import styles from "./Header.module.css"

function Header(){



    return (
        <header className = {styles.header}>
            <div className={styles.logo}>1</div>
            <div className={styles.searcher}>buscador: </div>
            <div className={styles.home_button}>Inicio</div>
            <div className={styles.product_button}>Productos</div>
            <div className={styles.shopping_cart}>Carrito</div>
            <div className={styles.login}>Iniciar sesion</div>
            
        </header>
    )
}



export default Header;