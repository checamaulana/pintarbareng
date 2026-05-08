import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
    return (
        <div className={cn('flex items-start justify-between gap-4 mb-8', className)}>
            <div>
                <h1 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
                )}
            </div>
            {actions && (
                <div className="flex items-center gap-3 shrink-0">{actions}</div>
            )}
        </div>
    );
}
