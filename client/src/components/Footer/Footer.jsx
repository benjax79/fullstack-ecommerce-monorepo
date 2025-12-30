import style from "./Footer.module.css"
function Footer (){

    return(
        <footer>
            <p>Copyrigth 2026</p>
            <div className={style.container}>
                <p className={style.contacto}>Contactame</p>
                <p className={style.inicio}>Voler al inicio</p>
            </div>
        </footer>
    )
}

export default Footer