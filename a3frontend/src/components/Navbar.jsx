import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount, toggleCart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4 md:py-5">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-full overflow-hidden ring-2 ring-yellow-400 ring-offset-1 ring-offset-transparent transform group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="A³ Hair Oils"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:block text-white font-semibold text-lg drop-shadow">
              A³ Hair Oils
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium cursor-pointer"
            >
              Products
            </Link>
            
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium cursor-pointer"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-yellow-100 italic">Hi, {user?.name?.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-400 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            )}
            


            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative text-white hover:text-yellow-300 transition-colors duration-300 cursor-pointer p-2"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </button>

            <Link
              to="/account"
              className="btn btn-gold text-sm cursor-pointer"
            >
              {isAuthenticated ? "Dashboard" : "My Account"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">


            {/* Mobile Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative text-white hover:text-yellow-300 transition-colors cursor-pointer p-2"
              aria-label="Shopping cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-yellow-300 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-yellow-300 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                Products
              </Link>
              
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white hover:text-yellow-300 transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left text-white hover:text-red-400 transition-colors py-2 px-4 rounded-lg hover:bg-white/10"
                >
                  Logout ({user?.name?.split(' ')[0]})
                </button>
              )}
              
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-gold text-sm w-full cursor-pointer"
              >
                {isAuthenticated ? "User Dashboard" : "My Account"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

