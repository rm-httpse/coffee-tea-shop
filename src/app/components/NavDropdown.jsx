// components/NavDropdown.jsx
"use client";
import React from "react";

const NavDropdown = ({
  label,
  icon,
  items = [],
  open,
  onMouseEnter,
  onMouseLeave,
  onItemClick,
  dropdownWidth = "w-30",
}) => {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-zinc-950 text-sm font-medium hover:text-gray-800 transition-colors cursor-pointer flex items-center">
        {label} {icon}
      </div>

      {open && (
        <div
          className={`absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-lg ${dropdownWidth}  py-2 z-50 transition-all duration-200 ease-in-out`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {items.map(({ label, path }, index) => (
            <div
              key={index}
              onClick={() => onItemClick(path)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
