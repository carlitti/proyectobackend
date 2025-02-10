import { useState } from "react";
import { addProducto } from "/src/api";
import "./../styles/AddProduct.css"; // Importa estilos

const AddProduct = () => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen_url, setImagenUrl] = useState("");
    const [tipo, setTipo] = useState("Avión"); // 🔥 Nuevo estado para seleccionar el tipo

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const nuevoProducto = {
            titulo,
            precio,
            imagen_url,
            descripcion,
            tipo // ✅ Enviar tipo al backend
        };
    
        const response = await addProducto(nuevoProducto);
    
        if (response.message === "Producto agregado") {
            alert("Producto agregado con éxito");
            window.location.href = "/";
        } else {
            alert("Error al agregar el producto");
        }
    };

    return (
        <div className="add-product-container">
            <h1>Añadir Producto</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                <input type="text" placeholder="URL de la imagen" value={imagen_url} onChange={(e) => setImagenUrl(e.target.value)} required />
                
                {/* Nuevo select para elegir tipo de producto */}
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


