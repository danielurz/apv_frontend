import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context/Provider"
import Footer from "../components/Footer"
import Header from "../components/Header"

function AdminLayout() {

    const {userData, cargando} = useContext(Context)

    
    if (cargando) return 
    return (
        userData?._id ? (
            <>
              <Header/>
              <Outlet/>
              <Footer/>
            </>
          ) : (
            <Navigate to='/' />
          )
    )
}

export default AdminLayout