"use client";

import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";  // ✅ Importamos el nuevo componente
import ProductsSection from "./ProductsSection";
import CartItem from "./CartItem";

const HomeSection = () => {
  const router = useRouter();

  // Función para redirigir a la página de productos
  const handleNavigate = () => {
    router.push("/products");
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection />  {/* ✅ Usamos el nuevo componente */}
     
      {/* Second Section */}
      <div className="relative min-h-screen text-black flex flex-col md:flex-row bg-[#E5E0E0]">
        {/* Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10  py-16 md:py-0">
          <video className="h-full w-full rounded-lg" autoPlay loop muted>
            <source src="/images/home-section2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center px-6 md:px-10 lg:px-20">
          <p className="text-lg md:text-xl">Exquisite Blends, Crafted for You</p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight mt-1 max-w-lg">
            Your perfect cup awaits
          </h3>
          <p className="mt-4 text-lg md:text-xl max-w-lg">
            Indulge in the finest selection of premium coffee and tea. Sourced from the best plantations, brewed to perfection.
          </p>

          {/* Button */}
          <div className="mt-6 w-full">
            <button
              onClick={handleNavigate}
              className="border border-zinc-950 text-zinc-950 px-6 py-3 text-lg flex items-center hover:bg-zinc-950 hover:text-white transition md:w-auto"
            >
              Shop Now <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <ProductsSection />

      {/* Call to Action Section */}
      <div className="bg-[#E5E0E0] min-h-[50vh] flex flex-col items-center justify-center text-center px-6 md:px-10 lg:px-20">
        <h3 className="text-base md:text-xl lg:text-2xl max-w-2xl font-zapf mb-3">
          Nourish your body and mind with our carefully curated coffee and tea selections.
          Packed with antioxidants, energy-boosting properties, and pure flavors.
        </h3>
        <p className="text-sm md:text-base mt-4 uppercase">
          Drink better, live better
        </p>
      </div>
    </>
  );
};

export default HomeSection;