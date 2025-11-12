import "./globals.css";


export const metadata = {
  title: "Horizon",
  description: "Task management dashboard with secure authentication and adaptive UI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="horizon-bg">
        {children}
      <div className="ember-layer" />
      </body>
    </html>
  );
}




