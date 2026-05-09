import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GuestLayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    layout?: 'centered' | 'split';
    splitImageContext?: 'login' | 'register';
    className?: string;
}

export function GuestLayout({
    children,
    title,
    subtitle,
    layout = 'centered',
    splitImageContext = 'login',
    className,
}: GuestLayoutProps) {
    if (layout === 'split') {
        return (
            <div className="min-h-screen flex bg-neutral-950 text-neutral-50 overflow-hidden font-sans">
                {/* Left side: Premium Image / Gradient Context */}
                <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
                    {/* Background layers */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-neutral-950" />
                        {splitImageContext === 'login' ? (
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-900 via-neutral-950 to-neutral-950" />
                        ) : (
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-neutral-950" />
                        )}
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-600/20 blur-[120px]" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
                        {/* A nice subtle noise overlay if possible, or just grid */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-3xl font-heading text-white">
                            PintarBareng
                        </span>
                    </div>

                    <div className="relative z-10 mt-auto max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight text-white">
                                {splitImageContext === 'login'
                                    ? "Belajar bersama lebih mudah dan menyenangkan."
                                    : "Mulai perjalanan belajarmu hari ini."}
                            </h2>
                            <p className="text-lg text-neutral-400 font-medium leading-relaxed">
                                Temukan mentor, diskusi dengan peers, dan tingkatkan skill-mu di ruang belajar virtual interaktif.
                            </p>
                        </motion.div>
                        
                        {/* Decorative floating elements */}
                        <motion.div 
                            className="absolute -right-12 top-[-100px] w-48 h-48 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-3xl transform rotate-12"
                            animate={{ y: [0, -20, 0], rotate: [12, 15, 12] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div 
                            className="absolute right-32 top-[-200px] w-32 h-32 rounded-full border border-primary-500/20 bg-primary-500/10 backdrop-blur-3xl"
                            animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-neutral-950">
                    <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-xl font-heading text-white">
                            PintarBareng
                        </span>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={cn("w-full max-w-md", className)}
                    >
                        {(title || subtitle) && (
                            <div className="mb-10">
                                {title && <h1 className="text-3xl font-bold font-heading text-white mb-2">{title}</h1>}
                                {subtitle && <p className="text-neutral-400">{subtitle}</p>}
                            </div>
                        )}
                        {children}
                    </motion.div>
                </div>
            </div>
        );
    }

    // Centered layout (for Onboarding)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-neutral-950 font-sans text-neutral-50">
            {/* Dark premium background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-600/10 blur-[150px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Top Logo */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mb-10 flex items-center justify-center"
            >
                <Link href="/" className="flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 group-hover:scale-105 transition-all duration-300">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                </Link>
            </motion.div>

            {(title || subtitle) && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative z-10 text-center mb-10 max-w-2xl"
                >
                    {title && <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">{title}</h1>}
                    {subtitle && <p className="text-lg text-neutral-400">{subtitle}</p>}
                </motion.div>
            )}

            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                    "relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl",
                    className
                )}
            >
                {children}
            </motion.div>
        </div>
    );
}
