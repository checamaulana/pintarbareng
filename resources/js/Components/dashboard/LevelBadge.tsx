import { cn } from '@/lib/utils';

interface LevelBadgeProps {
    level: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function LevelBadge({ level, size = 'md', className }: LevelBadgeProps) {
    // Limit level styling from 1 to 8 (max level in constants)
    const badgeLevel = Math.min(Math.max(level, 1), 8);
    
    return (
        <div
            className={cn(
                'inline-flex items-center justify-center font-bold text-white rounded-full',
                `level-badge-${badgeLevel}`,
                {
                    'w-6 h-6 text-xs': size === 'sm',
                    'w-10 h-10 text-base': size === 'md',
                    'w-16 h-16 text-2xl border-4 border-white shadow-lg': size === 'lg',
                },
                className
            )}
        >
            {level}
        </div>
    );
}
