import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav id="AdminNav">
        <Link to="/admin/perfil">Editar perfil</Link>
        <Link to="/admin/cambiar-password">Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav