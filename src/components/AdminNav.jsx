import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav id="AdminNav">
        <Link to="/admin/perfil">Edit profile</Link>
        <Link to="/admin/cambiar-password">Update password</Link>
    </nav>
  )
}

export default AdminNav