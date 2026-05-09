import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from '@inertiajs/react';
import { Users, Copy, CheckCheck, X } from 'lucide-react';
import { Avatar } from '@/Components/shared/Avatar';
import { ROOM_CATEGORIES } from '@/lib/constants';
import type { Room, User } from '@/types';

interface WaitingStateProps {
    room: Room;
    currentUser: User;
}

export function WaitingState({ room, currentUser }: WaitingStateProps) {
    const [copied, setCopied] = useState(false);
    const categoryInfo = ROOM_CATEGORIES.find((c) => c.value === room.category);
    const roomUrl = window.location.href;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(roomUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // ignore
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            {/* Animated pulse rings */}
            <div className="relative mb-10 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-primary-500/20"
                        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                        transition={{
                            duration: 2,
                            delay: i * 0.5,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                        style={{ width: 80, height: 80 }}
                    />
                ))}
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-primary-500/30 bg-primary-600/20"
                >
                    <Users className="h-9 w-9 text-primary-400" />
                </motion.div>
            </div>

            {/* Category badge */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-sm font-medium text-primary-400"
            >
                <span>{categoryInfo?.emoji}</span>
                <span>{categoryInfo?.label}</span>
            </motion.div>

            {/* Room title */}
            <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-2 font-space-grotesk text-2xl font-bold text-neutral-100"
            >
                {room.title}
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8 max-w-md text-neutral-400"
            >
                {room.description ?? 'Menunggu partner untuk bergabung ke room ini...'}
            </motion.p>

            {/* Copy link */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
            >
                <span className="flex-1 truncate font-mono text-sm text-neutral-400">{roomUrl}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-lg bg-primary-600/20 px-3 py-1.5 text-xs font-medium text-primary-400 transition-all hover:bg-primary-600/30 active:scale-95"
                >
                    {copied ? (
                        <>
                            <CheckCheck className="h-3.5 w-3.5" />
                            Tersalin!
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            Salin Link
                        </>
                    )}
                </button>
            </motion.div>

            {/* Participants */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-8 flex items-center justify-center gap-6"
            >
                {/* Creator */}
                <div className="flex flex-col items-center gap-2">
                    <Avatar user={currentUser} size="lg" />
                    <span className="text-sm font-medium text-neutral-300">{currentUser.name}</span>
                    <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs text-primary-400">
                        Kamu
                    </span>
                </div>

                {/* VS divider */}
                <div className="flex flex-col items-center gap-1">
                    <div className="h-8 w-px bg-white/10" />
                    <span className="text-xs font-bold text-neutral-600">VS</span>
                    <div className="h-8 w-px bg-white/10" />
                </div>

                {/* Partner slot */}
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/20"
                    >
                        <span className="text-xl">?</span>
                    </motion.div>
                    <span className="text-sm text-neutral-500">Partner</span>
                    <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500">
                        Menunggu...
                    </span>
                </div>
            </motion.div>

            {/* Cancel button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <Link
                    href={`/rooms/${room.id}/cancel`}
                    method="post"
                    as="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2 text-sm font-medium text-red-400 transition-all hover:border-red-500/40 hover:bg-red-500/20"
                >
                    <X className="h-4 w-4" />
                    Batalkan Room
                </Link>
            </motion.div>
        </div>
    );
}
