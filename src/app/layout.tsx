import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Relay — The Easiest Infrastructure API",
  description:
    "One API for email, built for developers. Send transactional email, track delivery, and debug every request in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} bg-canvas-dark`}
    >
      <body className="min-h-screen bg-canvas-dark font-sans text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
