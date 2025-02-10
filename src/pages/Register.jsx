import { useState } from "react";
import { registerUser } from "/src/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await registerUser({ nombre, email, password });

        if (data.message === "Usuario registrado con éxito") {
            alert("Registro exitoso, ahora puedes iniciar sesión.");
            navigate("/login");
        } else {
            setError(data.message || "Error en el registro");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Registro</h1>
            {error && <p className="text-danger text-center">{error}</p>}
            
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo Electrónico:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña:</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
