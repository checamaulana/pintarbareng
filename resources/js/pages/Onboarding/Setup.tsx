import { FormEventHandler, useState } from 'react';
import { GuestLayout } from '@/Components/layout/GuestLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { X, Sparkles, User as UserIcon, Tag, AlignLeft, ArrowRight, Loader2 } from 'lucide-react';
import { User, SharedData } from '@/types';
import { storeSetup } from '@/actions/App/Http/Controllers/OnboardingController';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function SetupProfile() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user as User;

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        username: '',
        bio: '',
        skill_tags: [] as string[],
    });

    const [tagInput, setTagInput] = useState('');

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagInput.trim().toLowerCase();
            if (tag && !data.skill_tags.includes(tag) && data.skill_tags.length < 5) {
                setData('skill_tags', [...data.skill_tags, tag]);
                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setData(
            'skill_tags',
            data.skill_tags.filter((tag) => tag !== tagToRemove),
        );
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(storeSetup.url());
    };

    return (
        <GuestLayout
            layout="centered"
            title="Lengkapi Profilmu"
            subtitle="Beritahu kami sedikit tentang dirimu agar pengalaman belajarmu lebih personal."
        >
            <Head title="Lengkapi Profil" />

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                        <UserIcon size={16} className="text-primary-400" />
                        Username <span className="text-red-500">*</span>
                    </label>
                    <div className="group relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">@</div>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                            className="w-full rounded-xl border border-neutral-800 bg-neutral-900/50 py-3 pr-4 pl-10 text-white placeholder-neutral-600 transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                            placeholder="username_kamu"
                            required
                        />
                    </div>
                    {errors.username ? (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-sm text-red-400">
                            {errors.username}
                        </motion.p>
                    ) : (
                        <p className="text-xs text-neutral-500">Hanya huruf kecil, angka, dan underscore (_).</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                        <AlignLeft size={16} className="text-primary-400" />
                        Bio Singkat
                    </label>
                    <div className="group relative">
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="min-h-25 w-full resize-y rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-white placeholder-neutral-600 transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                            placeholder={
                                user.role === 'teacher'
                                    ? 'Ceritakan keahlian dan pengalamanmu mengajar...'
                                    : 'Ceritakan apa yang ingin kamu pelajari...'
                            }
                        />
                    </div>
                    {errors.bio && <p className="mt-1 text-sm text-red-400">{errors.bio}</p>}
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                        <Tag size={16} className="text-primary-400" />
                        {user.role === 'teacher' ? 'Keahlian yang Diajarkan' : 'Skill yang Ingin Dipelajari'} (Maks 5)
                    </label>

                    <div className="flex min-h-8 flex-wrap gap-2">
                        <AnimatePresence>
                            {data.skill_tags.map((tag) => (
                                <motion.span
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/20 px-3 py-1.5 text-sm font-medium text-primary-300"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="rounded-full p-0.5 transition-colors hover:bg-primary-500/40"
                                    >
                                        <X size={14} />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                        {data.skill_tags.length === 0 && (
                            <span className="flex h-8 items-center text-sm text-neutral-600 italic">Belum ada tag yang ditambahkan.</span>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            disabled={data.skill_tags.length >= 5}
                            className={cn(
                                'w-full rounded-xl border bg-neutral-900/50 px-4 py-3 text-white transition-all focus:outline-none',
                                data.skill_tags.length >= 5
                                    ? 'cursor-not-allowed border-neutral-800 opacity-50'
                                    : 'border-neutral-800 placeholder-neutral-600 focus:border-primary-500 focus:ring-1 focus:ring-primary-500',
                            )}
                            placeholder={
                                data.skill_tags.length >= 5
                                    ? 'Batas maksimal 5 tag tercapai'
                                    : 'Ketik skill lalu tekan Enter (mis. React, Laravel, UI/UX)'
                            }
                        />
                        {data.skill_tags.length < 5 && (
                            <div className="absolute top-3.5 right-3 text-neutral-500">
                                <Sparkles size={16} />
                            </div>
                        )}
                    </div>
                    {errors.skill_tags && <p className="mt-1 text-sm text-red-400">{errors.skill_tags}</p>}
                </div>

                <div className="border-t border-neutral-800/50 pt-6">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={processing}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-primary-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:from-primary-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />

                        <span className="relative flex items-center gap-2">
                            {processing ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Selesai & Mulai Eksplorasi</span>
                                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </span>
                    </motion.button>
                </div>
            </form>
        </GuestLayout>
    );
}
