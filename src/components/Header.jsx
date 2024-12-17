import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from './ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <div className='bg-light-element dark:bg-dark-element transition-colors duration-300 
                    flex justify-between px-4 sm:px-8 md:px-16 shadow-md h-16 sm:h-20 
                    items-center sticky top-0 z-50'>
      <Link to="/">
        <div className='font-bold text-lg sm:text-2xl md:text-3xl hover:text-gray-700 
                       dark:text-white transition-colors'>
          Atlas Explorer
        </div>
      </Link>
      <button 
        onClick={toggleTheme}
        className='flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg 
                   hover:bg-gray-100 dark:hover:bg-dark-bg transition-all
                   dark:text-white text-sm sm:text-base'
      >
        {isDarkMode ? <FaSun className="h-4 w-4 sm:h-5 sm:w-5" /> : <FaMoon className="h-4 w-4 sm:h-5 sm:w-5" />}
        <span className='font-medium'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </div>
  )
}

export default Header