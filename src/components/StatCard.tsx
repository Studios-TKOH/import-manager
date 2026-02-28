import { StatCardProps } from "../types";

export function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
      <div className={`stat-icon-wrapper ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  );
}
