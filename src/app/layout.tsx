import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/common/NavbarWrapper";

export const dynamic = 'force-dynamic';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "moviez",
  description: "A movie discovery app built with Next.js 13 and The Movie Database (TMDb) API"
};

export const viewport: Viewport = {
  themeColor: '#200404'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.variable} antialiased`}
      >
        <NavbarWrapper />
        {children}
        <footer>
        <div className="text-center py-4 bg-black/50 backdrop-blur-md text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Moviez. All rights reserved.
        </div>
      </footer>
      </body>
    </html>
  );
}
