/* ===== UI helpers ===== */
export default function KpiCard({
  title,
  value,
  delta,
}: {
  title: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="card">
      <div className="text-xs text-[--color-grayish-teal]">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-3xl font-semibold text-[--color-grass]">
          {value}
        </div>
        <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
          {delta}
        </span>
      </div>
    </div>
  );
}
