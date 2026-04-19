import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Willful Designs | Premium Web Design Agency",
  description: "An easygoing, relaxed, yet highly professional web design agency delivering premium $15k quality websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <div className="bg-container">
          <div className="blob"></div>
          <div className="blob-2"></div>
          <div className="blob-3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
