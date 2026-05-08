import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format angka dengan titik ribuan
 * @example formatNumber(1500) → "1.500"
 */
export function formatNumber(n: number): string {
    return new Intl.NumberFormat('id-ID').format(n);
}

/**
 * Potong teks dengan ellipsis
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
}

/**
 * Ambil inisial dari nama
 * @example getInitials("John Doe") → "JD"
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join('');
}

/**
 * Format durasi detik ke HH:MM:SS
 * @example formatDuration(3661) → "01:01:01"
 */
export function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
}

/**
 * Format tanggal ke format Indonesia
 * @example formatDate(new Date()) → "8 Mei 2026"
 */
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}

/**
 * Format waktu relatif (berapa lama yang lalu)
 * @example timeAgo("2026-05-07") → "1 hari lalu"
 */
export function timeAgo(date: string | Date): string {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} hari lalu`;
    if (hours > 0) return `${hours} jam lalu`;
    if (minutes > 0) return `${minutes} menit lalu`;
    return 'Baru saja';
}

/**
 * Warna avatar yang deterministik berdasarkan user id
 */
const AVATAR_COLORS = [
    '#4F46E5', '#7C3AED', '#DB2777', '#DC2626',
    '#D97706', '#059669', '#0891B2', '#0284C7',
];

export function getAvatarColor(id: number): string {
    return AVATAR_COLORS[id % AVATAR_COLORS.length];
}
