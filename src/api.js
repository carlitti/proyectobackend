const API_URL = "http://localhost:5000/api";


export const fetchProductos = async () => {
    try {
        const response = await fetch(`${API_URL}/publicaciones`);
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    } catch (error) {
        console.error("Error en fetchProductos:", error);
        return [];
    }
};


export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/publicaciones/${id}`);
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
        return await response.json();
    } catch (error) {
        console.error("Error en loginUser:", error);
        return { message: "Error en el servidor" };
    }
};


export const addProducto = async (productoData) => {
    try {
        const response = await fetch(`${API_URL}/publicaciones`, {
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

        if (!response.ok) throw new Error("Error en la petición");
        return await response.json();
    } catch (error) {
        console.error("Error en el registro:", error);
        return { message: "Error en el servidor" };
    }
};
