'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/common/Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on login page
  if (pathname === '/login') {
    return null;
  }

  return <Navbar />;
}
