import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: "🌿",
      title: "100% Natural",
      description: "Pure herbal ingredients with no harmful chemicals or additives"
    },
    {
      icon: "✨",
      title: "Proven Results",
      description: "Clinically tested formulations for visible hair growth and strength"
    },
    {
      icon: "🏆",
      title: "Premium Quality",
      description: "Handcrafted with traditional Ayurvedic methods and modern science"
    },
    {
      icon: "💚",
      title: "Eco-Friendly",
      description: "Sustainable packaging and cruelty-free production practices"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "My hair has never been healthier! The A³ hair oil reduced my hair fall significantly within just 3 weeks.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "Amazing product! Natural ingredients that actually work. My hair feels thicker and stronger.",
      image: "https://i.pravatar.cc/150?img=13"
    },
    {
      name: "Anita Desai",
      rating: 5,
      text: "Best hair oil I've ever used. The herbal fragrance is divine and results are visible!",
      image: "https://i.pravatar.cc/150?img=5"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Oil",
      description: "Select from our range of specialized hair oils based on your hair type and concerns"
    },
    {
      number: "02",
      title: "Apply Gently",
      description: "Massage the oil into your scalp and hair roots using circular motions"
    },
    {
      number: "03",
      title: "See Results",
      description: "Experience stronger, healthier hair with regular use in just 4-6 weeks"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-nature">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-float delay-200"></div>
        </div>

        <div className="container-custom relative z-10 text-center px-6 py-32">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Company Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-yellow-400 shadow-xl animate-float">
                <img
                  src="/logo.jpg"
                  alt="A³ Hair Oils"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Transform Your Hair
              <br />
              <span className="text-gradient-gold">Naturally</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-100 max-w-3xl mx-auto">
              Premium herbal formulations crafted for stronger, thicker, and healthier hair.
              <br />
              <span className="text-yellow-300 font-semibold">Pure. Natural. Powerful.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/products" className="btn btn-gold text-lg px-8 py-4">
                Shop Collection
              </Link>
              <a href="#benefits" className="btn btn-outline text-white border-white hover:bg-white hover:text-primary-800 text-lg px-8 py-4">
                Learn More
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-12 text-white">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">10,000+</div>
                <div className="text-sm text-neutral-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100%</div>
                <div className="text-sm text-neutral-200">Natural Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">4.9★</div>
                <div className="text-sm text-neutral-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-lg bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Why Choose A³ Hair Oils?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Experience the perfect blend of ancient Ayurvedic wisdom and modern science
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`card-premium text-center animate-slide-up delay-${index * 100}`}
              >
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-lg bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600">
              Simple steps to healthier, more beautiful hair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-gold text-3xl font-bold text-neutral-900 mb-6 shadow-xl">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-transparent -ml-6"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-lg gradient-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-neutral-100">
              Join thousands of satisfied customers who transformed their hair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass p-8 rounded-2xl backdrop-blur-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-yellow-300"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-100 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-neutral-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Hair?
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Start your journey to healthier, more beautiful hair today with our premium natural oils
          </p>
          <Link to="/products" className="btn btn-gold text-lg px-10 py-4">
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
