interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
}

export default function StatsCard({ label, value, icon, accent }: StatsCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-250 hover:-translate-y-0.5 ${
        accent
          ? "bg-primary text-white shadow-lg"
          : "bg-white border border-border shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`${
            accent ? "text-secondary" : "text-secondary"
          }`}
        >
          {icon}
        </span>
      </div>
      <p
        className={`text-3xl font-bold font-display ${
          accent ? "text-white" : "text-text"
        }`}
      >
        {value}
      </p>
      <p
        className={`text-sm mt-1 ${
          accent ? "text-white/60" : "text-text-muted"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
