// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Horizon",
  description: "Build faster. See further.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-dvh antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="p-4">
           
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
