import { AppLayout } from '@/Components/layout/AppLayout';
import { AchievementCard } from '@/Components/dashboard/AchievementCard';
import { ExpBar } from '@/Components/dashboard/ExpBar';
import { LevelBadge } from '@/Components/dashboard/LevelBadge';
import { StreakCounter } from '@/Components/dashboard/StreakCounter';
import { EmptyState } from '@/Components/shared/EmptyState';
import { StatCard } from '@/Components/shared/StatCard';
import { RoomCard } from '@/Components/room/RoomCard';
import { Head, Link, usePage } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { BookOpen, Clock, Flame, Target, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import type { ActivityLog, Badge, Room, SharedData, User } from '@/types';
import type { UserRole } from '@/lib/constants';

/* ===== Types ===== */

interface AchievementEntry {
    badge: Badge;
    is_unlocked: boolean;
    unlocked_at: string | null;
}

interface DashboardStats {
    total_sessions: number;
    total_exp: number;
    streak: number;
    level: number;
    role: UserRole | null;
}

interface DashboardProps {
    stats: DashboardStats;
    recentActivities: ActivityLog[];
    activeRoom: Room | null;
    achievements: AchievementEntry[];
}

/* ===== Activity Icon Map ===== */

const ACTIVITY_ICON_MAP: Record<ActivityLog['type'], string> = {
    session_completed: '🎯',
    badge_unlocked: '🏅',
    level_up: '🚀',
    streak_updated: '🔥',
    exp_gained: '⭐',
};

/* ===== Main Component ===== */

export default function Dashboard({ stats, recentActivities, activeRoom, achievements }: DashboardProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user as User;

    const unlockedCount = achievements.filter((a) => a.is_unlocked).length;
    const totalBadges = achievements.length;

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* ===== 1. Welcome Header ===== */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div className="flex items-center gap-4">
                        <LevelBadge level={stats.level} size="lg" />
                        <div>
                            <h1 className="font-space-grotesk text-3xl font-bold text-neutral-900">Halo, {user.name}! 👋</h1>
                            <p className="mt-0.5 text-neutral-500">
                                {stats.role === 'teacher' ? 'Siap berbagi ilmu hari ini?' : 'Selamat datang kembali. Siap belajar hari ini?'}
                            </p>
                        </div>
                    </div>

                    <StreakCounter streak={stats.streak} />
                </motion.div>

                {/* ===== 2. EXP Bar Card ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                    <ExpBar exp={stats.total_exp} role={stats.role} />
                </motion.div>

                {/* ===== 3. Stat Cards ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <StatCard
                        label="Total Sesi"
                        value={stats.total_sessions}
                        subtext={stats.role === 'teacher' ? 'sesi mengajar' : 'sesi belajar'}
                        icon={<BookOpen className="h-5 w-5" />}
                        accent="primary"
                    />
                    <StatCard
                        label="Total EXP"
                        value={stats.total_exp.toLocaleString('id-ID')}
                        subtext="poin pengalaman"
                        icon={<Target className="h-5 w-5" />}
                        accent="exp"
                    />
                    <StatCard
                        label="Streak Harian"
                        value={`${stats.streak} Hari`}
                        subtext={stats.streak > 0 ? 'terus semangat! 🔥' : 'login tiap hari yuk'}
                        icon={<Flame className="h-5 w-5" />}
                        accent="streak"
                    />
                    <StatCard
                        label="Level Saat Ini"
                        value={stats.level}
                        subtext={stats.role === 'teacher' ? 'level pengajar' : 'level pelajar'}
                        icon={<Trophy className="h-5 w-5" />}
                        accent="success"
                    />
                </motion.div>

                {/* ===== 4. Main Content Grid ===== */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left: Rooms + Activities (2/3 width) */}
                    <div className="space-y-8 lg:col-span-2">
                        {/* Active Rooms */}
                        <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-space-grotesk text-xl font-bold text-neutral-900">Room Aktif Anda</h2>
                                <Link
                                    href="/rooms"
                                    className="flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
                                >
                                    Jelajah Room <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {activeRoom ? (
                                <RoomCard room={activeRoom} currentUser={user} />
                            ) : (
                                <EmptyState
                                    icon={<BookOpen className="h-12 w-12 text-neutral-300" />}
                                    title="Tidak ada room aktif"
                                    description="Belum bergabung atau membuat room. Yuk mulai sekarang!"
                                    action={{ label: 'Buat Room Baru', href: '/rooms/create' }}
                                />
                            )}
                        </motion.section>

                        {/* Activity History */}
                        <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.25 }}>
                            <h2 className="font-space-grotesk mb-4 text-xl font-bold text-neutral-900">Riwayat Aktivitas</h2>

                            {recentActivities.length > 0 ? (
                                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                                    <div className="divide-y divide-neutral-100">
                                        {recentActivities.map((activity, idx) => (
                                            <motion.div
                                                key={activity.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 + idx * 0.06 }}
                                                className="flex gap-4 p-4 transition-colors hover:bg-neutral-50"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xl">
                                                    {ACTIVITY_ICON_MAP[activity.type] ?? <Clock className="h-5 w-5 text-primary-600" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-neutral-900">{activity.description}</p>
                                                    <p className="mt-0.5 text-xs text-neutral-500">
                                                        {formatDistanceToNow(new Date(activity.created_at), {
                                                            addSuffix: true,
                                                            locale: idLocale,
                                                        })}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
                                    <p className="mb-2 text-2xl">📭</p>
                                    <p className="text-sm text-neutral-500">Belum ada aktivitas. Mulai gunakan fitur PintarBareng!</p>
                                </div>
                            )}
                        </motion.section>
                    </div>

                    {/* Right: Achievements (1/3 width) */}
                    <motion.aside
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <section>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="font-space-grotesk text-xl font-bold text-neutral-900">Pencapaian</h2>
                                <span className="rounded-full bg-neutral-100 px-3 py-0.5 text-sm font-semibold text-neutral-600">
                                    {unlockedCount}/{totalBadges}
                                </span>
                            </div>

                            {achievements.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {achievements.map((entry, idx) => (
                                        <motion.div
                                            key={entry.badge.id}
                                            initial={{ opacity: 0, scale: 0.92 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.05 }}
                                        >
                                            <AchievementCard
                                                badge={entry.badge}
                                                isUnlocked={entry.is_unlocked}
                                                unlockedAt={entry.unlocked_at ?? undefined}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center">
                                    <p className="text-sm text-neutral-500">Badge belum tersedia. Selesaikan sesi untuk membukanya!</p>
                                </div>
                            )}
                        </section>
                    </motion.aside>
                </div>
            </div>
        </AppLayout>
    );
}
