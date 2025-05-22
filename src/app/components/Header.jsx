import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <>
      {/* Free Shipping Banner */}
      <header className="bg-[#333333] text-white h-8 fixed w-screen z-50">
        <div className="container mx-auto p-4 flex justify-center items-center h-full">
          <p className="text-[10px] text-center">
            Click and Collect is now available. Complimentary shipping over $100.
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
