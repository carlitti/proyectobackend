const API_URL = "https://backendproyecto-x917.onrender.com/api";

export const fetchProductos = async () => {
    try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) throw new Error("Error al obtener productos");

        const data = await response.json();
        console.log("Productos obtenidos:", data); // Agregar log para ver los productos

        return data;
    } catch (error) {
        console.error("Error en fetchProductos:", error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/productos/${id}`);
        if (!response.ok) throw new Error("Error al obtener producto");
        return await response.json();
    } catch (error) {
        console.error("Error en getProductById:", error);
        return null;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) throw new Error("Error en el login");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en loginUser:", error);
        return { message: "Error en el servidor" };
    }
};

export const addProducto = async (productoData) => {
    try {
        // ✅ FIX: Cambiar "publicaciones" por "productos"
        const response = await fetch(`${API_URL}/productos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productoData),
        });

        if (!response.ok) throw new Error("Error al agregar producto");
        return await response.json();
    } catch (error) {
        console.error("Error al agregar producto:", error);
        return { message: "Error en el servidor" };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        if (!response.ok) throw new Error("Error en el registro");
        return await response.json();
    } catch (error) {
        console.error("Error en el registro:", error);
        return { message: "Error en el servidor" };
    }
};