import { Link } from "react-router-dom"
import AdminNav from "../components/AdminNav"
import { useContext, useState } from "react"
import { Context } from "../context/Provider"
import { toast } from "react-hot-toast"

function Perfil() {

    const {userData} = useContext(Context)
    const [veterinario, setVeterinario] = useState({})

    const handleForm = async e => {
        e.preventDefault()

        const VALUES = Object.values(veterinario)
        
        if (!VALUES.length) return toast.error("You haven't made any changes")
        if (VALUES.includes("")) return toast.error("All fields are mandatory")

        const toastLoading = toast.loading("Updating data...")

        try {
            const url = `${import.meta.env.VITE_API_URL}/actualizar-datos/${userData._id}`
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(veterinario),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            
            toast.dismiss(toastLoading)
            
            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            toast.success(response.success)
            setVeterinario({})
        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        } finally {
            toast.dismiss(toastLoading)
        }
    }

  return (
    <>
        <AdminNav/>
        <div id="Perfil">
            <div className="hero">
                <h1>Edit Profile</h1>
                <h3>Modify your <span>information here</span></h3>
            </div>
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>NAME</label>
                    <input type="text" defaultValue={userData?.nombre ?? ""}
                        onChange={e => setVeterinario({...veterinario, nombre: e.target.value})} />
                </div>
                <div className="field">
                    <label>WEBSITE</label>
                    <input type="text" defaultValue={userData?.web ?? ""}
                        onChange={e => setVeterinario({...veterinario, web: e.target.value})} />
                </div>
                <div className="field">
                    <label>PHONE</label>
                    <input type="text" defaultValue={userData?.telefono ?? ""}
                        onChange={e => setVeterinario({...veterinario, telefono: e.target.value})} />
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" defaultValue={userData?.email ?? ""}
                        onChange={e => setVeterinario({...veterinario, email: e.target.value})} />
                </div>
                <input type="submit" value="SAVE CHANGES" className="smtBtn" />
            </form>
        </div>
    </>
  )
}

export default Perfil