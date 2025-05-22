'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import NavDropdown from "./NavDropdown";
import { useUser } from '@/app/context/UserContext';

import {
  GoPerson,
  GoPersonFill,
  GoChevronDown,
  GoSearch,
  GoHeart,
  GoBriefcase,
  GoListUnordered,
  GoX,
  GoChevronRight
} from "react-icons/go";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [machineOpen, setMachineOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHoveringUser, setIsHoveringUser] = useState(false);
  const [cartItems, setCartItems]= useState(0);
  const timeoutRef = useRef(null);

  const { user } = useUser();
  const router = useRouter();

  const handleOpen = (setStateFn) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStateFn(true);
  };

  const handleClose = (setStateFn) => {
    timeoutRef.current = setTimeout(() => {
      setStateFn(false);
    }, 150);
  };

  const openDropdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <nav className={`text-white bg-[#E5E0E0] p-4 z-50 fixed top-0 w-screen opacity-100 ${mobileMenuOpen ? "mt-0" : "mt-8"}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="h-8 text-sm font-bold">
          <Link href="/">
            <img src="/images/logo.svg" alt="Logo" className="w-22 h-9" />
          </Link>
        </div>

        {/* Middle Navigation (Responsive) */}
        <div className="hidden md:flex flex-wrap justify-center space-x-6 lg:space-x-12 absolute left-1/2 transform -translate-x-1/2 z-50 text-black">
          {/* SHOP Dropdown */}
          <NavDropdown
            label="Shop"
            icon={<GoChevronDown />}
            open={shopOpen}
            onMouseEnter={() => handleOpen(setShopOpen)}
            onMouseLeave={() => handleClose(setShopOpen)}
            dropdownWidth="w-48"
            items={[
              { label: "Coffee", path: "/coffee" },
              { label: "Tea", path: "/tea" },
              { label: "Accessories", path: "/accessories" },
              { label: "Subscriptions", path: "/subscriptions" },
            ]}
            onItemClick={(path) => {
              router.push(path);
              setShopOpen(false);
            }}
          />

          {/* MACHINE Dropdown */}
          <NavDropdown
            label="Machine"
            icon={<GoChevronDown />}
            open={machineOpen}
            onMouseEnter={() => handleOpen(setMachineOpen)}
            onMouseLeave={() => handleClose(setMachineOpen)}
            dropdownWidth="w-56"
            items={[
              { label: "Home Machines", path: "/machines/home" },
              { label: "Commercial", path: "/machines/commercial" },
              { label: "Maintenance", path: "/machines/maintenance" },
            ]}
            onItemClick={(path) => {
              router.push(path);
              setMachineOpen(false);
            }}
          />

          <Link href="/new" className="text-zinc-950 text-sm font-medium hover:text-gray-800 transition-colors">
            NEW
          </Link>
          <Link href="/cafe" className="text-zinc-950 text-sm font-medium hover:text-gray-800 transition-colors">
            CAFE
          </Link>
        </div>

        {/* Right-Side Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:space-x-6 ml-auto text-zinc-800">
          <GoSearch
            className="text-xl cursor-pointer hover:text-gray-700"
            onClick={() => router.push('/search')}
          />

          {/* EN Dropdown */}
          <NavDropdown
            label="EN"
            icon={<GoChevronDown />}
            open={isOpen}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            dropdownWidth="w-40"
            items={[
              { label: "English", path: "#" },
              { label: "Spanish", path: "#" },
              { label: "Catalan", path: "#" },
            ]}
            onItemClick={(path) => {
              console.log(`Language selected: ${path}`);
              setIsOpen(false);
            }}
          />

          <GoHeart className="text-base cursor-pointer hover:text-gray-700 hidden md:block" />


          {/* Login/Account Icon */}
          <div
            className="relative"
            onMouseEnter={() => setIsHoveringUser(true)}
            onMouseLeave={() => setIsHoveringUser(false)}
          >
            {user ? (
              <GoPersonFill
                className="text-base cursor-pointer hover:text-gray-700"
                onClick={() => router.push('/account')}
              />
            ) : (
              <GoPerson
                className="text-base cursor-pointer hover:text-gray-700"
                onClick={() => router.push('/login')}
              />
            )}

            {user && isHoveringUser && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 text-[10px] font-semibold text-zinc-800 px-5 py-[2px] whitespace-nowrap">
                Hello, {user.firstname}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <GoBriefcase className="text-sm cursor-pointer hover:text-gray-700" />
            <span className="text-sm">2</span>
          </div>

          <button className="md:hidden text-xl mr-5" onClick={() => setMobileMenuOpen(true)}>
            <GoListUnordered />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed top-[64px] left-0 w-full h-full bg-white z-40 flex">
          <div className="w-full bg-white shadow-lg p-5 h-full overflow-y-auto">
            <button className="absolute top-4 right-4 text-xl text-black" onClick={() => setMobileMenuOpen(false)}>
              <GoX className="text-black" />
            </button>

            <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-medium text-black" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <div className="flex justify-between items-center text-lg font-medium text-black cursor-pointer">
                Teas <GoChevronRight />
              </div>
              <div className="flex justify-between items-center text-lg font-medium text-black cursor-pointer">
                Coffee<GoChevronRight />
              </div>
              <Link href="/rooibos" className="text-lg font-medium text-black" onClick={() => setMobileMenuOpen(false)}>
                Rooibos
              </Link>
              <div onClick={() => {
                setMobileMenuOpen(false);
                router.push('/matcha-tea');
              }} className="text-lg font-medium text-black cursor-pointer">
                Matcha Tea
              </div>
              <Link href="/coffee" className="text-lg font-medium text-black" onClick={() => setMobileMenuOpen(false)}>
                Decaf Coffee
              </Link>
              <Link href="/packs-gifts" className="text-lg font-medium text-black" onClick={() => setMobileMenuOpen(false)}>
                Packs and Gifts
              </Link>
              <div className="flex justify-between items-center text-lg font-medium text-black cursor-pointer">
                Accessories <GoChevronRight />
              </div>
            </nav>

            <div className="absolute bottom-20 left-0 w-full px-5">
              <div className="text-lg font-medium text-black block cursor-pointer" onClick={() => {
                setMobileMenuOpen(false);
                router.push("/login");
              }}>
                Login
              </div>
              <div className="flex justify-between items-center text-lg font-medium text-black cursor-pointer">
                English <GoChevronDown />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
