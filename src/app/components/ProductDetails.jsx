// components/ProductDetails.jsx
"use client";

import ProductNotFound from "@/app/components/ProductNotFound"; // Ajusta la ruta si es necesario

const ProductDetails = ({ id }) => { // Recibe id como prop
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center">Detalles del Producto: {id}</h1>
      <p className="text-center mt-4">¡Pronto estarán disponibles los detalles de los productos!</p>
      <ProductNotFound />
    </div>
  );
};

export default ProductDetails;
