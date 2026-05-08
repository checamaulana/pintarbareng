import React from 'react';
import { getAvatarColor, getInitials } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

interface AvatarProps {
    user: Pick<User, 'id' | 'name' | 'avatar_color'>;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const SIZE_MAP = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
} as const;

export function Avatar({ user, size = 'md', className }: AvatarProps) {
    const initials = getInitials(user.name);
    const bgColor = user.avatar_color || getAvatarColor(user.id);
    const sizeClass = SIZE_MAP[size];

    return (
        <div
            className={cn(
                'inline-flex items-center justify-center rounded-full font-semibold text-white ring-2 ring-white shadow-sm select-none shrink-0',
                sizeClass,
                className,
            )}
            style={{ backgroundColor: bgColor } as React.CSSProperties}
            aria-label={`Avatar ${user.name}`}
            title={user.name}
        >
            {initials}
        </div>
    );
}
