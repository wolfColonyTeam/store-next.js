/* ===== UI helpers ===== */
export default function KpiCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="card">
      <div className="text-xs text-[--color-grayish-teal]">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-3xl font-semibold text-[--color-grass]">
          {value}
        </div>
      </div>
    </div>
  );
}
