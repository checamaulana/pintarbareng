import { Head, Link } from '@inertiajs/react';
import { register, login } from '@/routes';
import { Video, Award, Users, ArrowRight, BookOpen, Sparkles, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50 selection:bg-primary-500/30 selection:text-white font-sans overflow-x-hidden">
            <Head title="Belajar Bersama Lebih Menyenangkan" />

            {/* Navigation Bar */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-neutral-950/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl font-heading text-white">
                            PintarBareng
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#fitur" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Fitur</a>
                        <a href="#tentang" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Tentang</a>
                        <a href="#komunitas" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Komunitas</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={login.url()}
                            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors hidden sm:block"
                        >
                            Masuk
                        </Link>
                        <Link
                            href={register.url()}
                            className="text-sm font-medium bg-white hover:bg-neutral-200 text-neutral-950 px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-white/10"
                        >
                            Daftar Gratis
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Abstract Backgrounds */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary-600/20 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary-300 mb-8 backdrop-blur-md"
                    >
                        <Sparkles size={16} className="text-primary-400" />
                        Platform Belajar Peer-to-Peer Next Gen
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-6 leading-tight tracking-tight max-w-5xl mx-auto"
                    >
                        Belajar Bersama, <br className="hidden md:block"/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-indigo-400 to-purple-400">
                            Lebih Menyenangkan.
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Platform video call P2P untuk belajar skill baru bersama teman diskusi sefrekuensi. Kumpulkan EXP, naik level, dan jadilah masternya!
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href={register.url()}
                            className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-medium py-4 px-8 rounded-full transition-all shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2 group text-lg"
                        >
                            Mulai Belajar Sekarang
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <Link
                            href="#fitur"
                            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-4 px-8 rounded-full transition-colors flex items-center justify-center text-lg backdrop-blur-md"
                        >
                            Pelajari Lebih Lanjut
                        </Link>
                    </motion.div>
                </div>

                {/* Dashboard Preview Mockup (Abstracted) */}
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-20 max-w-5xl mx-auto px-6 relative z-10"
                >
                    <div className="rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-2xl shadow-2xl p-4 overflow-hidden relative">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="aspect-video bg-neutral-950 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                            <div className="w-full h-full flex items-center justify-center relative">
                                {/* Mock UI Elements */}
                                <div className="absolute left-8 top-8 bottom-8 w-64 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-4">
                                    <div className="h-8 w-2/3 bg-white/10 rounded-lg" />
                                    <div className="h-24 w-full bg-white/5 rounded-lg" />
                                    <div className="h-24 w-full bg-white/5 rounded-lg" />
                                </div>
                                <div className="absolute right-8 top-8 w-72 h-48 bg-primary-500/10 border border-primary-500/20 rounded-xl backdrop-blur-md flex items-center justify-center">
                                    <Video size={48} className="text-primary-400 opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="fitur" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-6">Kenapa PintarBareng?</h2>
                        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">Kami merancang ulang pengalaman belajar online menjadi lebih interaktif, sosial, dan tidak membosankan.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Video size={32} />,
                                title: "Live Video Call",
                                desc: "Belajar langsung tatap muka dengan teknologi WebRTC yang stabil, cepat, dan jernih tanpa delay.",
                                color: "from-blue-500 to-cyan-500",
                                bg: "bg-blue-500/10"
                            },
                            {
                                icon: <Users size={32} />,
                                title: "Teman Sefrekuensi",
                                desc: "Algoritma kami mencocokkan Anda dengan mentor atau teman diskusi yang pas untuk mempelajari skill spesifik.",
                                color: "from-indigo-500 to-purple-500",
                                bg: "bg-indigo-500/10"
                            },
                            {
                                icon: <Award size={32} />,
                                title: "Gamifikasi Seru",
                                desc: "Sistem leveling, EXP, dan badges yang membuat proses belajar terasa seperti bermain game.",
                                color: "from-orange-500 to-red-500",
                                bg: "bg-orange-500/10"
                            }
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group relative overflow-hidden"
                            >
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br", feature.color, "shadow-lg")}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-heading text-white mb-4">{feature.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-900/20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-primary-600/30 to-indigo-600/30 blur-[120px]" />
                
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="bg-neutral-900/80 backdrop-blur-2xl border border-white/10 p-12 md:p-20 rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">Siap untuk Level Up?</h2>
                            <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Bergabunglah dengan ribuan pembelajar lainnya. Buat akun gratismu sekarang dan temukan teman belajarmu hari ini.
                            </p>
                            <Link
                                href={register.url()}
                                className="inline-flex bg-white hover:bg-neutral-200 text-neutral-950 font-bold py-4 px-12 rounded-full transition-all shadow-xl shadow-white/10 text-lg hover:scale-105"
                            >
                                Daftar Gratis Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-neutral-950 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold font-heading text-white">
                            PintarBareng
                        </span>
                    </div>
                    <p className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} PintarBareng. Dibangun dengan Laravel & React.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Discord</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
