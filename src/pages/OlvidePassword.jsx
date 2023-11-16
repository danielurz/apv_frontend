import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"

function OlvidePassword() {

    const handleForm = async e => {
        e.preventDefault()

        const form = e.currentTarget
        const formdata = new FormData(form)
        const email = formdata.get("email")

        if (email === "") return toast.error("Llena el campo")

        try {
            const url = "http://localhost:4000/vet/olvido-password"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            }).then(res => res.json())

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            toast.success(response.success)
            form.reset()

        } catch (error) {
            toast.error(`Error en el cliente: ${error.message}`)
        }
    }

  return (
    <div id="OlvidePassword">
        <div className="enun">
            <p><span>Recupera el Acceso</span> de tu Cuenta</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" placeholder="Email de registro" name="email"/>    
                </div>
                <input className="smtBtn" type="submit" value="RECUPERAR PASSWORD" />
            </form>
            <nav>
                <Link to="/">¿Ya tienes una cuenta? Ingresa aqui</Link>
                <Link to="/registrar">¿No tienes una cuenta? Registrate aqui</Link>
            </nav>
        </div>
    </div>
  )
}

export default OlvidePassword