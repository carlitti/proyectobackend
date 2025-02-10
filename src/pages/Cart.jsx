
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const { user } = useAuth(); // 🔥 Verifica si el usuario está logeado
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            alert("⚠️ Debes iniciar sesión para completar la compra.");
            navigate("/login"); // Redirigir a login
            return;
        }

        // Simulación de pago exitoso
        alert("✅ Compra realizada con éxito. Gracias por tu compra.");
    };

    return (
        <div className="container mt-5">
            <h1>🛒 Tu Carrito</h1>

            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul className="list-group">
                    {cart.map((producto) => (
                        <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{producto.titulo} - ${producto.precio.toLocaleString()}</span>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(producto.id)}>❌ Quitar</button>
                        </li>
                    ))}
                </ul>
            )}

            {cart.length > 0 && (
                <>
                    {/* 🔥 Si el usuario está logeado, muestra el botón de comprar */}
                    <button className="btn btn-success mt-3 w-100" onClick={handleCheckout}>
                        💳 Pagar
                    </button>
                </>
            )}

            <Link to="/" className="btn btn-secondary mt-3">⬅ Seguir comprando</Link>
        </div>
    );
};

export default CartPage;