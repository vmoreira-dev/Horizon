import LayoutShell from "@/components/layout-shell";
import Board from "@/components/board";

export default function Page() {
  return (
    <LayoutShell>
  <div className="rounded-lg border p-6 mb-6">
    <h2 className="text-xl font-medium">Dashboard</h2>
    <p className="text-sm text-muted-foreground">
      Start building your focus board here.
    </p>
  </div>

  <Board />
</LayoutShell>

  );
}
