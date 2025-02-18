export const addProducto = async (productoData, token) => {
    try {
        if (!token) {
            console.error("❌ No se envió el token en la solicitud");
            return { message: "Error: No hay token de autenticación" };
        }

        console.log("📌 Enviando producto:", productoData); // ✅ Log para ver datos enviados
        console.log("🔑 Enviando token:", token); // ✅ Log para ver si el token se envía

        const response = await fetch(`${API_URL}/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // ✅ Se asegura de enviar el token
            },
            body: JSON.stringify(productoData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al agregar producto");
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error al agregar producto:", error);
        return { message: "Error en el servidor" };
    }
};
