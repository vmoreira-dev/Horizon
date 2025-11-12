interface Task {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function TaskCard({ task }: { task: Task }) {
  // quick pretty date for the small line
  const sub = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-white/15 transition-colors">
      <div className="text-white text-[13px] font-semibold leading-tight">{task.title}</div>
      <div className="text-[11px] text-gray-400 leading-snug">Created {sub}</div>
    </div>
  );
}
