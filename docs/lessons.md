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

### Phase 3 Lessons

9. **`usePage()` harus di-generic-kan** — `usePage().props` bertipe `unknown` by default. Selalu gunakan `usePage<SharedData>().props` agar TypeScript bisa resolve `auth.user`, dll.

10. **`EmptyState` action sebaiknya polymorphic** — Terima `{ label: string; href: string }` object OR `ReactNode`. Gunakan type guard `isActionObject()` di dalam komponen untuk render yang tepat. Jangan hardcode tipe action sebagai `ReactNode` saja karena menyulitkan pemanggil.

11. **`date-fns` tidak pre-installed** — Package ini tidak ada di template Laravel + Inertia default. Harus diinstall manual dengan `bun add date-fns`.

12. **Role-based level system di constants.ts** — PRD memiliki sistem level berbeda untuk Learner (Anak Baru → Hacker) dan Teacher (NPC Baik Hati → Anomali). Export LEARNER_LEVELS dan TEACHER_LEVELS sebagai const array terpisah, lalu pass `role` ke `getLevelInfo(exp, role)` agar nama level yang benar tampil di ExpBar.

### Phase 4 Lessons

13. **`PageHeader` menggunakan prop `subtitle`, bukan `description`** — Selalu cek signature komponen sebelum menggunakannya. `PageHeader` di project ini memakai `subtitle?: string`, bukan `description`.

14. **Echo private channel auth di `channels.php`** — Untuk channel `room.{roomId}`, gunakan `Room::find($roomId)` dan cek `creator_id === $user->id || partner_id === $user->id`. Return `false` (bukan abort) untuk unauthorized.

15. **`router.reload({ only: ['room'] })` untuk partial update setelah broadcast** — Saat Echo menerima event, gunakan `router.reload()` dengan `only` array untuk hanya refresh props yang relevan tanpa full page navigation.

16. **`broadcast()->toOthers()` vs `broadcast()`** — Gunakan `toOthers()` di `RoomService::join()` agar yang join tidak menerima event ke dirinya sendiri (event dikirim ke creator saja).

17. **Migration `partner_id` pakai `onDelete('set null')`** — Foreign key nullable harus `onDelete('set null')`, bukan `cascade`, agar record room tidak terhapus jika user partner di-delete.

18. **`withQueryString()` pada paginator** — Panggil `->withQueryString()` setelah `->paginate()` agar query params (category, search) ikut pada link pagination.
