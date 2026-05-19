import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/account");
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // For manual login (not yet fully implemented in backend)
    setTimeout(() => {
      setLoading(false);
      setError("Email login is coming soon. Please use Google Login.");
    }, 1000);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const result = await loginWithGoogle(credentialResponse.credential);
    if (result.success) {
      navigate("/account");
    } else {
      setError(result.error || "Google login failed");
    }
    setLoading(false);
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-nature pt-28 pb-20 px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="glass-dark rounded-2xl p-8 md:p-10 shadow-2xl animate-scale-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-gold mb-4">
              <span className="text-3xl font-bold text-neutral-900">A³</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-neutral-200">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          {/* Google Login Section */}
          <div className="mb-8 flex flex-col items-center">
            <p className="text-neutral-300 text-sm mb-4">Sign in with Google for full access</p>
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_blue"
                shape="pill"
                size="large"
                width="100%"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f3d2e] px-2 text-neutral-400">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 font-semibold mt-2"
            >
              Sign In with Email
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-neutral-400">
            Forgot your password?{" "}
            <a href="#" className="text-yellow-400 hover:text-yellow-300">Reset help</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
