"use client";
 
export default function AboutPage() {
  return (
    <div className="w-full">
     
      {/* Sección Principal con Imagen de Fondo */}
      <div
        className="relative w-full h-screen flex flex-col justify-center items-center text-white text-center px-6"
        style={{
          backgroundImage: "url('/images/granoverdeCafe.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Capa oscura para mejorar la visibilidad del texto */}
        {/*<div className="absolute inset-0 bg-gray-700 bg-opacity-50"></div>*/}
 
        {/* Contenido encima de la imagen */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ¿Porqué Luven?
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mt-16 mx-auto mb-8">
            Promovemos el comercio justo, cada sorbo es un impacto positivo.
          </p>
          {/* Botón para hacer scroll hacia "Nuestra Visión" */}
          <a
            href="#vision"
            className="border border-white text-white py-3 px-6 rounded-lg text-lg transition duration-200
                      hover:bg-white hover:text-black hover:shadow-lg"
          >
            Saber más
          </a>
        </div>
      </div>
 
      {/* Nuestra Visión */}
      {/* Contenedor para texto a la izquierda y imagen a la derecha */}
    <div id="vision" className="grid grid-cols-1 md:grid-cols-2 h-screen place-items-start px-4 py-6 bg-[#333333]">
        <div className="max-w-6xl mx-auto flex flex-col items-start justify-start p-6">
          <h2 className="text-3xl font-semibold text-white mb-4 mt-10">Nuestra Visión</h2>
          <p className="text-lg text-white mt-4">
            Creemos en un mundo donde el café y el té pueden ser más que una simple bebida:
            pueden ser un motor de cambio positivo, promoviendo la <strong>sostenibilidad</strong> y el
           <strong> comercio justo</strong>.
          </p>  
 
          <p className="text-lg text-white mt-4">
            Nos esforzamos por conectar a los consumidores con los productores,
            garantizando prácticas <strong>éticas</strong> y <strong>responsables</strong>.
          </p>  
 
          <p className="text-lg text-white mt-4">
            Trabajamos directamente con comunidades productoras de África y Latinoamérica,
            garantizando una remuneración justa y promoviendo el desarrollo local.
            Nuestra misión es fomentar un <strong>consumo consciente</strong> que beneficie a las
            comunidades locales y al medio ambiente.
          </p>    
      </div>
        {/* Imagen a la derecha */}
        <div className="w-full md:h-[500px] mt-10 flex justify-center">
          <img
            src="/images/cafeMolido.jpg"
            alt="Té"
            className="w-full max-w-[700px] rounded-xl object-contain"
          />
        </div>
    </div>
 
 
      {/* Enfoque en la Comunidad */}
      <div className="w-full">
        {/*Img de fondo y texto a la izquierda*/}
        <div
          className="relative w-full h-[600px] bg-cover bg-center text-gray-700 px-6 flex items-start py-20"
          style={{
            backgroundImage: "url('/images/comuna.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
        {/* capa oscura para mejora visibilidad texto*/}
        {/*<div className="absolute inset-0 bg-gray-700 bg-opacity-50"></div>*/}
 
        {/*Texto encima de la img*/}
        <div className="max-w-6xl mx-auto flex flex-col items-start justify-start p-6 pb-12">
          <h2 className="text-3xl font-semibold text-white mb-4 mt-10">Enfoque en la comunidad</h2>
          <p className="text-lg text-white mt-4">
            En Luven, no solo vendemos café y té; construimos relaciones.
            Trabajamos mano a mano con comunidades productoras, asegurando que cada
            grano cuente una historia de esfuerzo y dedicación.
          </p>
        </div>
      </div>
    </div>
     
 
 
    {/* Por Qué lo Hacemos */}
      <section className="max-w-7xl mt-20 mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
         
          {/* Video a la izquierda (AutoPlay + Loop + Sin Controles) */}
          <div className="w-full flex justify-center">
            <video
              className="w-full max-w-[600px] rounded-xl shadow-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/images/teMolido.mp4" type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          </div>
 
          {/* Texto a la derecha */}
          <div className="flex flex-col justify-center text-right self-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">¿Por Qué lo Hacemos?</h2>
            <p className="text-lg text-gray-700">
              Nuestra pasión por el café y el té va más allá del sabor. Queremos construir un
              futuro más justo y sostenible, apoyando a comunidades que dependen de estos
              cultivos y ofreciendo productos de calidad a nuestros clientes.
            </p>
          </div>
        </div>
      </section>
 
 
    </div>
  );
}
 
 