import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
    /** Judul halaman (opsional, tampil di atas form card) */
    title?: string;
    /** Subtitle / deskripsi (opsional) */
    subtitle?: string;
    /** Lebar card form */
    maxWidth?: 'sm' | 'md' | 'lg';
    className?: string;
}

const MAX_WIDTH_MAP = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
} as const;

/**
 * Layout untuk halaman guest (login, register, onboarding).
 * Menampilkan background dengan gradient + card form di tengah.
 */
export function GuestLayout({
    children,
    title,
    subtitle,
    maxWidth = 'md',
    className,
}: GuestLayoutProps) {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #EEF2FF 0%, #F9FAFB 40%, #EDE9FE 100%)',
            }}
        >
            {/* Background decoration */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
                aria-hidden="true"
            />
            <div
                className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
                aria-hidden="true"
            />

            {/* Logo */}
            <Link
                href="/"
                className="flex items-center gap-2.5 mb-8 group"
                aria-label="PintarBareng Home"
            >
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover:shadow-primary-300 transition-shadow duration-300">
                    <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span
                    className="font-bold text-2xl text-neutral-900"
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                    PintarBareng
                </span>
            </Link>

            {/* Judul + Subtitle */}
            {(title || subtitle) && (
                <div className="text-center mb-6 max-w-sm">
                    {title && (
                        <h1
                            className="text-2xl font-bold text-neutral-900 mb-1"
                            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="text-sm text-neutral-500">{subtitle}</p>
                    )}
                </div>
            )}

            {/* Form Card */}
            <div
                className={cn(
                    'w-full bg-white rounded-2xl border border-neutral-200 shadow-xl shadow-neutral-100 p-8 relative z-10',
                    MAX_WIDTH_MAP[maxWidth],
                    className,
                )}
            >
                {children}
            </div>

            {/* Footer */}
            <p className="mt-8 text-xs text-neutral-400 text-center">
                © {new Date().getFullYear()} PintarBareng. Platform belajar bersama.
            </p>
        </div>
    );
}
