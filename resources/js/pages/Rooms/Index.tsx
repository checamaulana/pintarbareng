import { AppLayout } from '@/Components/layout/AppLayout';
import { RoomCard } from '@/Components/room/RoomCard';
import { RoomFilters } from '@/Components/room/RoomFilters';
import { EmptyState } from '@/Components/shared/EmptyState';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PaginatedData, Room, SharedData, User } from '@/types';

interface RoomsIndexProps {
    rooms: PaginatedData<Room>;
    filters: {
        category: string | null;
        search: string | null;
    };
}

export default function RoomsIndex({ rooms, filters }: RoomsIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const currentUser = auth.user as User;

    const [selectedCategory, setSelectedCategory] = useState<string | null>(filters.category ?? null);
    const [search, setSearch] = useState(filters.search ?? '');
    const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const applyFilters = useCallback((newCategory: string | null, newSearch: string) => {
        const params: Record<string, string> = {};
        if (newCategory) params.category = newCategory;
        if (newSearch) params.search = newSearch;

        router.get('/rooms', params, {
            preserveState: true,
            preserveScroll: true,
            only: ['rooms', 'filters'],
        });
    }, []);

    const handleCategoryChange = (cat: string | null) => {
        setSelectedCategory(cat);
        applyFilters(cat, search);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(() => {
            applyFilters(selectedCategory, value);
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
        };
    }, []);

    return (
        <AppLayout>
            <Head title="Jelajah Room" />

            <div className="space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div>
                        <h1 className="font-space-grotesk text-3xl font-bold text-neutral-100">
                            Jelajah Room
                        </h1>
                        <p className="mt-1 text-neutral-400">
                            {rooms.total} room tersedia — bergabunglah dan mulai belajar
                        </p>
                    </div>
                    <Link
                        href="/rooms/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-500 active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        Buat Room
                    </Link>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <RoomFilters
                        selectedCategory={selectedCategory}
                        search={search}
                        onCategoryChange={handleCategoryChange}
                        onSearchChange={handleSearchChange}
                    />
                </motion.div>

                {/* Room Grid */}
                {rooms.data.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {rooms.data.map((room, index) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                currentUser={currentUser}
                                index={index}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <EmptyState
                        icon={<Search className="h-12 w-12 text-neutral-500" />}
                        title={
                            search || selectedCategory
                                ? 'Tidak ada room yang cocok'
                                : 'Belum ada room'
                        }
                        description={
                            search || selectedCategory
                                ? 'Coba ubah filter atau kata kunci pencarian.'
                                : 'Jadilah yang pertama membuat room belajar!'
                        }
                        action={{ label: 'Buat Room Sekarang', href: '/rooms/create' }}
                    />
                )}

                {/* Pagination */}
                {rooms.last_page > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-2"
                    >
                        {rooms.links.map((link) => {
                            if (!link.url) return null;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                                        link.active
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-neutral-200'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </AppLayout>
    );
}
