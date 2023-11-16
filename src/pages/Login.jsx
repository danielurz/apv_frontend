import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context/Provider"

function Login() {

    const {autenticarUsuario} = useContext(Context)

    const handleForm = async e => {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        const email = formData.get("email")
        const password = formData.get("password")

        if ([email,password].includes("")) return toast.error("Completa ambos campos")

        try {
            const toastLoading = toast.loading("Loging in...")

            const url = `${import.meta.env.VITE_API_URL}/vet/login`
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({email,password}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            toast.dismiss(toastLoading)

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            localStorage.setItem("token", response.token)
            form.reset()
            autenticarUsuario()

        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        }
    }

  return (
    <div id="Login">
        <div className="enun">
            <p><span>Inicia Sesion y Administra</span> tus Pacientes</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" placeholder="Email de registro" name="email"/>    
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Tu password" name="password" />    
                </div>
                <input className="smtBtn" type="submit" value="INICIAR SESION" />
            </form>
            <nav>
                <Link to="/registrar">¿No tienes una cuenta? Registrate aqui</Link>
                <Link to="/olvide-password">¿Olvidaste tu password? Recuperala aqui</Link>
            </nav>
        </div>
    </div>
  )
}

export default Login