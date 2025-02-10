import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "/src/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getProductById(id);
            if (data) {
                setProducto(data);
            } else {
                setError("Producto no encontrado o error en la carga.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!mensaje.trim()) {
            alert("El mensaje no puede estar vacío.");
            return;
        }

  
        console.log(`Mensaje enviado al vendedor de "${producto.titulo}":`, mensaje);
        alert("Mensaje enviado al vendedor con éxito.");
        setMensaje(""); 
    };

    if (error) {
        return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    }

    if (!producto) {
        return <p style={{ textAlign: "center" }}>Cargando...</p>;
    }

    return (
        <div className="container mt-5">
            <h1>{producto.titulo}</h1>
            <img 
    src={producto.imagen_url && producto.imagen_url.startsWith("http") 
        ? producto.imagen_url 
        : "https://via.placeholder.com/300"} 
    alt={producto.titulo} 
    className="img-fluid"
/>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p>{producto.descripcion}</p>

            <button className="btn btn-primary mt-3" onClick={() => addToCart(producto)}>
                🛒 Añadir al Carrito
            </button>

 
            <div className="contact-seller mt-4">
                <h3>📩 Contactar al vendedor</h3>
                <form onSubmit={handleSendMessage}>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Escribe tu mensaje aquí..."
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                    />
                    <button type="submit" className="btn btn-success mt-2">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetail;
