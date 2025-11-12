export default function Home() {
  const columns = [
    {
      title: "To Do",
      tasks: [{ title: "Finish Docs", subtitle: "11/12/2025" }],
    },
    { title: "In Progress", tasks: [] },
    { title: "Completed", tasks: [] },
  ];

  return (
    <main className="glass-container text-center space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="relative text-center space-y-3">
        <h1 className="text-7xl font-bold tracking-tight text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
          Horizon
        </h1>

        <p className="text-white/70 text-lg font-light max-w-xl mx-auto">
          Task management dashboard with secure authentication and an adaptive UI.
        </p>

        <button className="text-sm text-white/70 hover:text-white absolute right-12 top-0">
          Log in
        </button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {columns.map((col) => (
          <div
            key={col.title}
            className={`space-y-4 ${
              col.title === "In Progress"
                ? "scale-[1.01] brightness-110"
                : "brightness-95"
            }`}
          >
            <h2 className="text-lg font-semibold mb-2 text-white">
              {col.title}
            </h2>

            {col.tasks.length > 0 ? (
              <div className="space-y-4">
                {col.tasks.map((task) => (
                  <div key={task.title} className="glass-card task-card text-left">
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <p className="text-sm text-white/60">{task.subtitle}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">No tasks yet.</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
