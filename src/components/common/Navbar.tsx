"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setSearchTerm(searchParams.get("q") ?? "");
    }, [searchParams]);

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const term = searchTerm.trim();
        if (term) {
            router.push(`/browse/search?q=${encodeURIComponent(term)}`);
          } else {
            router.push('/browse/search');
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
                    width={30}
                    height={30}
                />
                <h1 className="text-xl font-bold">Moviez</h1>
            </Link>
        
        <div className="flex gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/" className={linkClassName('/')}>
                Home
            </Link>
            <Link href="/browse/library" className={linkClassName('/browse/library')}>
                Library
            </Link>
            <Link href="/auth/account" className={linkClassName('/auth/account')}>
                Account
            </Link>
        </div>
        
        <form className="max-w-md relative" onSubmit={handleSearch}>
            <input 
                type="text" 
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search movies..." 
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
