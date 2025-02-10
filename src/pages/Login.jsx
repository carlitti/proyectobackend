import { useState } from "react";
import { loginUser } from "/src/api";
import { useAuth } from "/src/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginUser({ email, password });

        if (data.token) {
            login({ nombre: data.user.nombre, email: data.user.email });
            alert("Login exitoso");
            navigate("/");
        } else {
            setError(data.message || "Error al iniciar sesión");
        }
    };

    return (
        <div className="container mt-5">
            <h1>Iniciar Sesión</h1>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Contraseña:</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;

