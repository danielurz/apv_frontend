import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context/Provider"


function AuthLayout() {

  const {userData, cargando} = useContext(Context)
  
  if (cargando) return
  return (
    <>
      {userData?._id ? <Navigate to="/admin"/> : <Outlet/>}
    </>
  )
}

export default AuthLayout