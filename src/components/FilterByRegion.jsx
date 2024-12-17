import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from "react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const FilterByRegion = ({ onRegionSelect, selectedRegion }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRegionSelect = (region) => {
    onRegionSelect(region === selectedRegion ? "" : region);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative w-64 dropdown-container">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-light-element dark:bg-dark-element text-light-text dark:text-white
                   py-4 px-6 rounded-lg shadow-md flex justify-between items-center
                   hover:shadow-lg transition-all duration-300"
      >
        <span>{selectedRegion || "Filter by Region"}</span>
        <motion.svg
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-light-element dark:bg-dark-element rounded-lg shadow-lg z-50
                       border dark:border-gray-700 transition-all duration-300"
          >
            {regions.map((region, index) => (
              <motion.li
                key={region}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleRegionSelect(region)}
                className={`px-6 py-3 cursor-pointer transition-colors duration-200
                           hover:bg-gray-100 dark:hover:bg-gray-700
                           ${region === selectedRegion ? 'font-bold' : ''}
                           ${region === selectedRegion ? 'bg-gray-100 dark:bg-gray-700' : ''}
                           text-light-text dark:text-white`}
              >
                {region}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterByRegion;
