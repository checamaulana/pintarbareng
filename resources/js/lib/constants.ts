/**
 * Konstanta aplikasi PintarBareng
 */

/* === KATEGORI ROOM === */
export const ROOM_CATEGORIES = [
    { value: 'pemrograman', label: 'Pemrograman', emoji: '💻' },
    { value: 'matematika', label: 'Matematika', emoji: '📐' },
    { value: 'bahasa', label: 'Bahasa', emoji: '🌏' },
    { value: 'sains', label: 'Sains', emoji: '🔬' },
    { value: 'desain', label: 'Desain', emoji: '🎨' },
    { value: 'bisnis', label: 'Bisnis', emoji: '💼' },
    { value: 'musik', label: 'Musik', emoji: '🎵' },
    { value: 'lainnya', label: 'Lainnya', emoji: '📚' },
] as const;

export type RoomCategory = (typeof ROOM_CATEGORIES)[number]['value'];

/* === LEVEL SISTEM (per PRD) === */

/** Level untuk Pembelajar */
export const LEARNER_LEVELS = [
    { level: 1, name: 'Anak Baru', minExp: 0, maxExp: 100 },
    { level: 2, name: 'Pencari Ilmu', minExp: 100, maxExp: 300 },
    { level: 3, name: 'Tukang Grinding', minExp: 300, maxExp: 700 },
    { level: 4, name: 'Haus Ilmu', minExp: 700, maxExp: 1500 },
    { level: 5, name: 'Hacker', minExp: 1500, maxExp: Infinity },
] as const;

/** Level untuk Pengajar */
export const TEACHER_LEVELS = [
    { level: 1, name: 'NPC Baik Hati', minExp: 0, maxExp: 50 },
    { level: 2, name: 'Calon Kage', minExp: 50, maxExp: 250 },
    { level: 3, name: 'Kage', minExp: 250, maxExp: 600 },
    { level: 4, name: 'Sepuh', minExp: 600, maxExp: 1300 },
    { level: 5, name: 'Anomali', minExp: 1300, maxExp: Infinity },
] as const;

/** @deprecated Use getLevelInfo(exp, role) instead */
export const LEVELS = LEARNER_LEVELS;

export type LevelEntry = { level: number; name: string; minExp: number; maxExp: number };

export function getLevelInfo(exp: number, role: UserRole | null | undefined = 'learner'): LevelEntry {
    const table = role === 'teacher' ? TEACHER_LEVELS : LEARNER_LEVELS;
    const found = table.find((l) => exp >= l.minExp && exp < l.maxExp);
    return (found ?? table[table.length - 1]) as LevelEntry;
}

export function getExpProgress(exp: number, role: UserRole | null | undefined = 'learner'): number {
    const level = getLevelInfo(exp, role);
    if (level.maxExp === Infinity) return 100;
    const progress = ((exp - level.minExp) / (level.maxExp - level.minExp)) * 100;
    return Math.min(Math.max(progress, 0), 100);
}

export const MAX_LEVEL = 5;

/* === EXP REWARD === */
export const EXP_REWARDS = {
    SESSION_COMPLETE: 50,
    FEEDBACK_PUAS: 20,
    FEEDBACK_MEMBANTU: 10,
    STREAK_BONUS: 5,
} as const;

/* === FEEDBACK TYPE === */
export const FEEDBACK_TYPES = [
    { value: 'puas', label: 'Puas', description: 'Sesi sangat membantu', color: '#10B981' },
    { value: 'membantu', label: 'Cukup Membantu', description: 'Lumayan, ada beberapa hal yang bisa ditingkatkan', color: '#6366F1' },
    { value: 'kurang', label: 'Kurang', description: 'Belum sesuai harapan', color: '#6B7280' },
] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number]['value'];

/* === USER ROLE === */
export const USER_ROLES = {
    LEARNER: 'learner',
    TEACHER: 'teacher',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/* === ROOM STATUS === */
export const ROOM_STATUS = {
    WAITING: 'waiting',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;

export type RoomStatus = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS];

/* === AVATAR COLOR PALETTE === */
export const AVATAR_COLORS = ['#4F46E5', '#7C3AED', '#DB2777', '#DC2626', '#D97706', '#059669', '#0891B2', '#0284C7'] as const;

/* === NAVIGATION === */
export const NAV_LINKS = [
    { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { href: '/rooms', label: 'Jelajah Room', icon: 'Search' },
    { href: '/leaderboard', label: 'Leaderboard', icon: 'Trophy' },
] as const;
