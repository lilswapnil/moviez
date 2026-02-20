"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Card from '@/components/common/Card';
import PosterFrame from '@/components/common/PosterFrame';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchCategory = async (category: string) => {
          const pages = [1, 2];
          const results: Movie[] = [];
          for (const page of pages) {
            const response = await fetch(
              `/api/v1/data?type=movies&category=${category}&page=${page}`
            );
            const data = await response.json();
            let pageMovies: Movie[] = [];
            if (Array.isArray(data) && data.length > 0) {
              pageMovies = data;
            } else if (data.results && Array.isArray(data.results)) {
              pageMovies = data.results;
            }
            if (pageMovies.length) {
              results.push(...pageMovies);
            }
          }
          return results;
        };

        let movies = await fetchCategory('top');
        if (!movies.length) {
          movies = await fetchCategory('popular');
        }
        setMovies(movies);
      } catch (error) {
        // fail silently
      } finally {
        setIsLoadingMovies(false);
      }
    };
    fetchMovies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1200);
    } catch {
      setError("Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-black via-black to-red-950">
      {/* Cinematic Background with Gradient */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-black to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        {/* Movie poster shimmer effect */}
        {isLoadingMovies && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
        )}
        {/* Movie grid background */}
        {movies.length > 0 && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none p-0 m-0">
            <div className="grid grid-cols-10 grid-rows-4 gap-0 w-full h-full opacity-70 p-0 m-0">
              {movies.slice(0, 40).map((movie) => {
                const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
                return (
                  <PosterFrame
                    key={movie.id}
                    variant="plain"
                    className="w-full h-full"
                  >
                    {movie.poster_path ? (
                      <Image
                        src={imageUrl}
                        alt={movie.title || 'Movie Poster'}
                        fill
                        className="object-contain object-center bg-black"
                        style={{ zIndex: 0 }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center p-2">
                        <p className="text-gray-300 text-xs text-center font-semibold line-clamp-3">
                          {movie.title}
                        </p>
                      </div>
                    )}
                  </PosterFrame>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Dark Overlay with app gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
        <Card variant="elevatedBlur" radius="2xl" className="p-6">
            {/* Logo */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 shadow-lg">
                <Image
                  src="/logo.svg"
                  alt="Moviez Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
                <span className="ml-2 text-3xl font-bold text-white">moviez</span>
              </div>
              <p className="text-gray-400">Create your account and sync your library</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="text"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-0"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </Button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant="text"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-0"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </Button>
                </div>
              </div>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              {success && <div className="text-green-400 text-sm text-center">Account created! Redirecting...</div>}
              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="md"
                className="w-full"
              >
                {loading ? "Creating..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-8 text-center text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline hover:text-white">Log in</Link>
            </div>
          </Card>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500 text-center">
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="#" className="hover:text-gray-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
