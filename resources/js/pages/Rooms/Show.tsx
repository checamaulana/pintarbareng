import { AppLayout } from '@/Components/layout/AppLayout';
import { WaitingState } from '@/Components/room/WaitingState';
import { Avatar } from '@/Components/shared/Avatar';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Video, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import type { Room, SharedData, User } from '@/types';
import { ROOM_CATEGORIES } from '@/lib/constants';

interface RoomsShowProps {
    room: Room;
}

export default function RoomsShow({ room }: RoomsShowProps) {
    const { auth } = usePage<SharedData>().props;
    const currentUser = auth.user as User;
    const categoryInfo = ROOM_CATEGORIES.find((c) => c.value === room.category);

    const isCreator = room.creator_id === currentUser.id;
    const isPartner = room.partner_id === currentUser.id;

    // Subscribe to room channel for real-time updates (creator only)
    useEffect(() => {
        if (!isCreator || room.status !== 'waiting') return;

        const channel = window.Echo.private(`room.${room.id}`);

        channel.listen('.room.joined', () => {
            // Partner joined → reload page to see 'active' status
            router.reload({ only: ['room'] });
        });

        return () => {
            window.Echo.leave(`room.${room.id}`);
        };
    }, [room.id, isCreator, room.status]);

    // Waiting state (creator)
    if (room.status === 'waiting' && isCreator) {
        return (
            <AppLayout>
                <Head title={room.title} />
                <WaitingState room={room} currentUser={currentUser} />
            </AppLayout>
        );
    }

    // Active state (session is about to start)
    if (room.status === 'active') {
        const creator = room.creator;
        const partner = room.partner;
        const otherUser = isCreator ? partner : creator;

        return (
            <AppLayout>
                <Head title={`Sesi: ${room.title}`} />
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30"
                    >
                        <Users className="h-9 w-9 text-green-400" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-2 font-space-grotesk text-2xl font-bold text-neutral-100"
                    >
                        Partner Ditemukan! 🎉
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 text-neutral-400"
                    >
                        {isCreator
                            ? `${otherUser?.name} telah bergabung ke room kamu.`
                            : `Kamu telah bergabung ke room ${creator?.name}.`}
                    </motion.p>

                    {/* Both users */}
                    {creator && partner && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-10 flex items-center gap-6"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Avatar user={creator} size="lg" />
                                <span className="text-sm text-neutral-300">{creator.name}</span>
                                <span className="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs text-primary-400">Creator</span>
                            </div>
                            <div className="text-2xl font-bold text-neutral-600">vs</div>
                            <div className="flex flex-col items-center gap-2">
                                <Avatar user={partner} size="lg" />
                                <span className="text-sm text-neutral-300">{partner.name}</span>
                                <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">Partner</span>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="inline-flex items-center gap-2 rounded-xl bg-primary-600/20 border border-primary-500/30 px-6 py-3 text-sm font-medium text-primary-300">
                            <Video className="h-4 w-4" />
                            Video call akan tersedia di Phase 5
                        </div>
                        <p className="text-xs text-neutral-500">
                            Room ID: #{room.id} · {categoryInfo?.emoji} {categoryInfo?.label}
                        </p>
                    </motion.div>
                </div>
            </AppLayout>
        );
    }

    // Cancelled / Completed
    if (room.status === 'cancelled' || room.status === 'completed') {
        const statusText = room.status === 'cancelled' ? 'Dibatalkan' : 'Selesai';
        const statusEmoji = room.status === 'cancelled' ? '❌' : '✅';

        return (
            <AppLayout>
                <Head title={room.title} />
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 text-5xl">{statusEmoji}</div>
                    <h2 className="mb-2 font-space-grotesk text-2xl font-bold text-neutral-100">
                        Room {statusText}
                    </h2>
                    <p className="mb-8 text-neutral-400">{room.title}</p>
                    <Link
                        href="/rooms"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-500"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Jelajah Room
                    </Link>
                </div>
            </AppLayout>
        );
    }

    // Default: waiting but user is the partner (just joined)
    return (
        <AppLayout>
            <Head title={room.title} />
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-t-primary-500 border-white/10"
                />
                <h2 className="mb-2 font-space-grotesk text-xl font-bold text-neutral-100">
                    Menunggu Creator...
                </h2>
                <p className="mb-6 text-neutral-400">
                    Kamu sudah bergabung ke room{' '}
                    <strong className="text-neutral-200">{room.title}</strong>.
                    Menunggu {room.creator?.name} untuk memulai sesi.
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    Menunggu creator bergabung ke video call
                </div>
            </div>
        </AppLayout>
    );
}
