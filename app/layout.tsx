import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZARA | Jewellery - New Collection",
  description:
    "Discover the latest jewellery collection. Rings, necklaces, bracelets, earrings and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
