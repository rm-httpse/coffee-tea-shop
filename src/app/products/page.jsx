"use client";
import React from 'react';
import ProductCard from '../components/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from 'swiper/modules';


const ProductPage = () => {
  return (
    <>
      {/* Fondo con imagen de café */}
      <div
        className="w-full h-[500px] bg-center md:bg-top bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/cafe3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      ></div>

      {/* Texto debajo de la foto */}
      <div className="w-full h-[100px] flex items-center justify-center text-center text-white p-4 bg-[#333333]">
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          className="w-full"
        >
          <SwiperSlide>
            <p className="text-[25px] font-semibold">"Una de las mejores experiencias que he tenido"</p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-[25px] font-semibold">"Precios accesibles y café de buena calidad"</p>
          </SwiperSlide>
          <SwiperSlide>
            <p className="text-[25px] font-semibold">"El mejor café que he probado"</p>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Sección de productos (Café & Té) */}
      <ProductCard />

      {/* Contenedor de la imagen y el texto */}
      <div className="w-full flex flex-col items-center mt-10">
        {/* Fondo con imagen de té */}
        <div
          className="w-full h-[500px] mt-20 bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: "url('/images/teDIV.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        ></div>
        {/* Texto debajo de la imagen de té */}
        <div className="w-full h-[150px] flex justify-center items-center text-center text-lg font-semibold text-gray-800 px-6 py-4 bg-[#E5E0E0]">
          <p className="max-w-2xl">Sumérgete en la experiencia única del té orgánico, con aromas y sabores que inspiran tranquilidad.</p>
        </div>
      </div>

      {/* Contenedor para imagen a la izquierda y texto a la derecha */}
      <div className="flex flex-col md:flex-row mt-10 items-center justify-between px-4 py-6">
        {/* Imagen a la izquierda */}
        <div className="w-full md:w-1/4">
          <img
            src="/images/cafeGrano.jpg"
            alt="Café Grano"
            className="w-full h-auto rounded-md object-contain"
          />
        </div>

        {/* Texto a la derecha */}
        <div className="w-full md:w-1/2 px-10 mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold text-center md:text-left">Café Premium</h2>
          <p className="text-base sm:text-lg mt-4 px-4 sm:px-0 text-center sm:text-left">
            Disfruta de nuestro café premium, ideal para empezar el día con energía. Proviene de fincas seleccionadas, con un sabor único y suave.
          </p>
        </div>
      </div>

      {/* Contenedor para texto a la izquierda y imagen a la derecha */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6">
        {/* Texto a la izquierda */}
        <div className="w-full md:w-1/2 p-l4">
          <h2 className="text-3xl font-semibold text-center md:text-left">Té Orgánico</h2>
          <p className="text-base sm:text-lg mt-4 px-4 sm:px-0 text-center sm:text-left leading-relaxed">
            Disfruta de nuestro té orgánico, ideal para relajarte y disfrutar de un momento de tranquilidad. Proviene de plantaciones sostenibles, con un sabor único y natural.
          </p>
        </div>

        {/* Imagen a la derecha */}
        <div className="w-full md:w-1/4 mt-10 md:mt-0">
          <img
            src="/images/relaxing.jpg"
            alt="Té"
            className="w-full h-auto max-w-full rounded-md object-contain"
          />
        </div>
      </div>

      {/* Video y texto */}
      <div className="flex flex-col md:flex-row items-center mt-20 justify-between w-full h-[700px] gap-8 px-10 bg-[#E5E0E0] py-10">
        {/* Video a la izquierda */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 py-16 md:py-0">
          <video controls className="w-full h-auto max-w-full object-contain rounded-lg" autoPlay loop muted>
            <source src="/images/teVideo.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        </div>

        {/* Texto a la derecha */}
        <div className="w-full md:w-1/3 mt-10 md:mt-0">
          <h2 className="text-3xl font-semibold mb-4">Disfruta de nuestros tés</h2>
          <p className="text-lg text-gray-700">
            Sumérgete en la experiencia única del té orgánico, con aromas y sabores que inspiran tranquilidad. Perfecto para cualquier momento del día.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

