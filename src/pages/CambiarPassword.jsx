import AdminNav from "../components/AdminNav"
import { ToastBar, toast } from "react-hot-toast"
import { useContext } from "react"
import { Context } from "../context/Provider"


function CambiarPassword() {
    
    const {userData} = useContext(Context)

    const handleForm = async e => {
        e.preventDefault()

        const form = e.currentTarget
        const formdata = new FormData(form)

        const actualPassword = formdata.get("actualPassword")
        const newPassword = formdata.get("newPassword")
        const repeatPassword = formdata.get("repeatPassword")

        if ([actualPassword,newPassword,repeatPassword].includes("")) return toast.error("Completa todos los campos")
        if (newPassword.length < 6) return toast.error("El password es muy corto")
        if (newPassword !== repeatPassword) return toast.error("Los passwords no coinciden")

        try {
            const url = `http://localhost:4000/vet/actualizar-password/${userData._id}`
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify({password: actualPassword, newPassword}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            toast.success(response.success)
            form.reset()
            
        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        }

    }

  return (
    <>
        <AdminNav/>
        <div id="CambiarPassword">
            <div className="hero">
                <h1>Cambiar Password</h1>
                <h3>Modifica tu <span>password aqui</span></h3>
            </div>
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>PASSWORD ACTUAL</label>
                    <input type="password" name="actualPassword" />
                </div>
                <div className="field">
                    <label>PASSWORD NUEVO</label>
                    <input type="password" name="newPassword" />
                </div>
                <div className="field">
                    <label>REPETIR PASSWORD</label>
                    <input type="password" name="repeatPassword" />
                </div>
                <input type="submit" value="ACTUALIZAR PASSWORD" className="smtBtn" />
            </form>
        </div>
    </>
  )
}

export default CambiarPassword