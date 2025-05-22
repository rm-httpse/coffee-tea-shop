'use client';
 
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
 
const CartPage = () => {
  const [cart, setCart] = useState([]);
  const router = useRouter();
 
  useEffect(() => {
    // Cargar productos del carrito desde el localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);
 
  const handleRemoveItem = (productId) => {
    // Eliminar producto del carrito
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    // Actualizar en el localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
 
  const handleIncreaseQuantity = (productId) => {
    // Incrementar cantidad del producto
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    // Actualizar en el localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
 
  const handleDecreaseQuantity = (productId) => {
    // Decrementar cantidad del producto
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    // Actualizar en el localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
 
  const handleCheckout = () => {
    router.push("/checkout"); // Redirigir a la página de pago
  };
 
  // Calcular el total
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.price); // Convertir precio a número
      const quantity = parseInt(item.quantity, 10); // Convertir cantidad a número
      if (!isNaN(price) && !isNaN(quantity)) {
        return acc + (price * quantity); // Sumar precio * cantidad
      }
      return acc;
    }, 0).toFixed(2); // Redondear a dos decimales
  };
 
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center">Carrito de Compras</h1>
      <p className="text-center mt-4">Aquí aparecerán los productos agregados.</p>
 
      {/* Mostrar productos en el carrito */}
      {cart.length === 0 ? (
        <p className="text-center mt-4">Tu carrito está vacío.</p>
      ) : (
        <div className="mt-6">
          {cart.map((product) => (
            <div key={product.id} className="flex items-center justify-between mb-4 p-4 border-b">
              <div className="flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  {/* Mostrar el precio en euros (€) */}
                  <p className="text-sm text-gray-600">{`€ ${parseFloat(product.price).toFixed(2)}`}</p>
                </div>
              </div>
 
              {/* Controles de cantidad */}
              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 bg-gray-200 text-sm rounded"
                  onClick={() => handleDecreaseQuantity(product.id)}
                >
                  -
                </button>
                <span className="text-lg">{product.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 text-sm rounded"
                  onClick={() => handleIncreaseQuantity(product.id)}
                >
                  +
                </button>
              </div>
 
              {/* Botón de eliminar */}
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => handleRemoveItem(product.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
 
          <div className="mt-6 flex justify-between items-center">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded"
              onClick={handleCheckout}
            >
              Proceder al pago
            </button>
            <div className="font-semibold">
              {/* Mostrar total en euros */}
              Total: € {calculateTotal()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default CartPage;
 
 