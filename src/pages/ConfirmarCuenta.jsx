import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-hot-toast"

function ConfirmarCuenta() {

  const {token} = useParams()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (!isValid) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/vet/confirmar-cuenta/${token}`
        fetch(url)
        .then(res => res.json())
        .then(response => {
          if (response?.error) return
          if (response?.serverError) return toast.error(`Server error: ${response.error}`)
          
          setIsValid(true)
        })
      } catch (error) {
        toast.error(`Client error: ${error}`)
      } 
    }
  }, [])
  

  return (
    <>
      <h1>{!isValid ? "Invalid token" : "Account successfully confirmed"}</h1>
      {isValid && <Link to="/">Log into your account</Link>}
    </>
  )
}

export default ConfirmarCuenta