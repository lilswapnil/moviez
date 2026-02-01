'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/common/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on login and signup pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return <Navbar />;
}
