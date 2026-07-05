import style from "./Footer.module.css"
function Footer (){

    return(
        <footer className={style.footer}>
            <div className={style.content}>
                <div className={style.brandSection}>
                    <h3 className={style.brand}>Pinky Cosmetics</h3>
                    <p className={style.tagline}>La belleza está en ti, nosotros solo la resaltamos.</p>
                </div>
                
                <div className={style.linksSection}>
                    <h4>Contacto</h4>
                    <ul>
                        <li><span className={style.link}>soporte@pinky.com</span></li>
                        <li><span className={style.link}>+56 9 1234 5678</span></li>
                    </ul>
                </div>
            </div>
            
            <div className={style.bottom}>
                <p>&copy; 2026 Pinky Cosmetics. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer