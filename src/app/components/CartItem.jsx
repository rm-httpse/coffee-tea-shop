import { useEffect, useState } from "react";
import { GoBriefcase } from "react-icons/go";

function CartItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Cargar productos desde JSON
  useEffect(() => {
    fetch("/data/products.json") // Accede a datos JSON
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Botón para abrir el carrito */}
      <button
        onClick={toggleModal}
        className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded-full lg:top-6 lg:right-6"
      >
        <GoBriefcase size={24} />
      </button>

      {/* Modal deslizante de derecha a izquierda */}
      <div
        className={`fixed top-0 right-0 h-full bg-black bg-opacity-40 shadow-lg p-6 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50
        xl:w-1/3 lg:w-1/3 md:w-full`} >
        <h2 className="text-lg font-semibold text-gray-300 mb-4">YOUR SHOPPING CART</h2>

        {/* Lista de productos */}
        <div className="space-y-2 overflow-y-auto">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border-b text-gray-400 pb-2">
                <p className="font-medium">{product.name}</p>
                <p className="text-white">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-300" style={{ color: 'oklch(0.705 0.015 286.067)' }}>
              No hay productos en el carrito.
            </p>
          )}
        </div>

        {/* Botón para cerrar */}
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default CartItem;
