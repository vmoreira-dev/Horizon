const navItems = [
  { label: "Dashboard" },
  { label: "Tasks" },
  { label: "Analytics" },
  { label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="glass-card w-60 h-screen p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-lg font-semibold mb-8 text-accent tracking-wide">
          Horizon
        </h1>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full text-sm text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <p className="text-xs text-gray-500">v0.1</p>
    </aside>
  );
}
