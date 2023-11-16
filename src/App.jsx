import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import AdminLayout from "./layout/AdminLayout"
import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import OlvidePassword from "./pages/OlvidePassword"
import NuevoPassword from "./pages/NuevoPassword"
import AdministrarPacientes from "./pages/AdministrarPacientes"
import Perfil from "./pages/Perfil"
import CambiarPassword from "./pages/CambiarPassword"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Area publica */}
        <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="registrar" element={<Registrar/>}/>
            <Route path="confirmar-cuenta" element={<ConfirmarCuenta/>}/>
            <Route path="olvide-password" element={<OlvidePassword/>}/>
            <Route path="nuevo-password/:token" element={<NuevoPassword/>}/>
            <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta/>}/>
            <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
        </Route>

        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<AdministrarPacientes/>}/>
          <Route path="perfil" element={<Perfil/>}/>
          <Route path="cambiar-password" element={<CambiarPassword/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
