import { FormEventHandler } from 'react';
import { GuestLayout } from '@/Components/layout/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { BookOpen, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storeRole } from '@/actions/App/Http/Controllers/OnboardingController';
import { motion } from 'motion/react';

export default function RoleSelection() {
    const { data, setData, post, processing, errors } = useForm({
        role: '' as 'learner' | 'teacher' | '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(storeRole.url());
    };

    return (
        <GuestLayout 
            layout="centered"
            title="Kamu Mau Jadi Apa?"
            subtitle="Pilih peran utamamu di PintarBareng untuk menyesuaikan pengalaman belajar."
        >
            <Head title="Pilih Role" />

            <form onSubmit={submit}>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {/* Learner Option */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setData('role', 'learner')}
                        className={cn(
                            "relative flex flex-col items-center p-8 rounded-2xl border-2 transition-all text-center overflow-hidden group",
                            data.role === 'learner' 
                                ? "border-primary-500 bg-primary-500/10" 
                                : "border-neutral-800 bg-neutral-900/50 hover:border-primary-500/50 hover:bg-neutral-900"
                        )}
                    >
                        {data.role === 'learner' && (
                            <motion.div 
                                layoutId="role-glow" 
                                className="absolute inset-0 bg-primary-500/10 blur-xl pointer-events-none"
                            />
                        )}
                        <div className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                            data.role === 'learner' 
                                ? "bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-110" 
                                : "bg-neutral-800 text-neutral-400 group-hover:text-primary-400"
                        )}>
                            <BookOpen size={40} />
                        </div>
                        <h3 className={cn(
                            "text-2xl font-bold font-heading mb-3 transition-colors",
                            data.role === 'learner' ? "text-white" : "text-neutral-200"
                        )}>
                            Pembelajar
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">
                            Saya ingin mencari teman diskusi dan belajar skill baru dari orang lain.
                        </p>
                    </motion.button>

                    {/* Teacher Option */}
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setData('role', 'teacher')}
                        className={cn(
                            "relative flex flex-col items-center p-8 rounded-2xl border-2 transition-all text-center overflow-hidden group",
                            data.role === 'teacher' 
                                ? "border-indigo-500 bg-indigo-500/10" 
                                : "border-neutral-800 bg-neutral-900/50 hover:border-indigo-500/50 hover:bg-neutral-900"
                        )}
                    >
                        {data.role === 'teacher' && (
                            <motion.div 
                                layoutId="role-glow" 
                                className="absolute inset-0 bg-indigo-500/10 blur-xl pointer-events-none"
                            />
                        )}
                        <div className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                            data.role === 'teacher' 
                                ? "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110" 
                                : "bg-neutral-800 text-neutral-400 group-hover:text-indigo-400"
                        )}>
                            <GraduationCap size={40} />
                        </div>
                        <h3 className={cn(
                            "text-2xl font-bold font-heading mb-3 transition-colors",
                            data.role === 'teacher' ? "text-white" : "text-neutral-200"
                        )}>
                            Pengajar
                        </h3>
                        <p className="text-neutral-400 leading-relaxed">
                            Saya ingin membagikan ilmu, mengajar, dan membantu orang lain berkembang.
                        </p>
                    </motion.button>
                </div>

                {errors.role && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center mb-6">
                        {errors.role}
                    </motion.p>
                )}

                <div className="flex justify-center">
                    <motion.button
                        whileHover={data.role ? { scale: 1.05 } : {}}
                        whileTap={data.role ? { scale: 0.95 } : {}}
                        type="submit"
                        disabled={!data.role || processing}
                        className={cn(
                            "group relative flex items-center justify-center gap-2 font-semibold py-4 px-12 rounded-full transition-all text-lg overflow-hidden",
                            data.role 
                                ? "bg-gradient-to-r from-primary-600 to-indigo-600 text-white shadow-xl shadow-primary-500/25" 
                                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                        )}
                    >
                        {data.role && !processing && (
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        )}
                        
                        <span className="relative flex items-center gap-2">
                            {processing ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Lanjutkan</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </motion.button>
                </div>
            </form>
        </GuestLayout>
    );
}
