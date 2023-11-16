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
        
        if (!VALUES.length) return toast.error("No has hecho ningun cambio")
        if (VALUES.includes("")) return toast.error("Todos los campos son obligatotios")

        try {
            const url = `http://localhost:4000/vet/actualizar-datos/${userData._id}`
            const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(veterinario),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())

            if (response?.error) return toast.error(response.error)
            if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

            toast.success(response.success)
            setVeterinario({})
        } catch (error) {
            toast.error(`Client Error: ${error.message}`)
        }
    }

  return (
    <>
        <AdminNav/>
        <div id="Perfil">
            <div className="hero">
                <h1>Editar Perfil</h1>
                <h3>Modifica tu <span>informacion aqui</span></h3>
            </div>
            <form onSubmit={handleForm}>
                <div className="field">
                    <label>NOMBRE</label>
                    <input type="text" defaultValue={userData?.nombre ?? ""}
                        onChange={e => setVeterinario({...veterinario, nombre: e.target.value})} />
                </div>
                <div className="field">
                    <label>SITIO WEB</label>
                    <input type="text" defaultValue={userData?.web ?? ""}
                        onChange={e => setVeterinario({...veterinario, web: e.target.value})} />
                </div>
                <div className="field">
                    <label>TELEFONO</label>
                    <input type="text" defaultValue={userData?.telefono ?? ""}
                        onChange={e => setVeterinario({...veterinario, telefono: e.target.value})} />
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="email" defaultValue={userData?.email ?? ""}
                        onChange={e => setVeterinario({...veterinario, email: e.target.value})} />
                </div>
                <input type="submit" value="GUARDAR CAMBIOS" className="smtBtn" />
            </form>
        </div>
    </>
  )
}

export default Perfil