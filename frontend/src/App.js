import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AdminProducts from "./components/AdminProducts ";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartComponent"; // New cart page

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminProducts />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} /> {/* Separate cart page */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;