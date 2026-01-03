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
  title: "Moviez - Movie Discovery",
  description: "Discover movies, TV shows, anime, cartoons, and Korean dramas. A beautiful movie discovery app powered by TMDb API.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "Moviez",
    description: "Discover your next favorite movie or show",
    url: "https://moviez.app",
    siteName: "Moviez",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moviez",
    description: "Discover your next favorite movie or show",
    images: ["/og-image.svg"],
  },
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
