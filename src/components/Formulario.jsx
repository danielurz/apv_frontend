import {toast} from "react-hot-toast"
import { useContext } from "react"
import { Context } from "../context/Provider"

function Formulario({setPacientes,pacientes,setPaciente,paciente}) {

    const {userData} = useContext(Context)

    const handleForm = async e => {
        
        e.preventDefault()
        const values = Object.values(paciente)

        if (!paciente?._id) {

            if (values.length < 5 || values.includes("")) return toast.error("Todos los campos son obligatorios")

            try {
                const url = "http://localhost:4000/pac"
                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify({...paciente,veterinarioId:userData._id}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())

                if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

                toast.success(response.success)
                setPaciente({})
                setPacientes([
                    ...pacientes,
                    {...paciente, _id: response.id}
                ])

            } catch (error) {
                console.log(error.message)
                toast.error(`Client Error: ${error.message}`)
            }
       
        } else {

            if (values.includes("")) return toast.error("Todos los campos son obligatorios")

            try {
                const url = `http://localhost:4000/pac/${userData._id}`
                const response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(paciente),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())

                if (response?.error) return toast.error(response.error)
                if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

                toast.success(response.success)
                setPacientes(prev => prev.map(thisPaciente => {
                    if (thisPaciente._id === paciente._id) {
                        for (let key in thisPaciente) {
                            thisPaciente[key] = paciente[key]
                        }
                    }
                    return thisPaciente
                }))
                setPaciente({})
                
            } catch (error) {
                toast.error(`Client Error: ${error.message}`)
            }
        }
    }



  return (
    <form id='Form' onSubmit={handleForm}>
        <div className="field">
            <label>Nombre Mascota</label>
            <input type="text" value={paciente?.nombre ?? ""}
                onChange={e => setPaciente({...paciente, nombre: e.target.value})} />
        </div>
        <div className="field">
            <label>Nombre Propietario</label>
            <input type="text" value={paciente?.propietario ?? ""}
                onChange={e => setPaciente({...paciente, propietario: e.target.value})} />
        </div>
        <div className="field">
            <label>Email Propietario</label>
            <input type="email" value={paciente?.email ?? ""}
                onChange={e => setPaciente({...paciente, email: e.target.value})} />
        </div>
        <div className="field">
            <label>Fecha Alta</label>
            <input type="date" value={paciente?.fecha ?? ""}
                onChange={e => setPaciente({...paciente, fecha: e.target.value})} />
        </div>
        <div className="field">
            <label>Sintomas</label>
            <textarea type="text" value={paciente?.sintomas ?? ""}
                onChange={e => setPaciente({...paciente, sintomas: e.target.value})} />
        </div>
        <input className="sbtBtn" type="submit" 
            value={!paciente?._id ? "AGREGAR PACIENTE" : "ACTUALIZAR PACIENTE"} />
    </form>
  )
}

export default Formulario