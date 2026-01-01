import Header from "../Header/Header.jsx"
import Footer from "../Footer/Footer.jsx"
import { Outlet } from "react-router-dom"

function Layout(){
    return(

        <div style={{backgroundColor:"pink"}}>
        <Header></Header>
        <main style={{minHeight:"80vh"}}>
        <Outlet/>
        </main>
        <Footer></Footer>
        
        </div>
    )



}

export default Layout