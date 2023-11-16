import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Provider"
import Formulario from "../components/Formulario"
import Pacientes from "../components/Pacientes"

function AdministrarPacientes() {

  const {userData} = useContext(Context)

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  const obtenerPacientes = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/pac/${userData._id}`
      const response = await fetch(url).then(res => res.json())

      if (response?.serverError) return console.log(response.serverError)
      setPacientes(response)

    } catch (error) {
      console.log(error.message)
    }
  }


  useEffect(() => {
    obtenerPacientes()
  }, [])
  

  return (
    <div id="AdminPage">
      <h1>Hola {userData.nombre}</h1>
      <div className="mainBox">
        <Formulario 
          paciente={paciente}
          setPaciente={setPaciente}
          setPacientes={setPacientes}
          pacientes={pacientes}/>
        <Pacientes
          userData={userData}
          setPacientes={setPacientes}
          setPaciente={setPaciente}
          pacientes={pacientes}/>
      </div>
    </div>
  )
}

export default AdministrarPacientes