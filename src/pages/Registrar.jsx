import { Link } from "react-router-dom"
import {toast} from "react-hot-toast"

function Registrar() {


  const handleForm = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formdata = new FormData(form)

    const nombre = formdata.get("nombre")
    const email = formdata.get("email")
    const password = formdata.get("password")
    const rpassword = formdata.get("rpassword")
    
    if ([nombre,email,password].includes("")) return toast.error("All fields are required")
    if (password.length < 6) return toast.error("Password must be at least 6 characters long")
    if (password !== rpassword) return toast.error("Passwords do not match")

    const toastLoading = toast.loading("Creating user...")

    try {
      const url = `${import.meta.env.VITE_API_URL}/vet/`
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
      form.reset()
      
    } catch (error) {
      toast.error(`Error registering:: ${error}`)
    } finally {
      toast.dismiss(toastLoading)
    }
  }


  return (
    <div id="Registrar">
      <div className="enun">
        <p><span>Create your Account and Manage</span> your Patients</p>
      </div>
      <div className="formBox">
        <form onSubmit={handleForm}>
          <div className="field">
            <label>NAME</label>
            <input type="text" placeholder="Your name" name="nombre" />    
          </div>
          <div className="field">
            <label>EMAIL</label>
            <input type="email" placeholder="Registration email" name="email" />    
          </div>
          <div className="field">
            <label>PASSWORD</label>
            <input type="password" placeholder="Your password"  name="password" />    
          </div>
          <div className="field">
            <label>REPEAT PASSWORD</label>
            <input type="password" placeholder="Repeat your password" name="rpassword" />    
          </div>
          <input className="smtBtn" type="submit" value="REGISTER" />
        </form>
        <nav>
          <Link to="/">Already have an account? Login here</Link>
          <Link to="/forgot-password">Forgot your password? Recover it here</Link>
        </nav>
      </div>
    </div>
  )
}

export default Registrar