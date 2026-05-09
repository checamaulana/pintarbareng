import { Link } from '@inertiajs/react';
import { Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { Avatar } from '@/Components/shared/Avatar';
import { ROOM_CATEGORIES } from '@/lib/constants';
import type { Room, User } from '@/types';

interface RoomCardProps {
    room: Room;
    currentUser: User;
    index?: number;
}

export function RoomCard({ room, currentUser, index = 0 }: RoomCardProps) {
    const categoryInfo = ROOM_CATEGORIES.find((c) => c.value === room.category);
    const isCreator = room.creator_id === currentUser.id;
    const isWaiting = room.status === 'waiting';
    const isActive = room.status === 'active';
    const creator = room.creator;

    const timeAgo = formatDistanceToNow(new Date(room.created_at), {
        addSuffix: true,
        locale: idLocale,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-primary-500/10"
        >
            {/* Category + Status */}
            <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-400">
                    <span>{categoryInfo?.emoji}</span>
                    <span>{categoryInfo?.label ?? room.category}</span>
                </span>

                {isActive && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-semibold text-green-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                        Berlangsung
                    </span>
                )}
                {isWaiting && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        Menunggu
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="mb-1.5 line-clamp-2 font-space-grotesk text-base font-bold text-neutral-100 transition-colors group-hover:text-primary-300">
                {room.title}
            </h3>

            {/* Description */}
            {room.description && (
                <p className="mb-3 line-clamp-2 text-sm text-neutral-400">{room.description}</p>
            )}

            {/* Tags */}
            {room.tags && room.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {room.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400"
                        >
                            #{tag}
                        </span>
                    ))}
                    {room.tags.length > 3 && (
                        <span className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs text-neutral-500">
                            +{room.tags.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
                {/* Creator */}
                {creator && (
                    <div className="flex items-center gap-2">
                        <Avatar user={creator} size="xs" />
                        <span className="text-xs text-neutral-400">
                            {creator.name ?? creator.username ?? 'Unknown'}
                        </span>
                    </div>
                )}

                {/* Time */}
                <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <Clock className="h-3 w-3" />
                    {timeAgo}
                </span>
            </div>

            {/* Action Button */}
            <div className="mt-3">
                {isCreator ? (
                    <Link
                        href={`/rooms/${room.id}`}
                        className="flex w-full items-center justify-center rounded-xl bg-primary-500/10 px-4 py-2 text-sm font-semibold text-primary-400 transition-all hover:bg-primary-500/20"
                    >
                        Lihat Room
                    </Link>
                ) : isWaiting ? (
                    <Link
                        href={`/rooms/${room.id}/join`}
                        method="post"
                        as="button"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-500 active:scale-95"
                    >
                        <Users className="h-4 w-4" />
                        Join Room
                    </Link>
                ) : (
                    <div className="flex w-full cursor-not-allowed items-center justify-center rounded-xl bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-500">
                        Tidak Tersedia
                    </div>
                )}
            </div>
        </motion.div>
    );
}
