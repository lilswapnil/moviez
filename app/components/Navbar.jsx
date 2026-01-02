"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center gap-4 py-3 px-6 text-white justify-between transition-all duration-300 ${isScrolled ? "bg-black/30 backdrop-blur-xl hover:bg-black/30" : "bg-transparent hover:bg-transparent"}`}>
                <Link href="/" className="flex items-center gap-1">
                <Image
                    src='/logo.svg'
                    alt='Moviez Logo'
                    width={50}
                    height={50}
                />
                <h1 className="text-xl font-bold">Moviez</h1>
            </Link>
        
        <div className="flex gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="hover:text-red-500 transition-colors">
                Home
            </Link>
            <Link href="/library" className="hover:text-red-500 transition-colors">
                Library
            </Link>
            <Link href="/account" className="hover:text-red-500 transition-colors">
                Account
            </Link>
        </div>
        
        <div className="max-w-md relative">
            <input 
                type="text" 
                placeholder="Search movies..." 
                className="w-full px-4 py-2.5 pr-10 rounded-full bg-white/10 backdrop-blur-sm border-none text-white placeholder-gray-400 focus:outline-none focus:bg-white/15 transition-colors"
            />
            <svg 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        
        
        </nav>
    )
}