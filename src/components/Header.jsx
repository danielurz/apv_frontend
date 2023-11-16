import { Link } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context/Provider"

function Header() {

    const {setUserData} = useContext(Context)

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setUserData({})
    }

  return (
    <header id="Header">
        <div className="box">
            <p>Administrador de Pacientes de <span>Veterinaria</span></p>
            <div className="routing">
                <Link to="/admin">Pacientes</Link>
                <Link to="/admin/perfil">Perfil</Link>
                <button onClick={cerrarSesion}>Cerrar Sesion</button>
            </div>
        </div>
    </header>
  )
}

export default Header