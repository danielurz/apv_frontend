import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { Context } from "../context/Provider"
import { HiMenu } from "react-icons/hi";

function Header() {
    
    const {setUserData} = useContext(Context)
    const [isMenuChecked, setIsMenuChecked] = useState(false)
    
    const hideRouting = e => {
        if ((e.target.tagName === "A" || e.target.tagName === "BUTTON") && window.innerWidth < 730) {
            setIsMenuChecked(false)
        }
    }

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        setUserData({})
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 730) {
                setIsMenuChecked(true);
            } else {
                setIsMenuChecked(false);
            }
        };

        handleResize()
        
        window.addEventListener("resize", handleResize);
    
        // Cleanup function
        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, [])


  return (
    <header id="Header">
        <div className="box">
            <p className="title">Patient Manager of <span>Veterinary</span></p>
            <HiMenu className="menuIcon" onClick={() => setIsMenuChecked(!isMenuChecked)}/>
            <div className="routing"
                onClick={hideRouting}
                style={isMenuChecked ? {display: "flex"} : {display: "none"}}>
                <Link to="/admin">Patients</Link>
                <Link to="/admin/perfil">Profile</Link>
                <button onClick={cerrarSesion}>Log out</button>
            </div>
        </div>
    </header>
  )
}

export default Header