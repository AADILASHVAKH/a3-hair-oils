import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "248293899743-8f23fa59nff7ur1ghufnkgiti8vnae82.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-active");
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
