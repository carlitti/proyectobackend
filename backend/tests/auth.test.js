const request = require("supertest");
const { app, server } = require("../index"); 
let token; 

test("Registro de usuario", async () => {
    const res = await request(app).post("/api/auth/register").send({
        nombre: "Test User",
        email: "test@example.com",
        password: "123456",
        rol: "vendedor"
    });
    expect(res.statusCode).toBe(201);
});

test("Inicio de sesión", async () => {
    const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "123456"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    token = res.body.token; 
});

test("Crear producto", async () => {
    const res = await request(app)
        .post("/api/productos")
        .set("Authorization", `Bearer ${token}`) 
        .send({
            titulo: "Producto Test",
            descripcion: "Descripción del producto test",
            precio: 100.50,
            imagen_url: "https://example.com/producto.jpg"
        });

    expect(res.statusCode).toBe(201);
});

afterAll(async () => {
    if (server) {
        server.close(); 
    }
});