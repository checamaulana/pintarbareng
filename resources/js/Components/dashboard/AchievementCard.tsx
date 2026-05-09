import { Badge } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

interface AchievementCardProps {
    badge: Badge;
    isUnlocked: boolean;
    unlockedAt?: string;
    className?: string;
}

export function AchievementCard({ badge, isUnlocked, unlockedAt, className }: AchievementCardProps) {
    const tierColors = {
        bronze: 'bg-amber-700/10 text-amber-700 border-amber-700/20',
        silver: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
        gold: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
    };

    return (
        <motion.div
            whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
            className={cn(
                'flex flex-col items-center p-4 rounded-2xl border text-center relative transition-all',
                isUnlocked 
                    ? cn('bg-white', tierColors[badge.tier])
                    : 'bg-neutral-50 border-neutral-200 grayscale opacity-70',
                className
            )}
        >
            {!isUnlocked && (
                <div className="absolute top-2 right-2 text-neutral-400">
                    <Lock className="w-4 h-4" />
                </div>
            )}
            
            <div className="text-4xl mb-3 drop-shadow-sm">
                {badge.icon}
            </div>
            
            <h4 className="font-space-grotesk font-bold text-neutral-900 leading-tight mb-1">
                {badge.name}
            </h4>
            
            <p className="text-xs text-neutral-500 mb-2 leading-relaxed flex-1">
                {badge.description}
            </p>
            
            {isUnlocked && unlockedAt ? (
                <div className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider mt-auto">
                    {new Date(unlockedAt).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    })}
                </div>
            ) : (
                <div className="text-[10px] font-medium text-neutral-400 mt-auto px-2 py-0.5 bg-neutral-200/50 rounded-full">
                    {badge.condition_value} {badge.condition_type}
                </div>
            )}
        </motion.div>
    );
}
