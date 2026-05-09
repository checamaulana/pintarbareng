import { FormEventHandler } from 'react';
import { GuestLayout } from '@/Components/layout/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { store } from '@/actions/App/Http/Controllers/Auth/RegisterController';
import { login } from '@/routes';
import { motion } from 'motion/react';
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(store.url());
    };

    return (
        <GuestLayout 
            layout="split" 
            splitImageContext="register"
            title="Buat Akun Baru"
            subtitle="Mulai perjalanan belajarmu di PintarBareng"
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Nama Lengkap</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-primary-500 transition-colors">
                            <UserIcon size={18} />
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                            {errors.name}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-primary-500 transition-colors">
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            placeholder="nama@email.com"
                            required
                        />
                    </div>
                    {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                            {errors.email}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-primary-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            placeholder="Minimal 8 karakter"
                            required
                        />
                    </div>
                    {errors.password && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                            {errors.password}
                        </motion.p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-300">Konfirmasi Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-primary-500 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            placeholder="Ulangi password"
                            required
                        />
                    </div>
                    {errors.password_confirmation && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                            {errors.password_confirmation}
                        </motion.p>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary-500/25 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        
                        <span className="relative flex items-center gap-2">
                            {processing ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>Mendaftarkan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Daftar Sekarang</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <p className="text-neutral-400">
                    Sudah punya akun?{' '}
                    <Link href={login.url()} className="text-white font-medium hover:text-primary-400 transition-colors underline decoration-neutral-600 underline-offset-4 hover:decoration-primary-400">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
