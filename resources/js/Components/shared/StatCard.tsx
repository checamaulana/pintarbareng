import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    icon?: ReactNode;
    accent?: 'primary' | 'success' | 'warning' | 'streak' | 'exp';
    className?: string;
}

const ACCENT_MAP = {
    primary: {
        iconBg: 'bg-primary-100',
        iconColor: 'text-primary-600',
        valuColor: 'text-primary-700',
    },
    success: {
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        valuColor: 'text-emerald-700',
    },
    warning: {
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        valuColor: 'text-amber-700',
    },
    streak: {
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-500',
        valuColor: 'text-orange-600',
    },
    exp: {
        iconBg: 'bg-gradient-to-br from-amber-100 to-red-100',
        iconColor: 'text-amber-600',
        valuColor: 'text-amber-700',
    },
} as const;

export function StatCard({ label, value, subtext, icon, accent = 'primary', className }: StatCardProps) {
    const colors = ACCENT_MAP[accent];

    return (
        <div
            className={cn(
                'bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm',
                'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
                className,
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-500 mb-1">{label}</p>
                    <p className={cn('text-2xl font-bold', colors.valuColor)}>{value}</p>
                    {subtext && (
                        <p className="text-xs text-neutral-400 mt-1 truncate">{subtext}</p>
                    )}
                </div>
                {icon && (
                    <div
                        className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                            colors.iconBg,
                            colors.iconColor,
                        )}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}
