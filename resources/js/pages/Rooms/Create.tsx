import { AppLayout } from '@/Components/layout/AppLayout';
import { PageHeader } from '@/Components/shared/PageHeader';
import { Head, Link, useForm } from '@inertiajs/react';
import { ROOM_CATEGORIES } from '@/lib/constants';
import { ArrowLeft, Hash, X, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

interface CreateRoomForm {
    title: string;
    description: string;
    category: string;
    tags: string[];
}

export default function CreateRoom() {
    const { data, setData, post, processing, errors } = useForm<CreateRoomForm>({
        title: '',
        description: '',
        category: '',
        tags: [],
    });

    const [tagInput, setTagInput] = useState('');

    const addTag = (raw: string) => {
        const tag = raw.trim().replace(/^#/, '');
        if (!tag || data.tags.includes(tag) || data.tags.length >= 5) return;
        setData('tags', [...data.tags, tag]);
        setTagInput('');
    };

    const removeTag = (tag: string) => {
        setData(
            'tags',
            data.tags.filter((t) => t !== tag),
        );
    };

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(tagInput);
        } else if (e.key === 'Backspace' && tagInput === '' && data.tags.length > 0) {
            removeTag(data.tags[data.tags.length - 1]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/rooms');
    };

    return (
        <AppLayout>
            <Head title="Buat Room Baru" />

            <div className="mx-auto max-w-2xl space-y-8">
                {/* Header */}
                <PageHeader
                    title="Buat Room Baru"
                    subtitle="Buat ruang belajar dan tunggu partner bergabung."
                    actions={
                        <Link
                            href="/rooms"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-400 transition-all hover:bg-white/10 hover:text-neutral-200"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali
                        </Link>
                    }
                />

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                    {/* Category */}
                    <div>
                        <label className="mb-3 block text-sm font-semibold text-neutral-200">
                            Kategori <span className="text-red-400">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {ROOM_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setData('category', cat.value)}
                                    className={cn(
                                        'flex flex-col items-center gap-1 rounded-xl border p-3 text-sm font-medium transition-all',
                                        data.category === cat.value
                                            ? 'border-primary-500/50 bg-primary-600/20 text-primary-300 shadow-lg shadow-primary-500/10'
                                            : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:bg-white/10 hover:text-neutral-200',
                                    )}
                                >
                                    <span className="text-2xl">{cat.emoji}</span>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                        {errors.category && <p className="mt-1.5 text-xs text-red-400">{errors.category}</p>}
                    </div>

                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-neutral-200">
                            Judul Room <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: Bantu saya debug React hooks"
                            maxLength={100}
                            className={cn(
                                'w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all outline-none',
                                errors.title
                                    ? 'border-red-500/50 focus:ring-1 focus:ring-red-500/30'
                                    : 'border-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30',
                            )}
                        />
                        <div className="mt-1 flex items-center justify-between">
                            {errors.title ? <p className="text-xs text-red-400">{errors.title}</p> : <span />}
                            <span className="text-xs text-neutral-500">{data.title.length}/100</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-neutral-200">
                            Deskripsi <span className="text-xs font-normal text-neutral-500">(opsional)</span>
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Jelaskan apa yang ingin kamu pelajari atau ajarkan..."
                            rows={3}
                            maxLength={500}
                            className={cn(
                                'w-full resize-none rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all outline-none',
                                errors.description
                                    ? 'border-red-500/50 focus:ring-1 focus:ring-red-500/30'
                                    : 'border-white/10 focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30',
                            )}
                        />
                        <div className="mt-1 flex items-center justify-between">
                            {errors.description ? <p className="text-xs text-red-400">{errors.description}</p> : <span />}
                            <span className="text-xs text-neutral-500">{data.description.length}/500</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-neutral-200">
                            Tags <span className="text-xs font-normal text-neutral-500">(opsional, maks. 5)</span>
                        </label>
                        <div
                            className={cn(
                                'flex min-h-11 flex-wrap items-center gap-2 rounded-xl border bg-white/5 px-3 py-2 transition-all focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/30',
                                errors.tags ? 'border-red-500/50' : 'border-white/10',
                            )}
                        >
                            {data.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 rounded-lg bg-primary-600/20 px-2 py-0.5 text-xs font-medium text-primary-300"
                                >
                                    <Hash className="h-3 w-3" />
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-0.5 text-primary-400/70 transition-colors hover:text-primary-300"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                            {data.tags.length < 5 && (
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    onBlur={() => tagInput && addTag(tagInput)}
                                    placeholder={data.tags.length === 0 ? 'Ketik tag, tekan Enter...' : ''}
                                    className="min-w-30 flex-1 bg-transparent text-sm text-neutral-100 placeholder-neutral-500 outline-none"
                                />
                            )}
                        </div>
                        {errors.tags && <p className="mt-1.5 text-xs text-red-400">{errors.tags}</p>}
                        <p className="mt-1 text-xs text-neutral-500">Contoh: react, javascript, typescript</p>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
                        <Link
                            href="/rooms"
                            className="rounded-xl px-5 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-200"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing || !data.title || !data.category}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-all hover:bg-primary-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Membuat...
                                </>
                            ) : (
                                'Buat Room 🚀'
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </AppLayout>
    );
}
