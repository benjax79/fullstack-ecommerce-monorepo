import style from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className={style.container}>
            <h1 className={style.code}>404</h1>
            <p className={style.message}>¡Ups! Esta página no existe.</p>
            <p className={style.hint}>Puede que la dirección esté mal escrita o que la página haya sido eliminada.</p>
            <Link to="/" className={style.backButton}>Volver al Inicio</Link>
        </div>
    );
}

export default NotFoundPage;
