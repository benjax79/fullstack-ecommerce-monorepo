import style from "./RegisterPage.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const [registerStatus, setRegisterStatus] = useState(null); // null, 'success', 'error'
    const [errorMessage, setErrorMessage] = useState("");
    
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            // Si es 400, probablemente sean errores de validación de express-validator
            if (response.status === 400) {
                const errorData = await response.json();
                setRegisterStatus("error");
                // Unimos todos los mensajes de error con un salto de línea
                setErrorMessage(errorData.errores.join(" | "));
                return;
            }

            const data = await response.text();

            // Si el backend devuelve el string directo (ej. cuando el email ya existe en DB)
            if (data === "Usuario ya registrado") {
                setRegisterStatus("error");
                setErrorMessage(data);
                return;
            }

            if (response.ok) {
                setRegisterStatus("success");
                setTimeout(() => {
                    navigate("/sesion");
                }, 2000);
            } else {
                setRegisterStatus("error");
                setErrorMessage("Ocurrió un error al registrarse");
            }
        } catch (error) {
            setRegisterStatus("error");
            setErrorMessage("No se pudo conectar con el servidor");
        }
    };

    return(
        <div className={style.body}>
            <article className={style.register}>
                <h2 className={style.register_text}>Crear Cuenta</h2>
                <form onSubmit={handleRegister} className={style.form_register} >
                    
                    <input className={style.register_input} onChange={handleChange} type="text" name="nombre" placeholder="Tu nombre..." required />

                    <input className={style.register_input} onChange={handleChange} type="text" name="apellido" placeholder="Tu apellido..." required />

                    <input className={style.register_input} onChange={handleChange} type="email" name="email" placeholder="Tu correo electrónico..." required />

                    <input className={style.register_input} onChange={handleChange} type="password" name="password" placeholder="Crea una contraseña..." required />
                    
                    <button className={style.register_button} type="submit">Registrarse</button>
                </form>
                
                {registerStatus === "error" && <p className={style.error_message}>{errorMessage}</p>}
                {registerStatus === "success" && <p className={style.error_message} style={{backgroundColor: '#d4edda', color: '#155724'}}>¡Cuenta creada! Redirigiendo al login...</p>}

                <p className={style.login_text}>
                    ¿Ya tienes cuenta? <button className={style.login_link} onClick={() => navigate('/sesion')}>Inicia sesión</button>
                </p>
            </article>
        </div>
    )
}

export default RegisterPage;
