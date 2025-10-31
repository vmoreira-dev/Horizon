import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="horizon-bg min-h-screen text-white flex">
      <Sidebar />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
