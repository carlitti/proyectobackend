import { useState } from "react";
import { addProducto } from "/src/api";
import { useAuth } from "/src/context/AuthContext"; // ✅ Para obtener el token

const AddProduct = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen_url, setImagenUrl] = useState("");
    const [tipo, setTipo] = useState("Avión"); 
    const { user } = useAuth(); // ✅ Obtener el usuario autenticado y el token

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.token) {
            alert("❌ Debes iniciar sesión para agregar un producto.");
            return;
        }

        const nuevoProducto = {
            titulo,
            descripcion,
            precio,
            imagen_url,
            tipo
        };

        console.log("📌 Enviando producto con token:", user.token); // ✅ Log para verificar el token antes de enviar

        const response = await addProducto(nuevoProducto, user.token);

        if (response.message === "Producto agregado") {
            alert("✅ Producto agregado con éxito");
            window.location.href = "/";
        } else {
            alert(response.error || "Error al agregar el producto");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Añadir Producto</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                <input type="text" placeholder="URL de la imagen" value={imagen_url} onChange={(e) => setImagenUrl(e.target.value)} required />
                
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-control">
                    <option value="Avión">✈️ Avión</option>
                    <option value="Helicóptero">🚁 Helicóptero</option>
                </select>

                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;



