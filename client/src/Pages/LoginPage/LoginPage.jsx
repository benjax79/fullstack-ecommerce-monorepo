import style from "./LoginPage.module.css"
import { useAuth } from "../../context/AuthContext.jsx"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage(){

   
    const navigate = useNavigate();
    const {user,login,logOut}= useAuth();
    const [loginError, setLoginError]= useState(null)
    const [email,setEmail]=useState("");
    const [password,setPassword]= useState("");

    const handleEmail= (event)=>{
        const valor=event.target.value
        setEmail(valor)
    }
    const handlePassword= (event)=>{
        const valor=event.target.value
        setPassword(valor)
    }
    const handleLogin= async(event)=>{
        event.preventDefault()
        const result = await login(email,password) ;

        if(result.success){
            setLoginError(null);
            navigate('/');
        }
        else{
            setLoginError(result.error);
            // El mensaje desaparecerá después de 5 segundos
            setTimeout(() => {
               setLoginError(null) 
            }, 5000 );
        }
    }
    const handleCloseSession=()=>{
        logOut();
    }

    if(user){
        return(
            <div className={style.body}>
                <div className={style.login}>
                    <h1 className={style.login_text}>¡Hola, {user.nombre}!</h1>
                    <p className={style.dashboardSubtitle}>Bienvenido a tu panel de usuario</p>
                    
                    <div className={style.dashboardActions}>
                        {user.is_admin && (
                            <button 
                                className={style.adminButton} 
                                onClick={() => navigate('/admin')}
                            >
                                Panel de Administrador
                            </button>
                        )}
                        
                        <button 
                            className={style.historyButton} 
                            onClick={() => navigate('/mis-compras')}
                        >
                            Ver Historial de Compras
                        </button>
                        
                        <button 
                            onClick={handleCloseSession} 
                            className={style.closeSessionDashboard}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className={style.body}>
            <article className={style.login}>
                <h1 className={style.login_text}>Iniciar Sesión</h1>
                <form onSubmit={handleLogin} className={style.form_login} >
                    
                    <input className={style.login_input} onChange={handleEmail} type="email" name="email" placeholder="Ingrese su correo ..." required />

                    <input className={style.login_input} onChange={handlePassword} type="password" name="password" placeholder="Ingrese su contraseña ..." required />
                    
                    <div className={style.login_button_div}>
                        <button className={style.login_button}>Iniciar sesión</button>
                    </div>
                </form>
                
                {loginError && <p className={style.login_error_text}>{loginError}</p>}

                <button 
                    className={style.register_button}
                    onClick={() => navigate('/registro')}
                >
                    ¿No tienes cuenta? Regístrate aquí
                </button>
            </article>
        </div>
    )
}


export default LoginPage;