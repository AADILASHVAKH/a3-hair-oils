import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Account() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [orders] = useState([
    {
      id: "ORD001",
      date: "Feb 10, 2024",
      total: 598,
      status: "Delivered",
      items: 2
    },
    {
      id: "ORD002",
      date: "Jan 25, 2024",
      total: 349,
      status: "Delivered",
      items: 1
    }
  ]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 md:pt-28 flex items-center justify-center bg-neutral-50">
        <div className="text-2xl font-bold text-primary-700 animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-24 md:pt-28 bg-neutral-50">
      {/* Header */}
      <section className="gradient-nature text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
            My Account
          </h1>
          <p className="text-neutral-100 animate-slide-up">
            Welcome back, {user?.name}
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-premium sticky top-24">
              <div className="text-center mb-6">
                {user?.picture ? (
                  <img src={user.picture} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gold shadow-lg" />
                ) : (
                  <div className="w-24 h-24 rounded-full gradient-gold mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-neutral-900">
                    {user?.name?.charAt(0)}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-neutral-900">{user?.name}</h2>
                <p className="text-neutral-600">{user?.email}</p>
                <p className="text-sm text-neutral-500 mt-2">Member verified with Google</p>
              </div>
              
              <nav className="space-y-2">
                <a href="#profile" className="block px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-medium">
                  Profile Details
                </a>
                <a href="#orders" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors">
                  Order History
                </a>
                <a href="#wishlist" className="block px-4 py-3 rounded-lg hover:bg-neutral-100 text-neutral-700 transition-colors">
                  My Wishlist
                </a>
                <button 
                  onClick={() => { logout(); navigate("/login"); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div id="profile" className="card-premium">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Full Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Name
                  </label>
                  <div className="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-800">
                    {user?.name}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email
                  </label>
                  <div className="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-800">
                    {user?.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Account ID
                  </label>
                  <div className="px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-500 text-xs font-mono">
                    {user?.id ? `A3-USER-${user.id}` : "Google Internal User"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Authentication Source
                  </label>
                  <div className="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-800 flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    </svg>
                    Google Account
                  </div>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div id="orders" className="card-premium">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-neutral-900">Order #{order.id}</h4>
                        <p className="text-sm text-neutral-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-700">₹{order.total}</p>
                        <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
