"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductDetails from "@/app/components/ProductDetails";

const ProductPage = () => {
  const { id } = useParams(); // 📌 Obtiene el ID desde la URL dinámica
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔍 ID del producto en la URL:", id);

    if (!id || isNaN(Number(id))) {
      setError("ID de producto inválido");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log("📡 Cargando productos desde JSON...");
        const res = await fetch("/data/products.json");

        if (!res.ok) throw new Error("❌ Error al obtener datos");

        const data = await res.json();
        console.log("📦 Datos recibidos:", data);

        if (!Array.isArray(data)) {
          throw new Error("❌ El archivo JSON no contiene un array válido");
        }

        const foundProduct = data.find((p) => p.id === Number(id));

        if (foundProduct) {
          console.log("✅ Producto encontrado:", foundProduct);
          setProduct(foundProduct);
        } else {
          console.warn("⚠️ Producto no encontrado");
          setError("Producto no encontrado");
        }
      } catch (err) {
        console.error("❌ Error en fetch:", err.message);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-details p-4 max-w-screen-lg mx-auto">
      {product ? (
        <>
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="w-[600] h-auto mt-4 object-cover rounded-md"
          />
          <p className="text-gray-600 text-sm mt-2">{product.description}</p>
          {product.sellingPhrase && (
            <p className="italic text-lg text-green-600 mt-2">{product.sellingPhrase}</p>
          )}
          <div className="mt-4">
            <p className="font-semibold">Categoría: {product.category || "No disponible"}</p>
            <p className="font-semibold">Peso: {product.weight}</p>
            <p className="font-semibold">Precio: {product.price}</p>
          </div>
        </>
      ) : (
        <ProductDetails id={id} /> // 🔥 Pasa el ID a `ProductDetails`
      )}
    </div>
  );
};

export default ProductPage;

