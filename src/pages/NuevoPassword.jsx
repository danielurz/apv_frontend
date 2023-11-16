import {toast} from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"


function NuevoPassword() {

    const {token} = useParams()
    const navigate = useNavigate()

    const handleForm = async e => {
        e.preventDefault()

        const form = e.currentTarget
        const formdata = new FormData(form)
        
        const password = formdata.get("password")
        const rpassword = formdata.get("rpassword")

        if (password.length < 6) return toast.error("El password debe tener al menos 6 caracteres")
        if (password !== rpassword) return toast.error("Los passwords no coinciden")

        try {
            const url = `http://localhost:4000/vet/nuevo-password/${token}`
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({password}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)
            
            toast.success(response.success)
            form.reset()
            setTimeout(() => navigate('/'), 1000)

        } catch (error) {
            if (response?.error) return toast.error(`Client Error: ${error.message}`)
        }
    }

  return (
    <div id="NuevoPassword">
        <div className="enun">
            <p><span>Recupera el Acceso</span> de tu Cuenta</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Escribe tu nuevo password" name="password"/>    
                </div>
                <div className="field">
                    <label>REPETIR PASSWORD</label>
                    <input type="password" placeholder="Repite el password" name="rpassword"/>    
                </div>
                <input className="smtBtn" type="submit" value="ACTUALIZAR PASSWORD" style={{margin:"30px auto 0 auto",display:"block"}} />
            </form>
        </div>
    </div>
  )
}

export default NuevoPassword