"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoHeart } from "react-icons/go";
import { CartItem } from "./CartItem";


  const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  // Función para redirigir a la página de detalles del producto
  const handleProductDetails = (id) => {
    console.log("Redirigiendo a:", id);
    router.push(`/products/${id}`);
  };

  // 🛒 Nueva función para agregar productos al carrito (localStorage)
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Evita que se active la redirección

    // Obtener carrito desde localStorage o inicializarlo vacío
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Buscar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    // Guardar en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // (Opcional) Notificación de éxito
    alert("Producto añadido al carrito");

    
    // Redirigir a la página de carrito
    router.push("/cart"); // Esto redirige a la página del carrito
  };

  return (
    <div className="max-w-[1500px] mx-auto w-full px-4 py-10">
      <h1 className="text-3xl font-bold text-black mt-5 text-center py-4 bg-[#E5E0E0] w-full">
        Nuestros Productos
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-15 gap-y-20 mt-8 justify-items-center">

        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductDetails(product.id)}
            className="flex flex-col justify-between items-center text-center p-4 w-[250px] h-[420px] bg-white shadow-md rounded-lg hover:shadow-lg cursor-pointer transition transform hover:scale-105"
          >
            <div className="min-h-[20px] flex items-center justify-end w-full">
              {product.category && (
                <p className="text-[10px] text-red-900 font-medium">
                  {product.category}
                </p>
              )}
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-40 object-cover rounded-md"
            />
            <GoHeart className="relative left-15 mb-2" />
            <h3 className="font-semibold mt-2 mb-1 min-h-[48px] flex items-center justify-center">
              {product.name}
            </h3>
            <p className="text-green-900 text-[12px] font-bold">
              {product.weight}
            </p>
            <p className="text-gray-600 text-sm mt-1 min-h-[60px] text-wrap">
              {product.description}
            </p>

            {/* Contenedor de Precio y Botón */}
            <div className="w-full mt-auto flex flex-col items-center">
              <p className="font-semibold text-[16px] mb-2">{product.price}</p>
              <button
                className="bg-[#333333] text-white text-sm px-4 py-2 rounded-full"
                onClick={(e) => handleAddToCart(e, product)} // <-- Aquí usamos la función
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;