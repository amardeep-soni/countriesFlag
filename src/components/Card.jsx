import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ propData }) => {
  const {
    flags: { png: flagImage },
    name: { common: countryName },
    population = "N/A",
    region = "N/A",
    capital = ["N/A"],
  } = propData;

  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/details/${countryName}`)}
      className="bg-light-element dark:bg-dark-element rounded-lg shadow-md overflow-hidden 
                 hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full"
    >
      <motion.div 
        className="aspect-[3/2] relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={flagImage}
          className="w-full h-full object-cover"
          alt={`${countryName} flag`}
        />
      </motion.div>
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 truncate dark:text-white">
          {countryName}
        </h2>
        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm dark:text-gray-300">
          <p><span className="font-semibold">Population:</span> {population.toLocaleString()}</p>
          <p><span className="font-semibold">Region:</span> {region}</p>
          <p><span className="font-semibold">Capital:</span> {capital.join(", ")}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
