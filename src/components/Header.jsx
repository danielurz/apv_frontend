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
            <p>Patient Manager of <span>Veterinary</span></p>
            <div className="routing">
                <Link to="/admin">Patients</Link>
                <Link to="/admin/perfil">Profile</Link>
                <button onClick={cerrarSesion}>Log out</button>
            </div>
        </div>
    </header>
  )
}

export default Header