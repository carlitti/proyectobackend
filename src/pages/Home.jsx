import { useEffect, useState } from "react";
import { fetchProductos } from "/src/api";
import { Link } from "react-router-dom";

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [filtroBusqueda, setFiltroBusqueda] = useState(""); 
    const [filtroTipo, setFiltroTipo] = useState(""); 
    const [ordenPrecio, setOrdenPrecio] = useState(""); 

    const placeholderImage = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await fetchProductos();
            console.log("Productos recibidos:", data);
            setProductos(data);
        };

        fetchProducts();
    }, []);

    const productosFiltrados = productos
        .filter(producto => {
            if (!producto.titulo) return false;

      
            const coincideBusqueda = producto.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase());

 
            const coincideTipo = !filtroTipo || filtroTipo === "Todos" || producto.tipo === filtroTipo;

            return coincideBusqueda && coincideTipo;
        })
        .sort((a, b) => {
            if (ordenPrecio === "mayor") return b.precio - a.precio;
            if (ordenPrecio === "menor") return a.precio - b.precio;
            return 0;
        });

    return (
        <div className="container mt-5">
            <h1 className="text-center fw-bold">🛩️ Descubre productos increíbles</h1>
            <p className="text-center text-muted">Compra y vende aviones y helicópteros exclusivos.</p>


            <div className="d-flex justify-content-between mb-4">
                <input
                    type="text"
                    placeholder="🔍 Buscar productos..."
                    className="form-control w-50"
                    value={filtroBusqueda}
                    onChange={(e) => setFiltroBusqueda(e.target.value)}
                />

                <select className="form-select w-25 mx-2" onChange={(e) => setFiltroTipo(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Avión">✈️ Avión</option>
                    <option value="Helicóptero">🚁 Helicóptero</option>
                </select>

                <select className="form-select w-25" onChange={(e) => setOrdenPrecio(e.target.value)}>
                    <option value="">Ordenar por Precio</option>
                    <option value="mayor">⬆️ Mayor a Menor</option>
                    <option value="menor">⬇️ Menor a Mayor</option>
                </select>
            </div>

            {/* 📌 Productos */}
            <div className="row mt-4">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                        <div key={producto.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card shadow-sm border-0 h-100">
                                <img 
                                    src={producto.imagen && producto.imagen.startsWith("http") ? producto.imagen : placeholderImage} 
                                    className="card-img-top p-2"
                                    alt={producto.titulo}
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} 
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold">{producto.titulo}</h5>
                                    <p className="text-success fw-bold">💲{producto.precio.toLocaleString()}</p>
                                    <p className="text-muted">📌 Tipo: {producto.tipo || "Desconocido"}</p>
                                    <p className="text-muted">👤 Publicado por: {producto.usuario || "Anónimo"}</p>
                                    <Link to={`/producto/${producto.id}`} className="btn btn-primary mt-auto">
                                        🔍 Ver detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">❌ No se encontraron productos con esos criterios.</p>
                )}
            </div>

  
            <div className="how-it-works mt-5">
                <h2>🛒 ¿Cómo Comprar?</h2>
                <div className="how-it-works-container d-flex justify-content-between">
                    <div className="how-step text-center">
                        <span className="icon">🔍</span>
                        <h3>Explora</h3>
                        <p>Descubre una variedad de aviones y helicópteros únicos.</p>
                    </div>
                    <div className="how-step text-center">
                        <span className="icon">📝</span>
                        <h3>Revisa los detalles</h3>
                        <p>Verifica la descripción, características y precio del producto.</p>
                    </div>
                    <div className="how-step text-center">
                        <span className="icon">💳</span>
                        <h3>Compra</h3>
                        <p>Realiza la compra de manera segura con nuestro sistema de pagos.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
