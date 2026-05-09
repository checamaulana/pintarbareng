import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

interface StreakCounterProps {
    streak: number;
    className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
    const isActive = streak > 0;

    return (
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl border',
                isActive 
                    ? 'bg-orange-50 border-orange-200 text-orange-700' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-500',
                className
            )}
        >
            <div className={cn(
                'flex items-center justify-center',
                isActive && 'streak-active text-orange-500'
            )}>
                <Flame className="w-5 h-5" fill={isActive ? 'currentColor' : 'none'} />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Streak</span>
                <span className="text-lg font-bold leading-none">{streak} Hari</span>
            </div>
        </motion.div>
    );
}
