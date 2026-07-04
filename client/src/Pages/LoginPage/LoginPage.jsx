import style from "./LoginPage.module.css"
import { useAuth } from "../../context/AuthContext.jsx"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage(){

   
    const navigate = useNavigate();
    const {user,login,logOut}= useAuth();
    const [loginFail, setLoginFail]= useState(false)
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
        const resultStatus= await login(email,password) ;

        if(resultStatus){
            setLoginFail(false);
            navigate('/');
        }
        else{
            setLoginFail(true);
            setTimeout(() => {
               setLoginFail(false) 
            },2500 );
        }


    }
    const handleCloseSession=()=>{
        logOut();
    }

    if(user){
        return(
            <div className={style.dashboardContainer}>
                <h1 className={style.dashboardTitle}>¡Hola, {user.nombre}!</h1>
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
        )
    }


    return(
        <>
        <article className={style.article}>
            <form onSubmit={handleLogin} className={style.form} >
            <label htmlFor="email" >Correo</label>
            <input onChange={handleEmail} type="email"  name="email" placeholder="Ingrese su correo ..." required ></input>

            <label htmlFor="password" >contraseña</label>
            <input onChange={handlePassword} type="password" name="password" placeholder="Ingrese su contraseña ..." required></input>
            <button>Iniciar sesion</button>
            
            </form>
            <p 
                style={{textAlign: 'center', marginTop: '20px', fontSize: '1.5vw', color: 'blue', cursor: 'pointer', textDecoration: 'underline'}}
                onClick={() => navigate('/registro')}
            >
                ¿No tienes cuenta? Regístrate aquí
            </p>
        </article>
        {loginFail&&<p className={style.errorMessage}>Credenciales incorrectas</p>}
        </>
    )
}


export default LoginPage;