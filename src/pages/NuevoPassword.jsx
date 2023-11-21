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

        if (password.length < 6) return toast.error("The password must be at least 6 characters long")
        if (password !== rpassword) return toast.error("The passwords do not match")

        const toastLoading = toast.loading("Updating password...")

        try {
            const url = `${import.meta.env.VITE_API_URL}/vet/nuevo-password/${token}`
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
        } finally {
            toast.dismiss(toastLoading)
        }
    }

  return (
    <div id="NuevoPassword">
        <div className="enun">
            <p><span>Recover Access</span> to your Account</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Enter your new password" name="password"/>    
                </div>
                <div className="field">
                    <label>REPEAT PASSWORD</label>
                    <input type="password" placeholder="Repeat the password" name="rpassword"/>    
                </div>
                <input className="smtBtn" type="submit" value="UPDATE PASSWORD" style={{margin:"30px auto 0 auto",display:"block"}} />
            </form>
        </div>
    </div>
  )
}

export default NuevoPassword