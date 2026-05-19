import { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

function ComboCustomizerModal({ product, onClose }) {
  const { addToCart, toggleCart } = useCart();
  const [selectedOil, setSelectedOil] = useState(null);
  const [selectedOil2, setSelectedOil2] = useState(null); // for premium combo (2 oils)
  const [selectedPowder, setSelectedPowder] = useState(null);
  const [added, setAdded] = useState(false);

  const isPremium = product.id === 10; // Premium combo needs 2 oils
  const options = product.comboOptions || { oils: [], powders: [] };
  const oils = options.oils || [];
  const powders = options.powders || [];

  // Determine if selection is complete
  const isComplete = isPremium
    ? selectedOil && selectedOil2 && selectedOil !== selectedOil2 && selectedPowder
    : selectedOil && selectedPowder;

  const totalSteps = isPremium ? 3 : 2;
  const completedSteps = [
    selectedOil,
    isPremium ? selectedOil2 : true,
    selectedPowder
  ].filter(Boolean).length - (isPremium ? 0 : 0);

  const progressSteps = isPremium
    ? [!!selectedOil, !!selectedOil2, !!selectedPowder].filter(Boolean).length
    : [!!selectedOil, !!selectedPowder].filter(Boolean).length;

  const handleConfirm = () => {
    const selections = isPremium
      ? [selectedOil, selectedOil2, selectedPowder]
      : [selectedOil, selectedPowder];
    addToCart(product, 1, selections);
    setAdded(true);
    setTimeout(() => {
      onClose();
      toggleCart();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="gradient-nature text-white p-6 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-yellow-300 mb-1 block">
                Customize Your Combo
              </span>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-neutral-200 text-sm mt-1">
                {isPremium
                  ? "Pick 2 oils + 1 powder"
                  : "Pick 1 oil + 1 powder"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-neutral-300 mb-1">
              <span>{progressSteps} of {totalSteps} selected</span>
              {isComplete && <span className="text-yellow-300 font-semibold">✓ Ready!</span>}
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${(progressSteps / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* Oils Section */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-3">
              🌿 Choose {isPremium ? "2 Oils" : "1 Oil"}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {oils.map((oil) => {
                const isFirst = selectedOil?.id === oil.id;
                const isSecond = selectedOil2?.id === oil.id;
                const isSel = isFirst || isSecond;
                return (
                  <button
                    key={oil.id}
                    onClick={() => {
                      if (isFirst) { setSelectedOil(null); return; }
                      if (isSecond) { setSelectedOil2(null); return; }
                      if (!selectedOil) { setSelectedOil(oil); return; }
                      if (isPremium && !selectedOil2) { setSelectedOil2(oil); return; }
                    }}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer
                      ${isSel
                        ? "border-primary-600 bg-primary-50 shadow-sm"
                        : "border-neutral-200 hover:border-primary-300 hover:bg-neutral-50"
                      }`}
                  >
                    {isSel && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <span className="text-2xl">{oil.icon}</span>
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">{oil.name}</div>
                      <div className="text-xs text-neutral-500">{oil.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Powders Section */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-3">
              🌾 Choose 1 Powder
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {powders.map((pwd) => {
                const isSel = selectedPowder?.id === pwd.id;
                return (
                  <button
                    key={pwd.id}
                    onClick={() => setSelectedPowder(isSel ? null : pwd)}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer
                      ${isSel
                        ? "border-yellow-500 bg-yellow-50 shadow-sm"
                        : "border-neutral-200 hover:border-yellow-400 hover:bg-neutral-50"
                      }`}
                  >
                    {isSel && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <span className="text-2xl">{pwd.icon}</span>
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm">{pwd.name}</div>
                      <div className="text-xs text-neutral-500">{pwd.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
            <div className="flex-1">
              <div className="text-2xl font-bold text-primary-700">₹{product.price}</div>
              {product.originalPrice && (
                <div className="text-sm text-neutral-400 line-through">₹{product.originalPrice}</div>
              )}
            </div>
            <button
              onClick={handleConfirm}
              disabled={!isComplete || added}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer
                ${added
                  ? "bg-green-500 text-white"
                  : isComplete
                    ? "btn btn-gold"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
            >
              {added
                ? "✓ Added to Cart!"
                : isComplete
                  ? "Add to Cart"
                  : `Select ${totalSteps - progressSteps} more`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ComboCustomizerModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    originalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comboOptions: PropTypes.shape({
      oils: PropTypes.array,
      powders: PropTypes.array,
    }),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ComboCustomizerModal;
