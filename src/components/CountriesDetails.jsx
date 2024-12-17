import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'


export const CountryDetails = () => {

    const { id } = useParams(); // this get the country name
    const [countryData, setCountryData] = useState(null);
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(id)}`);
                const details = await response.json();
                setCountryData(details[0]);
            } catch (error) {
                console.error('Error fetching country details:', error);
            }
        };

        fetchDetails();
    }, [id]);

    if (!countryData) {
        return (
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
                <p className='text-3xl font-semibold text-light-text dark:text-white flex items-center justify-center p-4 m-20'>
                    Loading...
                </p>
            </div>
        );
    }

    const {
        flags,
        name,
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        languages,
        borders
    } = countryData;

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="p-4 sm:p-8 md:p-16 max-w-[1440px] mx-auto"
            >
                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2 sm:py-3 
                              bg-light-element dark:bg-dark-element 
                              shadow-md rounded-lg hover:shadow-lg transition-all duration-300
                              text-light-text dark:text-white text-sm sm:text-base"
                >
                    <FaArrowLeftLong />
                    <span>Back</span>
                </motion.button>

                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 mt-8 sm:mt-12 md:mt-16">
                    <motion.div 
                        variants={itemVariants}
                        className="w-full h-[200px] sm:h-[300px] md:h-[400px] relative"
                    >
                        <img
                            className="absolute w-full h-full object-contain shadow-md rounded-lg"
                            src={flags?.svg || flags?.png}
                            alt={`${name?.common} flag`}
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            }}
                        />
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="space-y-6 sm:space-y-8"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text dark:text-white">
                            {name?.common}
                        </h1>
                        
                        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-3">
                                <DetailRow label="Native Name" 
                                    value={name?.nativeName ? Object.values(name.nativeName)[0]?.common : "N/A"} />
                                <DetailRow label="Population" value={population?.toLocaleString()} />
                                <DetailRow label="Region" value={region} />
                                <DetailRow label="Sub Region" value={subregion} />
                                <DetailRow label="Capital" value={capital?.[0]} />
                            </div>

                            <div className="space-y-3">
                                <DetailRow label="Top Level Domain" value={tld?.join(", ")} />
                                <DetailRow label="Currencies" 
                                    value={currencies ? Object.values(currencies)[0]?.name : "N/A"} />
                                <DetailRow label="Languages" 
                                    value={languages ? Object.values(languages).join(", ") : "N/A"} />
                            </div>
                        </div>

                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center"
                        >
                            <h2 className="text-lg sm:text-xl font-semibold text-light-text dark:text-white">
                                Border Countries:
                            </h2>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {borders?.length > 0 ? 
                                    borders.map((border, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            className="px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base
                                                      bg-light-element dark:bg-dark-element 
                                                      shadow-md rounded-lg hover:shadow-lg transition-all duration-300
                                                      text-light-text dark:text-white"
                                        >
                                            {border}
                                        </motion.button>
                                    ))
                                    : <span className="text-light-text dark:text-white">None</span>
                                }
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

// Helper component for details with dark mode support
const DetailRow = ({ label, value }) => (
    <p className="text-lg">
        <span className="font-semibold text-light-text dark:text-white">{label}: </span>
        <span className="text-light-text dark:text-gray-300">{value}</span>
    </p>
);

export default CountryDetails;