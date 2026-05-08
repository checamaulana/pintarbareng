import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    LogOut,
    Search,
    Trophy,
    User as UserIcon,
    Plus,
    Bell,
    BookOpen,
} from 'lucide-react';
import { Avatar } from '@/Components/shared/Avatar';
import { cn } from '@/lib/utils';
import { getLevelInfo } from '@/lib/constants';
import type { SharedData } from '@/types';

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    currentPath: string;
}

function NavLink({ href, icon, label, currentPath }: NavLinkProps) {
    const isActive = currentPath === href || currentPath.startsWith(href + '/');

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
            )}
            aria-current={isActive ? 'page' : undefined}
        >
            <span className="w-4 h-4">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}

export function Navbar() {
    const { auth, url } = usePage<SharedData & { url: string }>().props;
    const user = auth.user;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const levelInfo = user ? getLevelInfo(user.exp) : null;

    return (
        <header
            id="main-navbar"
            className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm"
        >
            <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0"
                    aria-label="PintarBareng Home"
                >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-sm">
                        <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span
                        className="font-bold text-lg text-neutral-900 hidden sm:block"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        PintarBareng
                    </span>
                </Link>

                {/* Navigation Links — hanya tampil jika sudah login */}
                {user && (
                    <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi utama">
                        <NavLink
                            href="/dashboard"
                            icon={<LayoutDashboard size={16} />}
                            label="Dashboard"
                            currentPath={currentPath}
                        />
                        <NavLink
                            href="/rooms"
                            icon={<Search size={16} />}
                            label="Jelajah Room"
                            currentPath={currentPath}
                        />
                        <NavLink
                            href="/leaderboard"
                            icon={<Trophy size={16} />}
                            label="Leaderboard"
                            currentPath={currentPath}
                        />
                    </nav>
                )}

                {/* Right side */}
                <div className="flex items-center gap-2 shrink-0">
                    {user ? (
                        <>
                            {/* Buat Room CTA */}
                            <Link
                                href="/rooms/create"
                                id="navbar-create-room-btn"
                                className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 cursor-pointer"
                            >
                                <Plus size={15} />
                                <span>Buat Room</span>
                            </Link>

                            {/* Level Badge mini */}
                            {levelInfo && (
                                <div className={cn(
                                    'hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white shrink-0',
                                    `level-badge-${Math.min(user.level, 8)}`,
                                )}>
                                    <span>Lv.{user.level}</span>
                                    <span className="opacity-80 truncate max-w-[80px]">{levelInfo.name}</span>
                                </div>
                            )}

                            {/* Notifikasi placeholder */}
                            <button
                                className="w-9 h-9 flex items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors duration-200 cursor-pointer"
                                aria-label="Notifikasi"
                                id="navbar-notifications-btn"
                            >
                                <Bell size={17} />
                            </button>

                            {/* Avatar + Dropdown */}
                            <div className="relative group">
                                <button
                                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-neutral-100 transition-colors duration-200 cursor-pointer"
                                    aria-label="Menu profil"
                                    id="navbar-profile-btn"
                                >
                                    <Avatar user={user} size="sm" />
                                    <span className="text-sm font-medium text-neutral-700 hidden lg:block max-w-[100px] truncate">
                                        {user.username || user.name}
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-neutral-200 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    {/* User info */}
                                    <div className="px-4 py-3 border-b border-neutral-100">
                                        <p className="text-sm font-semibold text-neutral-900 truncate">{user.name}</p>
                                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                    </div>

                                    {/* Links */}
                                    <div className="py-1">
                                        <Link
                                            href="/profile"
                                            id="navbar-profile-link"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer"
                                        >
                                            <UserIcon size={15} className="text-neutral-400" />
                                            Profil Saya
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            id="navbar-logout-btn"
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                                        >
                                            <LogOut size={15} />
                                            Keluar
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                id="navbar-login-btn"
                                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors duration-200 cursor-pointer"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                id="navbar-register-btn"
                                className="px-4 py-2 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors duration-200 cursor-pointer"
                            >
                                Daftar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
