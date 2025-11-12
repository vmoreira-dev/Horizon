import TaskCard from "./TaskCard";

interface Task {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function TaskColumn({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-white font-semibold text-[16px] mb-3">{title}</h3>

      <div className="flex flex-col gap-3">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
        {tasks.length === 0 && (
          <p className="text-[13px] text-gray-400 text-center">No tasks here yet.</p>
        )}
      </div>
    </div>
  );
}
