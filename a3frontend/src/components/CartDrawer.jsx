import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={toggleCart}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
        {/* Header */}
        <div className="gradient-nature text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button
            onClick={toggleCart}
            className="w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-neutral-500 mb-6">
                Add some products to get started
              </p>
              <button
                onClick={toggleCart}
                className="btn btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  {/* Product Image */}
                  <img
                    src={item.imageUrl || `https://via.placeholder.com/100x100/1a6847/ffffff?text=${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-primary-600 font-bold mb-1">
                      ₹{typeof item.price === 'string' ? item.price : item.price.toFixed(2)}
                    </p>
                    {/* Combo selections */}
                    {item.comboSelections && item.comboSelections.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.comboSelections.map((sel) => (
                          <span
                            key={sel.id}
                            className="inline-flex items-center gap-1 bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full"
                          >
                            {sel.icon} {sel.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white border border-neutral-300 hover:border-primary-600 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="font-semibold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white border border-neutral-300 hover:border-primary-600 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-200 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Subtotal:</span>
              <span className="text-2xl font-bold text-primary-700">
                ₹{getCartTotal().toFixed(2)}
              </span>
            </div>

            {/* Shipping Note */}
            <p className="text-sm text-neutral-600 text-center">
              Shipping and taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={toggleCart}
              className="btn btn-gold w-full text-lg py-4"
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={toggleCart}
              className="btn btn-outline w-full"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
