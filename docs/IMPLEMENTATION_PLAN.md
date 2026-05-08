# 📋 IMPLEMENTATION_PLAN — PintarBareng

> **Implementation Plan Document**
> Versi: 1.0 | Tanggal: 8 Mei 2026 | Timeline: 4 Minggu | Solo Developer

---

## Timeline Overview

```
Minggu 1 (8-14 Mei)    ███████  Foundation + Auth + Onboarding + Dashboard
Minggu 2 (15-21 Mei)   ███████  Room System + Browse/Filter + Room Detail
Minggu 3 (22-28 Mei)   ███████  WebRTC Video Call + Session Flow + Feedback
Minggu 4 (29 Mei-7 Jun)███████  Gamifikasi Polish + Leaderboard + Deploy + Video Demo
```

---

## Phase 1: Project Setup & Foundation (Hari 1-2)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | `laravel new pintarbareng` dengan starter kit        | 30m  |
| 2  | Install Inertia.js + React + TypeScript              | 30m  |
| 3  | Install & konfigurasi TailwindCSS 4                  | 20m  |
| 4  | Install shadcn/ui + setup component library          | 30m  |
| 5  | Install Framer Motion                                | 10m  |
| 6  | Setup MySQL database + `.env`                        | 15m  |
| 7  | Install Laravel Reverb + konfigurasi WebSocket       | 30m  |
| 8  | Install Laravel Echo + Pusher JS client              | 15m  |
| 9  | Setup fonts (Inter, Space Grotesk) di app.css        | 15m  |
| 10 | Buat design tokens (warna, spacing, radius) di CSS   | 30m  |
| 11 | Buat AppLayout.tsx + GuestLayout.tsx                 | 45m  |
| 12 | Buat Navbar.tsx dengan navigation                    | 45m  |
| 13 | Buat base components: Avatar, EmptyState, StatCard   | 1h   |
| 14 | Setup TypeScript types (User, Room, Badge, etc)      | 30m  |

### Deliverables
- ✅ Project berjalan di localhost
- ✅ Layout dasar dengan navbar
- ✅ Design system (warna, font, spacing) terpasang
- ✅ WebSocket server berjalan

### Commands
```bash
composer create-project laravel/laravel pintarbareng
cd pintarbareng
composer require inertiajs/inertia-laravel tightenco/ziggy laravel/reverb
bun add @inertiajs/react react react-dom framer-motion laravel-echo pusher-js lucide-react clsx tailwind-merge
bun add -d @types/react @types/react-dom typescript @tailwindcss/vite tailwindcss vite @vitejs/plugin-react
php artisan install:broadcasting  # Setup Reverb
```

---

## Phase 2: Authentication & Onboarding (Hari 3-4)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Migration: tambah kolom role, name, username, bio, skill_tags, avatar_color, exp, level, streak, is_onboarded ke users | 30m |
| 2  | Buat Enum: UserRole                                  | 10m  |
| 3  | Buat RegisterController + RegisterRequest            | 30m  |
| 4  | Buat halaman Register.tsx (email, password, konfirmasi) | 1h |
| 5  | Buat halaman SelectRole.tsx (pilih Pembelajar/Pengajar) | 1h |
| 6  | Buat OnboardingController + OnboardingRequest        | 30m  |
| 7  | Buat halaman Onboarding/Setup.tsx (nama, username, bio, tags) | 1.5h |
| 8  | Buat middleware EnsureOnboarded                      | 20m  |
| 9  | Buat LoginController + LoginRequest                  | 20m  |
| 10 | Buat halaman Login.tsx                               | 45m  |
| 11 | Buat LogoutController                                | 10m  |
| 12 | Setup StreakService + panggil saat login              | 30m  |
| 13 | Buat halaman Landing.tsx (hero, fitur, CTA)          | 2h   |
| 14 | Test full flow: Register → Role → Onboarding → Dashboard | 30m |

### Deliverables
- ✅ User bisa register + pilih role + isi profil
- ✅ User bisa login + logout
- ✅ Streak tercatat saat login
- ✅ Redirect logic benar (guest → login, not onboarded → onboarding)
- ✅ Landing page live

---

## Phase 3: Dashboard (Hari 5-6)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat DashboardController (query user data, stats, rooms, activity) | 45m |
| 2  | Buat halaman Dashboard/Index.tsx                     | 2h   |
| 3  | Buat komponen ExpBar.tsx (animated)                  | 1.5h |
| 4  | Buat komponen LevelBadge.tsx                         | 45m  |
| 5  | Buat komponen StreakCounter.tsx                       | 30m  |
| 6  | Buat komponen StatCard.tsx (total sesi, streak, level) | 30m |
| 7  | Buat komponen AchievementCard.tsx (locked/unlocked)  | 45m  |
| 8  | Buat migration + model ActivityLog                   | 20m  |
| 9  | Buat riwayat aktivitas di dashboard                  | 45m  |
| 10 | Buat room aktif card di dashboard                    | 30m  |
| 11 | Loading skeletons untuk semua dashboard sections     | 45m  |
| 12 | Responsive layout dashboard                          | 30m  |

### Deliverables
- ✅ Dashboard menampilkan semua data user
- ✅ EXP bar animated
- ✅ Badges section (locked/unlocked)
- ✅ Activity history
- ✅ Responsive

---

## Phase 4: Room System (Hari 7-9)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat migration rooms table                           | 15m  |
| 2  | Buat Model Room + Enum RoomStatus, RoomCategory      | 20m  |
| 3  | Buat RoomService (create, join, cancel, status)      | 1h   |
| 4  | Buat RoomController (index, create, store, show, join, cancel) | 1h |
| 5  | Buat CreateRoomRequest (validasi)                    | 15m  |
| 6  | Buat halaman Rooms/Create.tsx (form buat room)       | 1.5h |
| 7  | Buat komponen RoomCard.tsx                           | 1h   |
| 8  | Buat komponen RoomFilters.tsx (kategori, tag search)  | 1h   |
| 9  | Buat halaman Rooms/Index.tsx (jelajah room)           | 1.5h |
| 10 | Buat halaman Rooms/Show.tsx (waiting state)           | 1h   |
| 11 | Buat WaitingState.tsx (animasi menunggu)              | 45m  |
| 12 | Buat middleware EnsureRoomParticipant                 | 20m  |
| 13 | WebSocket: broadcast saat user join room             | 30m  |
| 14 | Auto-redirect creator saat partner join (via Echo)   | 30m  |
| 15 | Empty state halaman jelajah room                     | 20m  |
| 16 | Test: buat room → join room → status update          | 30m  |

### Deliverables
- ✅ User bisa buat room
- ✅ User bisa jelajah & filter room
- ✅ User bisa join room
- ✅ Room status update real-time
- ✅ Waiting state dengan animasi

---

## Phase 5: WebRTC Video Call (Hari 10-13)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat migration sessions_log table                    | 15m  |
| 2  | Buat Model SessionLog                                | 10m  |
| 3  | Buat SessionController (show, end)                   | 45m  |
| 4  | Buat SessionService (start, end, calculate duration) | 30m  |
| 5  | Buat custom hook useWebRTC.ts                        | 3h   |
| 6  | Setup STUN/TURN server config (metered.ca + Google STUN) | 30m |
| 7  | Buat WebSocket signaling (SDP offer/answer, ICE candidates) | 2h |
| 8  | Buat SignalingController (broadcast signaling events) | 30m |
| 9  | Buat halaman Rooms/Session.tsx (video call UI)        | 2h   |
| 10 | Buat komponen VideoPlayer.tsx (partner + self video)  | 1.5h |
| 11 | Buat komponen VideoControls.tsx (mic, cam, end)      | 45m  |
| 12 | Buat komponen SessionTimer.tsx (HH:MM:SS)            | 30m  |
| 13 | Buat komponen ConnectionStatus.tsx                   | 30m  |
| 14 | Buat EndSessionDialog.tsx (konfirmasi)               | 20m  |
| 15 | Handle disconnect/reconnect scenario                  | 1h   |
| 16 | Responsive video layout (desktop + mobile)           | 30m  |
| 17 | Test end-to-end: 2 browser tabs video call           | 1h   |

### Deliverables
- ✅ Video call berfungsi antara 2 user
- ✅ Toggle mic/camera
- ✅ Timer berjalan
- ✅ Connection status visible
- ✅ Clean end session flow

---

## Phase 6: Post-Session & Feedback (Hari 14-15)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat migration feedbacks table                       | 15m  |
| 2  | Buat Model Feedback + Enum FeedbackType              | 15m  |
| 3  | Buat FeedbackController + FeedbackRequest            | 30m  |
| 4  | Buat halaman Rooms/Complete.tsx (post-session page)   | 1.5h |
| 5  | Buat FeedbackModal.tsx (3 pilihan)                   | 1h   |
| 6  | Buat RewardAnimation.tsx (EXP gain visual)           | 1.5h |
| 7  | Implement GamificationService.addExp                 | 30m  |
| 8  | Event: SessionEnded → AwardSessionExp               | 30m  |
| 9  | Event: FeedbackGiven → AwardFeedbackExp              | 30m  |
| 10 | Log semua aktivitas ke activity_logs                  | 30m  |
| 11 | Test: sesi selesai → feedback → EXP bertambah        | 30m  |

### Deliverables
- ✅ Halaman post-session dengan EXP reward
- ✅ Feedback system berfungsi
- ✅ EXP diberikan ke kedua user
- ✅ Bonus EXP dari feedback positif
- ✅ Activity log tercatat

---

## Phase 7: Gamifikasi Polish (Hari 16-19)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat migration badges + user_badges tables           | 15m  |
| 2  | Buat Model Badge, UserBadge                          | 15m  |
| 3  | Buat BadgeSeeder (semua badges dari PRD)             | 30m  |
| 4  | Buat BadgeService (check & unlock badges)            | 1h   |
| 5  | Integrate badge check setelah setiap session/streak  | 30m  |
| 6  | Buat LevelUpModal.tsx (confetti + animasi)           | 2h   |
| 7  | Buat BadgeUnlockModal.tsx (badge fly-in animation)   | 1.5h |
| 8  | Buat ExpGainToast.tsx ("+30 EXP" notification)       | 45m  |
| 9  | Animated EXP bar polish (spring physics, glow near level up) | 1h |
| 10 | Streak counter fire animation                        | 30m  |
| 11 | Level badge gradient per level                       | 30m  |
| 12 | Achievement grid di dashboard (locked grayscale)     | 45m  |
| 13 | Test: level up flow end-to-end                       | 30m  |

### Deliverables
- ✅ Level up animation (confetti)
- ✅ Badge unlock animation
- ✅ EXP gain toast
- ✅ Semua badges seeded & checkable
- ✅ Full gamification loop berfungsi

---

## Phase 8: Leaderboard + Profile (Hari 20-21)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat LeaderboardService (4 kategori queries)         | 45m  |
| 2  | Buat LeaderboardController                           | 20m  |
| 3  | Buat halaman Leaderboard/Index.tsx                   | 2h   |
| 4  | Buat LeaderboardTabs.tsx (4 tabs)                    | 30m  |
| 5  | Buat LeaderboardTable.tsx (Top 10 + posisi user)     | 1h   |
| 6  | Buat RankCard.tsx (gold/silver/bronze styling)       | 30m  |
| 7  | Buat ProfileController                               | 20m  |
| 8  | Buat halaman Profile/Edit.tsx                        | 1h   |
| 9  | Animated leaderboard entries (staggered)             | 30m  |

### Deliverables
- ✅ Leaderboard 4 kategori berfungsi
- ✅ Top 10 + posisi user sendiri
- ✅ Profile editing
- ✅ Smooth animations

---

## Phase 9: Polish & Responsive (Hari 22-24)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Review & polish semua halaman (spacing, warna, konsistensi) | 3h |
| 2  | Tambah page transitions (Framer Motion)              | 1h   |
| 3  | Tambah loading skeletons di semua halaman            | 1.5h |
| 4  | Polish empty states (ilustrasi/emoji + CTA)          | 1h   |
| 5  | Mobile responsive: dashboard                         | 1h   |
| 6  | Mobile responsive: room list                         | 45m  |
| 7  | Mobile responsive: video call                        | 1h   |
| 8  | Mobile responsive: leaderboard                       | 30m  |
| 9  | Test semua flow di Chrome, Firefox, Edge             | 1h   |
| 10 | Fix bugs & edge cases                                | 2h   |

### Deliverables
- ✅ Semua halaman polished & consistent
- ✅ Page transitions smooth
- ✅ Loading states di semua halaman
- ✅ Responsive di semua breakpoint
- ✅ Cross-browser tested

---

## Phase 10: Demo Data & Deploy (Hari 25-27)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Buat DemoUserSeeder (users dengan berbagai level/EXP) | 1h |
| 2  | Seed rooms, sessions, feedbacks, badges untuk demo   | 1h   |
| 3  | Buat Dockerfile (PHP 8.3 + Nginx + Node)             | 1.5h |
| 4  | Setup Google Cloud project                           | 30m  |
| 5  | Setup Cloud SQL (MySQL)                              | 30m  |
| 6  | Deploy ke Cloud Run                                  | 1.5h |
| 7  | Setup domain / URL                                   | 30m  |
| 8  | Test WebSocket (Reverb) di production                | 1h   |
| 9  | Test WebRTC di production                            | 1h   |
| 10 | Fix production-specific bugs                         | 2h   |
| 11 | Run seeder di production untuk demo data             | 15m  |

### Deliverables
- ✅ App live di Google Cloud
- ✅ Database seeded dengan demo data
- ✅ WebSocket & WebRTC berfungsi di production
- ✅ URL siap untuk demo

---

## Phase 11: Video Demo (Hari 28-30)

### Tasks

| #  | Task                                                | Est  |
| -- | --------------------------------------------------- | ---- |
| 1  | Tulis script demo video                              | 1h   |
| 2  | Siapkan 2 akun demo (pembelajar + pengajar)          | 15m  |
| 3  | Record demo: Landing → Register → Onboarding        | 30m  |
| 4  | Record demo: Dashboard overview                      | 15m  |
| 5  | Record demo: Buat room → Join room → Video call      | 30m  |
| 6  | Record demo: End session → Feedback → EXP reward     | 20m  |
| 7  | Record demo: Level up + Badge unlock                 | 15m  |
| 8  | Record demo: Leaderboard                             | 10m  |
| 9  | Edit video                                           | 2h   |
| 10 | Final review & submit                                | 30m  |

### Deliverables
- ✅ Video demo selesai
- ✅ Semua fitur ter-showcase
- ✅ Ready untuk submit

---

## Risk Mitigation

| Risk                                          | Mitigation                                        |
| --------------------------------------------- | ------------------------------------------------- |
| WebRTC tidak bekerja di production            | Siapkan TURN server, test early (Phase 5)         |
| Laravel Reverb tidak stabil di Cloud Run       | Fallback: gunakan Pusher free tier atau Compute Engine |
| Timeline terlalu ketat                         | Prioritaskan Phase 1-6 (core). Phase 7-8 bisa simplified |
| Video call lag/quality buruk                   | Limit ke 720p, auto-fallback ke voice             |
| MySQL connection issues di Cloud               | Gunakan Cloud SQL proxy                           |

---

## Priority Matrix (Jika Kepepet Waktu)

| Prioritas | Fitur                              | Bisa Di-Cut? |
| --------- | ---------------------------------- | ------------ |
| P0        | Auth + Onboarding                  | ❌ WAJIB     |
| P0        | Dashboard                          | ❌ WAJIB     |
| P0        | Room CRUD + Browse                 | ❌ WAJIB     |
| P0        | Video Call                         | ❌ WAJIB     |
| P0        | Post-Session + Feedback            | ❌ WAJIB     |
| P0        | EXP + Level Up (basic)             | ❌ WAJIB     |
| P1        | Level Up Animation (confetti)      | ✅ Bisa simplified |
| P1        | Badge System                       | ✅ Bisa simplified |
| P1        | Leaderboard                        | ✅ Bisa simplified |
| P2        | Streak System                      | ✅ Bisa di-cut |
| P2        | Activity History                   | ✅ Bisa di-cut |
| P2        | Landing Page polish                | ✅ Bisa simplified |
| P2        | Mobile responsive                  | ✅ Fokus desktop dulu |
