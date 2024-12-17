import React, { useEffect, useState } from "react";
import Card from "./Card";
import { CiSearch } from "react-icons/ci";
import FilterByRegion from "./FilterByRegion";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countriesDetails, setCountriesDetails] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountriesDetails(data);
        setFilteredCountries(data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Failed to load countries. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCountries();
  }, []);

  useEffect(() => {
    const filterCountries = () => {
      let filtered = countriesDetails;

      // Filter by region
      if (selectedRegion) {
        filtered = filtered.filter(country => 
          country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(country =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.capital?.some(capital => 
            capital.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      setFilteredCountries(filtered);
    };

    filterCountries();
  }, [searchTerm, selectedRegion, countriesDetails]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="p-4 sm:p-8 md:p-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 mb-8 sm:mb-12">
          {/* Search Input */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-4 shadow-md bg-light-element dark:bg-dark-element 
                       p-3 sm:p-4 rounded-lg w-full sm:w-[480px] transition-colors duration-300"
          >
            <CiSearch className="text-xl sm:text-2xl text-gray-500 dark:text-white" />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-base sm:text-lg bg-transparent dark:text-white 
                         placeholder-gray-500 dark:placeholder-gray-300"
            />
          </form>

          {/* Filter By Region */}
          <div className="w-full sm:w-auto">
            <FilterByRegion 
              onRegionSelect={handleRegionSelect}
              selectedRegion={selectedRegion}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 
                           border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-red-500 text-xl dark:text-red-400">{errorMessage}</p>
          </div>
        )}

        {/* Countries Grid */}
        {!isLoading && !errorMessage && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                         gap-6 sm:gap-8 md:gap-10">
            {filteredCountries.map((data, index) => (
              <Card propData={data} key={index} />
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && !errorMessage && filteredCountries.length === 0 && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-xl dark:text-white">No countries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
