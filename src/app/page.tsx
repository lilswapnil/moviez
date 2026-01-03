'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isGuest = localStorage.getItem('isGuest') === 'true';
    
    if (!isGuest) {
      // Not logged in and not a guest, redirect to login
      router.push('/login');
    } else {
      // Guest user, redirect to home
      router.push('/browse/home');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-gray-400">Loading...</div>
    </div>
  );
}
