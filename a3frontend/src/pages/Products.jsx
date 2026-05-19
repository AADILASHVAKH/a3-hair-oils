import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real A³ product catalog
  const REAL_PRODUCTS = [
    // ── HAIR OILS ──────────────────────────────────────────────
    {
      id: 1,
      name: "CocoPure Hair Oil",
      description: "A premium coconut-infused hair oil that deeply nourishes and moisturizes your hair, leaving it silky smooth and naturally shiny.",
      price: 125,
      originalPrice: 199,
      rating: 4.9,
      badge: "Best Seller",
      category: "Hair Oils",
      imageUrl: "/cocopure-hairoil.png"
    },
    {
      id: 2,
      name: "GrowthVeda Hair Oil",
      description: "An Ayurvedic growth-boosting formula enriched with potent herbs that stimulate hair follicles and promote thick, healthy hair growth.",
      price: 125,
      originalPrice: 199,
      rating: 4.8,
      badge: "New",
      category: "Hair Oils",
      imageUrl: "/growthveda-hairoil.png"
    },
    {
      id: 3,
      name: "KeshShanthi Hair Oil",
      description: "A calming herbal hair oil that soothes the scalp, reduces dandruff, and restores hair health with traditional botanical ingredients.",
      price: 125,
      originalPrice: 199,
      rating: 4.9,
      badge: "Trending",
      category: "Hair Oils",
      imageUrl: "/keshshanthi-hairoil.png"
    },
    {
      id: 4,
      name: "FallShield Hair Oil",
      description: "A powerful anti-hair fall formula that strengthens hair roots, reduces breakage, and shields your hair from damage and thinning.",
      price: 125,
      originalPrice: 199,
      rating: 4.7,
      badge: "Popular",
      category: "Hair Oils",
      imageUrl: "/fallsheild-hairoil.png"
    },
    {
      id: 5,
      name: "AloCoco Hair Oil",
      description: "A refreshing blend of aloe vera and coconut that hydrates the scalp, repairs dry hair, and promotes natural shine and softness.",
      price: 125,
      originalPrice: 199,
      rating: 4.8,
      badge: "Natural",
      category: "Hair Oils",
      imageUrl: "/alococo-hairoil.png"
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const enriched = response.data.map((product) => ({
            ...product,
            imageUrl: product.imageUrl || `https://via.placeholder.com/400x400/1a6847/ffffff?text=${encodeURIComponent(product.name)}`,
          }));
          setProducts(enriched);
        } else {
          setProducts(REAL_PRODUCTS);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts(REAL_PRODUCTS);
        setLoading(false);
      });
  }, []);


  return (
    <div className="min-h-screen pt-24 md:pt-28">
      {/* Header Section */}
      <section className="gradient-nature text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Our Premium Collection
          </h1>
          <p className="text-xl text-neutral-100 max-w-2xl mx-auto animate-slide-up">
            Discover our range of natural hair oils, crafted with love and tradition
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-lg bg-neutral-50">
        <div className="container-custom">
          {loading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="card-premium">
                  <div className="skeleton h-64 mb-4"></div>
                  <div className="skeleton h-6 w-3/4 mb-3"></div>
                  <div className="skeleton h-4 w-full mb-2"></div>
                  <div className="skeleton h-4 w-5/6 mb-4"></div>
                  <div className="skeleton h-10 w-full"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State (but still showing fallback products)
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-6 py-3 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Showing sample products (backend not connected)</span>
              </div>
            </div>
          ) : null}

          {/* Products Grid */}
          {!loading && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`animate-scale-in delay-${Math.min(index * 100, 500)}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : !loading && products.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-neutral-700 mb-2">
                No products found
              </h3>
              <p className="text-neutral-500">
                Try selecting a different category
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Info Banner */}
      <section className="gradient-primary text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
              <p className="text-neutral-200 text-sm">On orders above ₹500</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔄</div>
              <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
              <p className="text-neutral-200 text-sm">30-day return policy</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💯</div>
              <h3 className="font-semibold text-lg mb-1">Quality Guaranteed</h3>
              <p className="text-neutral-200 text-sm">100% natural ingredients</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
