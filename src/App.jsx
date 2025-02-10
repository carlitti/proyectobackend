import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart"; // ✅ Importamos la nueva página del carrito
import { AuthProvider } from "./context/AuthContext";
import { MarketplaceProvider } from "./context/MarketplaceContext";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css";

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <MarketplaceProvider>
                    <Router>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/add-product" element={<AddProduct />} />
                            <Route path="/producto/:id" element={<ProductDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/carrito" element={<Cart />} /> 
                        </Routes>
                        <Footer />
                    </Router>
                </MarketplaceProvider>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
