
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Suspense fallback={<div className="h-[120px] bg-white" />}>
          <Navbar />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}