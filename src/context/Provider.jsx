import { useEffect, createContext, useState } from "react";

export const Context = createContext()

export const Provider = ({children}) => {

   const [userData, setUserData] = useState({})
   const [cargando, setCargando] = useState(true)

   const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      
      if (!token) return setCargando(false)

      try {
         const url = "http://localhost:4000/vet/perfil"
         const response = await fetch(url, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            }
         }).then(res => res.json())

         if (response?.error) return console.log(response.error)

         setUserData(response.data)
         
      } catch (error) {
         console.log(error.message)
      }

      setCargando(false)
   }

   useEffect(() => {
      autenticarUsuario()
   }, [])
   

   return (
      <Context.Provider value={{
         userData,
         cargando,
         setUserData,
         autenticarUsuario
      }}>
         {children}
      </Context.Provider> 
   )
}