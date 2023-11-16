import { FaTrashAlt, FaPen } from "react-icons/fa";
import { toast } from "react-hot-toast";

function Pacientes({pacientes,setPacientes,userData,setPaciente}) {

  const deletePaciente = async pacId => {

    const confirmar = confirm("Desea eliminar este paciente?")
    if (!confirmar) return

    try {
      const url = `http://localhost:4000/pac/${pacId}/${userData._id}`
      const response = await fetch(url, {method:"DELETE"}).then(res => res.json())

      if (response?.error) return toast.error(response.error)
      if (response?.serverError) return toast.error(`Server Error: ${response.serverError}`)

      toast.success(response.success)
      setPacientes(prev => prev.filter(({_id}) => _id !== pacId))

    } catch (error) {
      toast.error(`Client Error: ${error.message}`)
    }
  }

  return (
    <div id="Pacientes">
      {pacientes.map(paciente => {
        const {_id,nombre,email,fecha,sintomas,propietario} = paciente
        return (
          <div key={_id} className="paciente">
            <div className="info">
              <p><span>NOMBRE: </span>{nombre}</p>
              <p><span>PROPIETARIO: </span>{propietario}</p>
              <p><span>EMAIL DE CONTACTO: </span>{email}</p>
              <p><span>FECHA DE ALTA: </span>{fecha}</p>
              <p><span>SINTOMAS: </span>{sintomas}</p>
            </div>
            <div className="actions">
              <FaPen onClick={() => setPaciente({_id,nombre,propietario,email,fecha,sintomas})} className="edit"/>
              <FaTrashAlt onClick={() => deletePaciente(_id)} className="delete"/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Pacientes