import type { Condition } from '../../types';

const conditionConfig: Record<Condition, { label: string; bg: string; text: string; dot: string }> = {
  BNWT: {
    label: 'BNWT',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  Good: {
    label: 'Good',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    dot: 'bg-blue-400',
  },
  Fair: {
    label: 'Fair',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  Worn: {
    label: 'Worn',
    bg: 'bg-rose-500/15',
    text: 'text-rose-400',
    dot: 'bg-rose-400',
  },
};

interface ConditionBadgeProps {
  condition: Condition;
  size?: 'sm' | 'md';
}

export default function ConditionBadge({ condition, size = 'sm' }: ConditionBadgeProps) {
  const cfg = conditionConfig[condition];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${cfg.bg} ${cfg.text} ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      }`}
    >
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
