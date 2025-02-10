import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Home from "/src/pages/Home";
import ProductDetail from "/src/pages/ProductDetail";
import Login from "/src/pages/Login";
import Register from "/src/pages/Register";
import AddProduct from "/src/pages/AddProduct"; 
import ProtectedRoute from "/src/components/ProtectedRoute"; 
import Footer from "./components/Footer";

function AppRouter() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
            <Footer />  
        </Router>
    );
}

export default AppRouter;



