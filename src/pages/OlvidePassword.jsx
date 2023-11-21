import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"

function OlvidePassword() {

    const handleForm = async e => {
        e.preventDefault()

        const form = e.currentTarget
        const formdata = new FormData(form)
        const email = formdata.get("email")

        if (email === "") return toast.error("Fill the email field")

        const toastLoading = toast.loading("Sending email...")

        try {
            const url = `${import.meta.env.VITE_API_URL}/vet/olvido-password`
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
            toast.error(`Client error: ${error.message}`)
        } finally {
            toast.dismiss(toastLoading)
        }
    }

  return (
    <div id="OlvidePassword">
        <div className="enun">
            <p><span>Recover Access</span> to Your Account</p>
        </div>
        <div className="formBox">
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" placeholder="Registered Email" name="email"/>    
                </div>
                <input className="smtBtn" type="submit" value="RECOVER PASSWORD" />
            </form>
            <nav>
                <Link to="/">Already have an account? Log in here</Link>
                <Link to="/register">Don't have an account? Register here</Link>
            </nav>
        </div>
    </div>
  )
}

export default OlvidePassword