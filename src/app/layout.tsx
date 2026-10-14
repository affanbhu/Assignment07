
import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { Toaster } from "react-hot-toast";

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

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 6000,
            success: {
              duration: 6000,
              style: {
                background: "#eaf8ef",
                color: "#1b7840",
              },
            },
            error: {
              duration: 6000,
              style: {
                background: "#fff0ef",
                color: "#b42318",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
