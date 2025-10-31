

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="horizon-bg min-h-screen text-white flex">
      
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
