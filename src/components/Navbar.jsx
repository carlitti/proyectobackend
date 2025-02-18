import { useAuth } from "/src/context/AuthContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    console.log("🛑 Estado actual del usuario:", user);

    return (
        <nav className="navbar navbar-dark px-3">
            <Link className="navbar-brand" to="/">✈️ Marketplace</Link>

            <div>
                <Link className="btn btn-light me-2" to="/">🏠 Home</Link>

                {/* Solo mostrar si hay un usuario logeado con token */}
                {user?.token ? (
                    <>
                        <Link className="btn btn-secondary me-2" to="/add-product">
                            ➕ Añadir Producto
                        </Link>
                        <button className="btn btn-danger" onClick={logout}>
                            🚪 Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link className="btn btn-primary me-2" to="/login">🔑 Login</Link>
                        <Link className="btn btn-success" to="/register">📝 Register</Link>
                    </>
                )}

                <Link className="btn btn-warning me-2" to="/carrito">🛒 Carrito ({cart.length})</Link>
            </div>
        </nav>
    );
};

export default Navbar;


