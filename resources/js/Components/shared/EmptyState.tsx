import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    emoji?: string;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    icon,
    emoji,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center py-16 px-6 text-center',
                className,
            )}
        >
            {/* Ikon / Emoji */}
            {icon ? (
                <div className="mb-5 text-neutral-400">{icon}</div>
            ) : emoji ? (
                <div className="mb-5 text-6xl" role="img" aria-hidden="true">
                    {emoji}
                </div>
            ) : null}

            {/* Judul */}
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>

            {/* Deskripsi */}
            {description && (
                <p className="text-sm text-neutral-500 max-w-xs leading-relaxed mb-6">{description}</p>
            )}

            {/* CTA */}
            {action && <div>{action}</div>}
        </div>
    );
}
