import React from "react";
import Image from "next/image";
import Logo from '../public/note.png';
import SearchBar from './searchBar';

const DashboardHeader = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    
                    {/* Logo Section */}
                    <div className="flex items-center gap-5">
                        <a href="/" className="flex items-center text-teal-600">
                            <Image alt="logo" src={Logo} height={50} width={50} />
                            <span className="sr-only">Home</span>
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 ml-60 mr-8">
                        <SearchBar />
                    </div>

                    {/* Header Title */}
                    <div className="text-lg font-semibold text-strongViolet">
                        NOTIE
                    </div>

                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
