import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import Searcher from "../Searcher/Searcher.jsx"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

function Header(){

    const {user}=useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    let loginText;

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className = {styles.header}>
            <div className={styles.topBar}>
                <Link to="/" className={styles.logo} onClick={closeMenu}>
                    <img  src={logo} alt="Logo image" />
                </Link>
                <div className={styles.searcherDesktop}>
                    <Searcher />
                </div>
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menú">
                    <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.hamburgerLine} ${menuOpen ? styles.open : ''}`}></span>
                </button>

                {/* Links de escritorio (se ocultan en móvil) */}
                <div className={styles.navLinksDesktop}>
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
            </div>

            {/* Panel lateral móvil + overlay */}
            <div className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`} onClick={closeMenu}></div>
            <nav className={`${styles.navPanel} ${menuOpen ? styles.navPanelOpen : ''}`}>
                <div className={styles.searcherMobile}>
                    <Searcher />
                </div>
                <Link to="/" onClick={closeMenu} className={styles.navItem}>Inicio</Link>
                <Link to="/productos" onClick={closeMenu} className={styles.navItem}>Productos</Link>
                <Link to="/carrito" onClick={closeMenu} className={styles.navItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    Carrito
                </Link>
                <Link to="/sesion" onClick={closeMenu} className={styles.navItemLogin}>
                    {user ? `Bienvenido ${user.nombre}` : 'Iniciar sesión'}
                </Link>
            </nav>


            
        </header>
    )
}



export default Header;