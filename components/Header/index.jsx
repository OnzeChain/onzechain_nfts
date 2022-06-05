

import Link from 'next/link'
import React, { useState, useEffect } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const Header = ({ }) => {
    const [theme, setTheme] = useState(true);

  useEffect(() => {
    if (theme) {
      document.documentElement.className = "light-theme";
    } else {
      document.documentElement.className = "dark-theme";
    }
  }, [theme]);

    return (
        <main>
        <div className='flex items-center justify-center w-screen px-8 py-3 text-sm border-b border-opacity-50 border-secondary '>
            <div className='flex items-center justify-center justify-between w-screen mx-auto max-w-7xl'>
                

                
                <nav id='nav' className="w-auto p-2 bg-transparent bg-gray-800 border-b md:bg-secondary md:w-4/6">
                    <div className="flex items-center justify-center justify-around hidden m-3 text-primary md:flex ">
                        <Link href="/">
                            <a className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                                Explore
                            </a>
                        </Link>
                        <Link href="/create-items">
                            <a className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                                Mint
                            </a>
                        </Link>
                        <Link href="/my-assets">
                            <a className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                                My NFTs
                            </a>
                        </Link>
                        <Link href="/creator-dashboard">
                            <a className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                                Account Dashboard
                            </a>
                        </Link>
                    </div>
                </nav>
            <DarkModeToggle
            size={100}
            className="toggler"
            onChange={setTheme}
            checked={theme}
          />
        
            </div>
        </div>
        </main>
    )
}

const dropNav = () => {
    const nav = document.getElementById('fixed top-0 left-0 z-30 flex flex-col items-center justify-start w-0 h-screen overflow-hidden text-lg transition-all text-primary dark:text-sideColor bg-secondary dark:bg-primary');
    nav.style.width = '100%';
}


export default Header;