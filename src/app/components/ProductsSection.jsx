"use client";
import { useState, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import { useRouter } from "next/navigation";

const ProductsSection = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  // Función para redirigir a la página de detalles del producto
  const handleNavigateToProduct = (productId) => {
    router.push(`/products/${productId}`); // Redirige a la página de detalles usando el ID
  };

  return (
    <div className="max-w-screen-lg w-screen mx-auto px-4 md:px-0 py-10">
      <h2 className="text-sm font-light font-sans">We bring you the best from around the world.</h2>
      <h1 className="text-3xl font-medium font-sans mt-2">The Art of Coffee & Tea, Redefined</h1>

      {/* Horizontal Scroll Container */}
      <div className="relative mt-8">
        <div className="overflow-x-auto whitespace-nowrap custom-scrollbar pb-6">
          <div className="flex gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center text-center p-4 min-w-[250px] max-w-[250px] bg-white shadow-md rounded-lg"
                onClick={() => handleNavigateToProduct(product.id)} // Redirige al hacer clic en el producto
              >
                {/* Reserved Space for "New Flavor" or "BEST SELLER" */}
                <div className="min-h-[20px] flex items-center justify-end w-full">
                  {product.category ? (
                    <p className="text-[10px] text-red-900 font-medium">{product.category}</p>
                  ) : (
                    <div className="h-[10px]"></div> // Empty space to maintain alignment
                  )}
                </div>

                {/* Product Image */}
                <img src={product.image} alt={product.name} className="w-32 h-40 object-cover" />
                <GoHeart className="relative left-15 mb-1" />

                {/* Title (Fixed Height) */}
                <h3 className="font-semibold mt-2 mb-0 min-h-[48px] flex items-center justify-center">
                  {product.name}
                </h3>

                {/* Weight */}
                <p className="text-green-900 text-[12px] font-bold">{product.weight}</p>

                {/* Description (Fixed Height) */}
                <p className="text-gray-600 text-sm mt-4 h-[100px] text-wrap overflow-auto">
                  {product.description}
                </p>

                {/* Price */}
                <p className="font-bold mt-2">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
