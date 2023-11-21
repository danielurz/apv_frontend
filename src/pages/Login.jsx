import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
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

        if ([email,password].includes("")) return toast.error("All fields are required")

        const toastLoading = toast.loading("Loging in...")

        try {
            const url = `${import.meta.env.VITE_API_URL}/vet/login`
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({email,password}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            localStorage.setItem("token", response.token)
            form.reset()
            autenticarUsuario()

        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        } finally {
            toast.dismiss(toastLoading)
        }
    }

  return (
    <div id="Login">
        <div className="enun">
            <p><span>Log in and Manage</span> your Patients</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" placeholder="Registration Email" name="email"/>    
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type="password" placeholder="Your password" name="password" />    
                </div>
                <input className="smtBtn" type="submit" value="LOG IN" />
            </form>
            <nav>
                <Link to="/register">Don't have an account? Register here</Link>
                <Link to="/forgot-password">Forgot your password? Recover it here</Link>
            </nav>
        </div>
    </div>
  )
}

export default Login