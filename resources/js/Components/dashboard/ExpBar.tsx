import { getExpProgress, getLevelInfo, MAX_LEVEL } from '@/lib/constants';
import type { UserRole } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface ExpBarProps {
    exp: number;
    role?: UserRole | null;
    className?: string;
}

export function ExpBar({ exp, role, className }: ExpBarProps) {
    const levelInfo = getLevelInfo(exp, role);
    const progress = getExpProgress(exp, role);
    const isMaxLevel = levelInfo.level >= MAX_LEVEL;

    return (
        <div className={cn('w-full', className)}>
            <div className="mb-3 flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-space-grotesk text-lg font-bold text-neutral-900">{levelInfo.name}</h3>
                        {isMaxLevel && (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-700 uppercase">
                                MAX
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-medium text-neutral-500">Level {levelInfo.level}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-primary-600">
                        {exp.toLocaleString('id-ID')} <span className="font-medium text-neutral-400">EXP</span>
                    </p>
                    {!isMaxLevel && <p className="text-xs text-neutral-400">Next level: {levelInfo.maxExp.toLocaleString('id-ID')} EXP</p>}
                </div>
            </div>

            <div className="exp-bar-track">
                <motion.div
                    className="exp-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                />
            </div>

            {!isMaxLevel && (
                <p className="mt-1.5 text-right text-xs text-neutral-400">
                    {(levelInfo.maxExp - exp).toLocaleString('id-ID')} EXP lagi untuk level berikutnya
                </p>
            )}
        </div>
    );
}
