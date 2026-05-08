import { Navbar } from '@/Components/layout/Navbar';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    className?: string;
}

/**
 * Layout utama untuk halaman yang membutuhkan autentikasi.
 * Menampilkan Navbar + content area dengan padding top sesuai navbar height.
 */
export function AppLayout({ children, className }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />
            <main
                id="main-content"
                className={cn(
                    'pt-16',   /* offset navbar height */
                    className,
                )}
                role="main"
            >
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
