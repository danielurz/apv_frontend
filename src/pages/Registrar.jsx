import { Link } from "react-router-dom"
import {toast} from "react-hot-toast"

function Registrar() {


  const handleForm = async e => {
    e.preventDefault()

    const formdata = new FormData(e.currentTarget)

    const nombre = formdata.get("nombre")
    const email = formdata.get("email")
    const password = formdata.get("password")
    const rpassword = formdata.get("rpassword")
    
    if ([nombre,email,password].includes("")) return toast.error("Todos los campos son obligatorios")
    if (password.length < 6) return toast.error("El password debe ser de al menos 6 caracteres")
    if (password !== rpassword) return toast.error("Los password no coinciden")


    try {
      const url = "http://localhost:4000/vet/"
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({nombre,email,password}),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json())

      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server error: ${response.serverError}`)

      toast.success(response.success)
      e.target.reset()

    } catch (error) {
        toast.error(`Error al registrar: ${error}`)
    }
  }


  return (
    <div id="Registrar">
        <div className="enun">
            <p><span>Crea tu Cuenta y Administra</span> tus Pacientes</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>NOMBRE</label>
                    <input type="text" placeholder="Tu nombre" name="nombre" />    
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" placeholder="Email de registro" name="email" />    
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Tu password"  name="password" />    
                </div>
                <div className="field">
                    <label>RETEPTIR PASSWORD</label>
                    <input type="password" placeholder="Repite tu password" name="rpassword" />    
                </div>
                <input className="smtBtn" type="submit" value="REGISTRARSE" />
            </form>
            <nav>
                <Link to="/">¿Ya tienes una cuenta? Ingresa aqui</Link>
                <Link to="/olvide-password">¿Olvidaste tu password? Recuperala aqui</Link>
            </nav>
        </div>
    </div>
  )
}

export default Registrar