import { Search, X } from 'lucide-react';
import { ROOM_CATEGORIES } from '@/lib/constants';

interface RoomFiltersProps {
    selectedCategory: string | null;
    search: string;
    onCategoryChange: (category: string | null) => void;
    onSearchChange: (search: string) => void;
}

export function RoomFilters({
    selectedCategory,
    search,
    onCategoryChange,
    onSearchChange,
}: RoomFiltersProps) {
    return (
        <div className="space-y-4">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari room berdasarkan judul..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-neutral-100 placeholder-neutral-500 backdrop-blur-sm outline-none transition-all focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
                />
                {search && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onCategoryChange(null)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                        selectedCategory === null
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                            : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-neutral-200'
                    }`}
                >
                    Semua
                </button>
                {ROOM_CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() =>
                            onCategoryChange(cat.value === selectedCategory ? null : cat.value)
                        }
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                            selectedCategory === cat.value
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-neutral-200'
                        }`}
                    >
                        <span>{cat.emoji}</span>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
