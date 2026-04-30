import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Portfolio | OS",
  description: "Interactive Developer Environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#050505] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}