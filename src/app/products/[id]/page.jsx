"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductDetails from "@/app/components/ProductDetails";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("250g"); // Default to 250g
  const [price, setPrice] = useState(5); // Default price for 250g

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("ID de producto inválido");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch("/data/products.json");
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("El archivo JSON no contiene un array válido");
        }

        const foundProduct = data.find((p) => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Producto no encontrado");
        }
      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Cambiar el precio según el peso seleccionadoo
  useEffect(() => {
    switch (selectedWeight) {
      case "250g":
        setPrice(5);
        break;
      case "500g":
        setPrice(10);
        break;
      case "1kg":
        setPrice(20);
        break;
      default:
        setPrice(5); // Default to 250g price if something goes wrong
        break;
    }
  }, [selectedWeight]);

  if (loading) return <p className="text-center text-lg">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 max-w-screen-lg mx-auto mt-10 mb-10">
      <style jsx global>{`
        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
        }
        body {
          padding-top: 80px;
        }
      `}</style>
      {product ? (
        <>
          <img
            src={product.image}
            alt={product.name}
            className="w-[400px] h-auto object-cover rounded-lg shadow-md"
          />
          <div className="ml-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.description}</p>
            {product.sellingPhrase && (
              <p className="italic text-lg text-green-600 font-semibold">{product.sellingPhrase}</p>
            )}
            <div className="mt-6 space-y-2">
              <p className="font-semibold text-gray-700">Categoría: <span className="text-gray-900">{product.category || "No disponible"}</span></p>
              <p className="font-semibold text-gray-700">Peso: <span className="text-gray-900">{product.weight}</span></p>
              {/* Aquí se muestra el precio dinámico */}
              <p className="font-bold text-xl text-green-900">{`€${price}`}</p>
            </div>

            {/* Opciones de gramos */}
            <div className="mt-4">
              <p className="font-semibold text-gray-700 mb-2">Selecciona el peso:</p>
              <div className="flex space-x-2">
                {["250g", "500g", "1kg"].map((weight) => (
                  <button
                    key={weight}
                    className={`px-4 py-2 border rounded-lg ${selectedWeight === weight ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setSelectedWeight(weight)}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de compra */}
            <button className="mt-6 w-full bg-[#333333] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#444444] transition">
              Comprar ahora
            </button>

          </div>
        </>
      ) : (
        <ProductDetails id={id} />
      )}
    </div>
  );
};

export default ProductPage;
