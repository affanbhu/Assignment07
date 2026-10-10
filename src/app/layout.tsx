
import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "sonner";

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
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
