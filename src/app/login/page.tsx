'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

export default function Login() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Signup form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Fetch movies for background
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Fetching movies...');
        const response = await fetch('/api/v1/data?type=movies&category=top_rated&page=1');
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Fetched data:', data);
        if (Array.isArray(data) && data.length > 0) {
          console.log('Movies found:', data.length);
          console.log('First movie:', data[0]);
          setMovies(data);
        } else if (data.results && Array.isArray(data.results)) {
          console.log('Movies found:', data.results.length);
          setMovies(data.results);
        } else {
          console.log('No results in data');
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setIsLoadingMovies(false);
      }
    };
    fetchMovies();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    // TODO: Implement actual signup logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleContinueAsGuest = () => {
    localStorage.setItem('isGuest', 'true');
    router.push('/');
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
          <div className="grid grid-cols-5 gap-0 p-0 h-full w-full auto-rows-max opacity-60">
            {movies.slice(0, 20).map((movie) => {
              const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
              console.log(`Rendering movie: ${movie.title}, poster_path: ${movie.poster_path}, URL: ${imageUrl}`);
              return (
                <div key={movie.id} className="relative aspect-[2/3] overflow-hidden shadow-none bg-gray-800">
                  {movie.poster_path ? (
                    <Image
                      src={imageUrl}
                      alt={movie.title}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-300"
                      onLoad={() => console.log(`Image loaded: ${movie.title}`)}
                      onError={(e) => {
                        console.error(`Image failed to load: ${movie.title}`, e);
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
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dark Overlay with app gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/60 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Login Card */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 shadow-lg shadow-black/50 backdrop-blur-sm">
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
              <p className="text-gray-400">Discover your next favorite movie or show</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white/10 border border-white/20 accent-red-500 cursor-pointer"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-red-500 hover:text-red-400 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:from-red-700 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/20"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or</span>
            </div>
          </div>

          {/* Continue as Guest Button */}
          <button
            type="button"
            onClick={handleContinueAsGuest}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 hover:border-white/30 transition-all"
          >
            Continue as Guest
          </button>
          </div>

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
