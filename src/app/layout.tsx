import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Horizon",
  description: "Task management dashboard with secure authentication and adaptive UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="horizon-bg relative min-h-screen overflow-hidden">
        <Providers>
          {/* background layers */}
          <div className="absolute inset-0 ember-layer pointer-events-none" />

          {/* center content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
