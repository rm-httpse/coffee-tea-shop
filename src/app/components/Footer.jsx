'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaSquareXTwitter, FaSquareInstagram, FaFacebook } from "react-icons/fa6";
import { FiPlus, FiMinus } from "react-icons/fi";

const Footer = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-[#333333] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Large Screens - Original Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h1 className="text-3xl font-bold uppercase">Luven.</h1>
            <div>
              <h3 className="text-[12px] font-[20] mt-3 uppercase">Follow Us</h3>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><FaFacebook className='w-8 h-8' /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaSquareInstagram className='w-8 h-8' /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaSquareXTwitter className='w-8 h-8' /></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/shop" className="text-gray-400 hover:text-white">Shop</a></li>
              <li><Link href="/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/coffee" className="text-gray-400 hover:text-white">Coffee</a></li>
              <li><a href="/tea" className="text-gray-400 hover:text-white">Tea</a></li>
              <li><a href="/accessories" className="text-gray-400 hover:text-white">Accessories</a></li>
              <li><a href="/subscriptions" className="text-gray-400 hover:text-white">Subscriptions</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold">Information</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="/return-policy" className="text-gray-400 hover:text-white">Return Policy</a></li>
              <li><a href="/shipping-info" className="text-gray-400 hover:text-white">Shipping Information</a></li>
            </ul>
          </div>
        </div>

        {/* Medium & Small Screens - Accordion Style */}
        <div className="lg:hidden border-t border-gray-600">
          {/* Products Section */}
          <div className="border-b border-gray-600">
            <button className="flex justify-between w-full py-4 text-lg font-semibold" onClick={() => toggleSection("products")}>
              Products {openSections["products"] ? <FiMinus /> : <FiPlus />}
            </button>
            {openSections["products"] && (
              <ul className="pl-4 pb-4 space-y-2 text-gray-400">
                <li><a href="/coffee" className="hover:text-white">Coffee</a></li>
                <li><a href="/tea" className="hover:text-white">Tea</a></li>
                <li><a href="/accessories" className="hover:text-white">Accessories</a></li>
                <li><a href="/subscriptions" className="hover:text-white">Subscriptions</a></li>
              </ul>
            )}
          </div>

          {/* Guides Section */}
          <div className="border-b border-gray-600">
            <button className="flex justify-between w-full py-4 text-lg font-semibold" onClick={() => toggleSection("guides")}>
              Guides {openSections["guides"] ? <FiMinus /> : <FiPlus />}
            </button>
            {openSections["guides"] && (
              <ul className="pl-4 pb-4 space-y-2 text-gray-400">
                <li><a href="/brewing-guides" className="hover:text-white">Brewing Guides</a></li>
                <li><a href="/coffee-bean-guide" className="hover:text-white">Coffee Bean Guide</a></li>
                <li><a href="/tea-selection" className="hover:text-white">Tea Selection</a></li>
              </ul>
            )}
          </div>

          {/* Service Section */}
          <div className="border-b border-gray-600">
            <button className="flex justify-between w-full py-4 text-lg font-semibold" onClick={() => toggleSection("service")}>
              Service {openSections["service"] ? <FiMinus /> : <FiPlus />}
            </button>
            {openSections["service"] && (
              <ul className="pl-4 pb-4 space-y-2 text-gray-400">
                <li><a href="/customer-support" className="hover:text-white">Customer Support</a></li>
                <li><a href="/returns" className="hover:text-white">Returns</a></li>
                <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              </ul>
            )}
          </div>

          {/* Contact Section */}
          <div className="border-b border-gray-600">
            <button className="flex justify-between w-full py-4 text-lg font-semibold" onClick={() => toggleSection("contact")}>
              Contact {openSections["contact"] ? <FiMinus /> : <FiPlus />}
            </button>
            {openSections["contact"] && (
              <ul className="pl-4 pb-4 space-y-2 text-gray-400">
                <li><a href="/contact-us" className="hover:text-white">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              </ul>
            )}
          </div>
        </div>

        {/* Social Media */}


        {/* Follow Us – only for mobile/accordion footer layout */}
        <div className="lg:hidden border-t border-gray-600 pt-6 text-center">
          <h3 className="text-sm uppercase text-gray-400 mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook className='w-6 h-6' /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaSquareInstagram className='w-6 h-6' /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaSquareXTwitter className='w-6 h-6' /></a>
          </div>
        </div>
      </div>

    </footer >
  );
};

export default Footer;
