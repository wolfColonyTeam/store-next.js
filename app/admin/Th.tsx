export default function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`text-left font-semibold px-4 py-3 ${className}`}>
      {children}
    </th>
  );
}
