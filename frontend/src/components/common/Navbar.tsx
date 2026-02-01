"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSearchUrl, getAccountUrl } from '@/lib/utils/url';

export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // Disable scroll when mobile menu is open
    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showMobileMenu]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Avoid direct setState in effect: use a local variable and only update if changed
        const q = searchParams?.get("q") ?? "";
        setSearchTerm((prev) => (prev !== q ? q : prev));
    }, [searchParams]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const term = searchTerm.trim();
        if (term) {
            router.push(getSearchUrl(term));
        } else {
            router.push(getSearchUrl());
        }
    };

    const linkClassName = (href: string) => {
        const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);
        const base = "transition-colors";
        return isActive ? `${base} text-[#ffe8ab]` : `${base} text-white hover:text-red-500`;
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center gap-4 py-3 px-6 text-white justify-between transition-all duration-300 ${isScrolled ? "bg-black/30 backdrop-blur-xl hover:bg-black/30" : "bg-transparent hover:bg-transparent"}`}>
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src='/logo.svg'
                    alt='Moviez Logo'
                    width={50}
                    height={50}
                />
            </Link>

            {/* Desktop nav links */}
            <div className="gap-8 absolute left-1/2 -translate-x-1/2 hidden sm:flex">
                <Link href="/" className={linkClassName('/')}> 
                    Home
                </Link>
                <Link href="/browse/library" className={linkClassName('/browse/library')}>
                    Library
                </Link>
                <Link href={getAccountUrl()} className={linkClassName('/auth/account')}>
                    Account
                </Link>
            </div>

            {/* Hamburger for mobile */}
            <div className="sm:hidden flex items-center">
                <button
                    type="button"
                    className="p-2 text-white/80 hover:text-white focus:outline-none"
                    aria-label="Open menu"
                    onClick={() => setShowMobileMenu(true)}
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile menu overlay */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-start pt-16 gap-8 text-2xl">
                    <button
                        type="button"
                        className="absolute top-5 right-5 p-2 text-white/60 hover:text-white"
                        aria-label="Close menu"
                        onClick={() => setShowMobileMenu(false)}
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {/* Search bar in mobile menu */}
                    <form className="w-11/12 max-w-md mx-auto relative mb-4" onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search movies, tv, anime..."
                            className="w-full px-4 py-2.5 pr-12 rounded-full bg-black/70 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-black/80 focus:border-red-500/50 transition-colors"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </form>
                    <Link href="/" className={linkClassName('/')} onClick={() => setShowMobileMenu(false)}>
                        Home
                    </Link>
                    <Link href="/browse/library" className={linkClassName('/browse/library')} onClick={() => setShowMobileMenu(false)}>
                        Library
                    </Link>
                    <Link href={getAccountUrl()} className={linkClassName('/auth/account')} onClick={() => setShowMobileMenu(false)}>
                        Account
                    </Link>
                </div>
            )}

            {/* Search bar (unchanged) */}
            <form className="max-w-md relative hidden sm:block" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search movies, tv, anime..." 
                    className="w-full px-4 py-2.5 pr-12 rounded-full bg-black/50 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-black/60 focus:border-red-500/50 transition-colors"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    aria-label="Search"
                >
                    <svg 
                        className="w-5 h-5"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </form>
        </nav>
    );
}