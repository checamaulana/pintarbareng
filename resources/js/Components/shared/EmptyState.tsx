import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type ActionObject = { label: string; href: string };

interface EmptyStateProps {
    icon?: ReactNode;
    emoji?: string;
    title: string;
    description?: string;
    /** Pass either a {label, href} object for a default-styled button, or any ReactNode for custom rendering. */
    action?: ActionObject | ReactNode;
    className?: string;
}

function isActionObject(action: ActionObject | ReactNode): action is ActionObject {
    return typeof action === 'object' && action !== null && 'label' in (action as object) && 'href' in (action as object);
}

export function EmptyState({ icon, emoji, title, description, action, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 py-16 text-center',
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
            <h3 className="mb-2 text-xl font-semibold text-neutral-900">{title}</h3>

            {/* Deskripsi */}
            {description && <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-500">{description}</p>}

            {/* CTA */}
            {action && (
                <div>
                    {isActionObject(action) ? (
                        <Link
                            href={action.href}
                            className="inline-flex items-center rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                        >
                            {action.label}
                        </Link>
                    ) : (
                        action
                    )}
                </div>
            )}
        </div>
    );
}
