import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [imgShift, setImgShift] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl =
    product.imageUrl ||
    `https://via.placeholder.com/400x400/1a6847/ffffff?text=${encodeURIComponent(product.name)}`;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    
    // Calculate tilt
    const tiltX = -(dy / (rect.height / 2)) * 12;
    const tiltY = (dx / (rect.width / 2)) * 12;

    // Glare position as % within card
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    // Image parallax — moves opposite to tilt for depth
    const imgX = -(dx / rect.width) * 18;
    const imgY = -(dy / rect.height) * 18;

    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: glareX, y: glareY, opacity: 0.18 });
    setImgShift({ x: imgX, y: imgY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setImgShift({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "scale(1.04)" : "scale(1)"}`,
        transition: isHovered
          ? "transform 0.08s ease-out, box-shadow 0.3s ease"
          : "transform 0.55s cubic-bezier(.23,1,.32,1), box-shadow 0.55s ease",
        boxShadow: isHovered
          ? "0 30px 60px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.12)"
          : "0 4px 20px rgba(0,0,0,0.08)",
        transformStyle: "preserve-3d"
      }}
      className="card-premium group cursor-pointer relative overflow-hidden rounded-2xl bg-white"
    >
      {/* Glare overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`,
          transition: isHovered ? "none" : "opacity 0.55s ease",
          pointerEvents: "none",
          zIndex: 10,
          borderRadius: "inherit",
        }}
      />

      {/* Product Image with parallax shift */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-neutral-100" style={{ height: "260px" }}>
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            transform: `translate(${imgShift.x}px, ${imgShift.y}px) scale(${isHovered ? 1.15 : 1.05})`,
            transition: isHovered
              ? "transform 0.08s ease-out"
              : "transform 0.55s cubic-bezier(.23,1,.32,1)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {product.badge && (
          <span 
            className="absolute top-3 right-3 bg-yellow-400 text-neutral-900 text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md"
            style={{
               transform: isHovered ? "translateZ(30px)" : "translateZ(0)",
               transition: "transform 0.3s ease",
            }}
          >
            {product.badge}
          </span>
        )}
        {/* Subtle bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(255,255,255,1), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Product Info */}
      <div 
        className="space-y-3 px-2 pb-2"
        style={{
           transform: isHovered ? "translateZ(40px)" : "translateZ(0)",
           transition: "transform 0.3s ease",
        }}
      >
        <h3
          className="text-xl font-semibold text-neutral-900 transition-colors duration-300"
          style={{ color: isHovered ? "var(--color-primary-600, #16a34a)" : "" }}
        >
          {product.name}
        </h3>

        <p className="text-neutral-600 text-sm line-clamp-2">{product.description}</p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-neutral-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-neutral-600 ml-2">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-2xl font-bold text-primary-700">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through ml-2">₹{product.originalPrice}</span>
            )}
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="btn btn-primary w-full mt-2 cursor-pointer"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    imageUrl: PropTypes.string,
    badge: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
