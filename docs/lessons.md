# Lessons Learned — PintarBareng

## Session: 2026-05-08

### Setup & Configuration

1. **`php artisan install:broadcasting` membutuhkan interaksi** — Tidak bisa dijalankan dengan `--no-interaction` karena menggunakan `Laravel\Prompts\select()`. Setup broadcasting config (reverb config, channels.php) harus dilakukan secara manual.

2. **Package `motion` sudah tersedia** — Framer Motion dalam project ini menggunakan package `motion` (bukan `framer-motion`). Import dari `motion/react`, bukan dari `framer-motion`.

3. **Alias `@/` sudah ada di tsconfig.json** — Tidak perlu menambahkan lagi, tapi harus ditambahkan juga di `vite.config.ts` → `resolve.alias` agar Vite bisa resolve saat build.

4. **TypeScript types harus export dari index.ts** — Agar bisa di-import dengan `import type { User } from '@/types'`, semua types harus di-re-export dari `types/index.ts`.

5. **`bun add` pada Windows menghasilkan exit code 1** — Meski ada pesan error `.env`, semua packages berhasil terinstall. Exit code 1 bukan indikasi kegagalan.

### Coding Patterns

6. **Komponen React menggunakan named export, bukan default** — Sesuai FRONTEND_GUIDELINES, gunakan `export function ComponentName()` bukan `export default function`.

7. **Level badge menggunakan CSS class `level-badge-{n}`** — Agar bisa apply gradient per level dari CSS global, bukan inline style Tailwind.

8. **Avatar color deterministik** — Gunakan `id % AVATAR_COLORS.length` untuk mendapatkan warna konsisten berdasarkan user ID, bukan random.
