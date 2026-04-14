interface StatBlockProps {
  value: string;
  label: string;
  detail?: string;
  className?: string;
}

export function StatBlock({ value, label, detail, className = '' }: StatBlockProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-[var(--text-4xl)] font-[var(--weight-bold)] text-[var(--color-cta)] mb-[var(--spacing-2)] leading-[1.07]">
        {value}
      </p>
      <p className="text-[var(--text-lg)] font-[var(--weight-medium)] mb-[var(--spacing-1)]">
        {label}
      </p>
      {detail && (
        <p className="text-[var(--text-sm)] opacity-60">
          {detail}
        </p>
      )}
    </div>
  );
}
