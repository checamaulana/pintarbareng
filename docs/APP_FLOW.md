# 🔄 APP_FLOW — PintarBareng

> **Application Flow Document**
> Versi: 1.0 | Tanggal: 8 Mei 2026

---

## 1. Flow Overview (High-Level)

```
Landing Page → Register → Pilih Role → Onboarding → Dashboard
                                                        │
                                    ┌───────────────────┼───────────────────┐
                                    ▼                   ▼                   ▼
                              Buat Room           Jelajah Room         Leaderboard
                                    │                   │
                                    ▼                   ▼
                              Tunggu Join          Join Room
                                    │                   │
                                    └───────┬───────────┘
                                            ▼
                                     Video Call Room
                                            │
                                            ▼
                                     Akhiri Sesi
                                            │
                                    ┌───────┴───────┐
                                    ▼               ▼
                              Feedback          EXP Reward
                              (Pembelajar)      (Kedua User)
                                    │               │
                                    └───────┬───────┘
                                            ▼
                                      Dashboard
                                   (Level Up? Badge?)
```

---

## 2. Detailed Flows

### 2.1 Landing Page

**Route:** `/`

**Deskripsi:** Halaman publik yang menjelaskan apa itu PintarBareng.

**Konten:**
- Hero section dengan tagline & CTA
- Penjelasan singkat fitur utama (3-4 cards)
- Bagaimana cara kerjanya (step-by-step visual)
- CTA ke Register

**Aksi User:**
- Klik "Mulai Belajar" → Redirect ke `/register`
- Klik "Masuk" → Redirect ke `/login`

**State:** Unauthenticated only. Jika sudah login, redirect ke `/dashboard`.

---

### 2.2 Register Flow

**Route:** `/register`

```
┌─────────────────────────────────────┐
│          HALAMAN REGISTER           │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  Email: [________________]  │    │
│  │  Password: [______________] │    │
│  │  Konfirmasi: [____________] │    │
│  └─────────────────────────────┘    │
│                                     │
│        [ Daftar Sekarang ]          │
│                                     │
│  Sudah punya akun? Masuk            │
└─────────────────────────────────────┘
          │
          ▼ (Setelah submit berhasil)
┌─────────────────────────────────────┐
│        PILIH ROLE (PERMANEN)        │
│                                     │
│  ┌──────────┐    ┌──────────┐       │
│  │    📚    │    │    🎓    │       │
│  │Pembelajar│    │ Pengajar │       │
│  │          │    │          │       │
│  │ Saya     │    │ Saya     │       │
│  │ ingin    │    │ ingin    │       │
│  │ belajar  │    │ mengajar │       │
│  └──────────┘    └──────────┘       │
│                                     │
│  ⚠️ Pilihan ini tidak bisa diubah   │
│                                     │
│        [ Konfirmasi Pilihan ]       │
└─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│         ONBOARDING PROFILE          │
│                                     │
│  Avatar: [Default Generated]        │
│  Nama Lengkap: [_______________]    │
│  Username: [_______________]        │
│  Bio: [________________________]    │
│       [________________________]    │
│  Skill Tags: [_____] [_____] (opt)  │
│                                     │
│        [ Mulai Petualangan! ]       │
└─────────────────────────────────────┘
          │
          ▼
        Dashboard (dengan welcome animation)
```

**Validasi:**
- Email: unique, format valid
- Password: min 8 karakter
- Konfirmasi password harus cocok
- Username: unique, alphanumeric + underscore, 3-20 karakter
- Nama lengkap: required, 2-50 karakter
- Bio: required, max 200 karakter
- Skill tags: opsional, max 5 tags

**Setelah onboarding selesai:**
- User di-redirect ke Dashboard
- EXP dimulai dari 0
- Level dimulai dari Level 1
- Streak dimulai dari 0

---

### 2.3 Login Flow

**Route:** `/login`

```
┌─────────────────────────────────────┐
│           HALAMAN LOGIN             │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  Email: [________________]  │    │
│  │  Password: [______________] │    │
│  └─────────────────────────────┘    │
│                                     │
│        [ Masuk ]                    │
│                                     │
│  Belum punya akun? Daftar           │
└─────────────────────────────────────┘
          │
          ▼ (Login berhasil)
        Dashboard
          │
          ▼ (Cek streak)
        Update daily streak jika belum login hari ini
```

**Saat login berhasil:**
1. Cek apakah user sudah login hari ini
2. Jika belum → increment streak counter, tambah 10 EXP streak bonus
3. Jika sudah → tidak ada perubahan streak
4. Redirect ke Dashboard

---

### 2.4 Dashboard

**Route:** `/dashboard`

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Dashboard | Jelajah Room | Leaderboard | Logout │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────────┐  │
│  │    PROFILE CARD      │  │     QUICK STATS          │  │
│  │                      │  │                          │  │
│  │  [Avatar]            │  │  📚 Total Sesi: 24       │  │
│  │  Nama Lengkap        │  │  🔥 Streak: 7 hari      │  │
│  │  @username           │  │  ⭐ Level: Pencari Ilmu  │  │
│  │  Role Badge          │  │                          │  │
│  │  Bio                 │  │                          │  │
│  └──────────────────────┘  └──────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │              EXP BAR (ANIMATED)                    │   │
│  │  Level 2 ████████████░░░░░░░░░░ Level 3            │   │
│  │           150 / 300 EXP                            │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────────┐  │
│  │   BADGES EARNED      │  │   ROOM AKTIF             │  │
│  │                      │  │                          │  │
│  │  🏅 Langkah Pertama  │  │  📗 "Belajar React..."  │  │
│  │  🏅 Semangat Membara │  │     Status: Menunggu     │  │
│  │  🔒 ???              │  │     [Masuk Room]         │  │
│  │  🔒 ???              │  │                          │  │
│  └──────────────────────┘  └──────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │            RIWAYAT AKTIVITAS                       │   │
│  │                                                    │   │
│  │  📅 Hari ini                                       │   │
│  │  • Sesi belajar "React Hooks" selesai (+30 EXP)    │   │
│  │  • Daily streak! (+10 EXP)                         │   │
│  │                                                    │   │
│  │  📅 Kemarin                                        │   │
│  │  • Badge "Langkah Pertama" unlocked! 🎉            │   │
│  │  • Sesi belajar "CSS Grid" selesai (+30 EXP)       │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│        [ + Buat Room Baru ]                              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Data yang berbeda per role:**
- **Pembelajar:** "Total Sesi Belajar", riwayat belajar
- **Pengajar:** "Total Sesi Mengajar", riwayat mengajar

---

### 2.5 Buat Room

**Route:** `/rooms/create`

**Akses:** Kedua role (Pembelajar & Pengajar)

```
┌─────────────────────────────────────┐
│          BUAT ROOM BARU             │
│                                     │
│  Judul: [_________________________] │
│                                     │
│  Deskripsi:                         │
│  [________________________________] │
│  [________________________________] │
│                                     │
│  Kategori: [▼ Pilih Kategori     ]  │
│    - Pemrograman                    │
│    - Matematika                     │
│    - Bahasa Inggris                 │
│    - Desain                         │
│    - Sains                          │
│                                     │
│  Tags: [react] [hooks] [+ tambah]   │
│                                     │
│        [ Buat Room ]                │
└─────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────┐
│        ROOM WAITING STATE           │
│                                     │
│  "Belajar React State Management"   │
│  Status: ⏳ Menunggu partner...     │
│                                     │
│  [Animasi waiting / pulse]          │
│                                     │
│  [ Batalkan Room ]                  │
└─────────────────────────────────────┘
```

**Validasi:**
- Judul: required, 5-100 karakter
- Deskripsi: required, 10-500 karakter
- Kategori: required, harus dari list
- Tags: opsional, max 5 tags, tiap tag max 20 karakter

---

### 2.6 Jelajah Room

**Route:** `/rooms`

**Akses:** Kedua role

```
┌──────────────────────────────────────────────────────────┐
│                    JELAJAH ROOM                          │
│                                                          │
│  Filter: [Semua ▼] [Tag: ______]  [🔍 Cari...]          │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │  📗 "Butuh bantuan React state management"        │   │
│  │  📌 Pemrograman | 🏷️ react, hooks                 │   │
│  │  👤 @johndoe (Pembelajar)                         │   │
│  │  ⏳ Menunggu partner                               │   │
│  │                              [ Join Room ]         │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │  📗 "Belajar integral dasar"                      │   │
│  │  📌 Matematika | 🏷️ kalkulus                      │   │
│  │  👤 @janedoe (Pembelajar)                         │   │
│  │  ⏳ Menunggu partner                               │   │
│  │                              [ Join Room ]         │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐   │
│  │  📗 "Siap mengajar Python dasar"                  │   │
│  │  📌 Pemrograman | 🏷️ python, beginner             │   │
│  │  👤 @alice (Pengajar)                             │   │
│  │  ⏳ Menunggu partner                               │   │
│  │                              [ Join Room ]         │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│  [Empty state jika tidak ada room]                       │
│  "Belum ada room tersedia. Buat room pertamamu! 🚀"      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Filter:**
- Kategori: dropdown (Semua, Pemrograman, Matematika, Bahasa Inggris, Desain, Sains)
- Tag: text input search
- Hanya room dengan status "Menunggu" yang ditampilkan

**Join Logic:**
- User klik "Join Room"
- Server cek apakah room masih tersedia (belum ada partner)
- Jika tersedia → User masuk ke room, status berubah ke "Berlangsung"
- Jika sudah penuh → Tampilkan error "Room sudah penuh"
- User tidak bisa join room miliknya sendiri

---

### 2.7 Video Call Room

**Route:** `/rooms/{id}/session`

**Akses:** Hanya 2 user yang ada di room tersebut

```
┌──────────────────────────────────────────────────────────┐
│  "Belajar React State Management"                        │
│  ⏱️ 00:15:32  |  🟢 Terkoneksi                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────┐  ┌────────────────────────┐  │
│  │                        │  │                        │  │
│  │                        │  │                        │  │
│  │    VIDEO PARTNER       │  │    VIDEO SELF (small)  │  │
│  │    (Large View)        │  │    (Picture-in-Picture) │  │
│  │                        │  │                        │  │
│  │                        │  │                        │  │
│  └────────────────────────┘  └────────────────────────┘  │
│                                                          │
│              ┌─────────────────────┐                     │
│              │  🎤  📷  🔴 Akhiri  │                     │
│              └─────────────────────┘                     │
│               Mic  Cam  End Session                      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Kontrol:**
- 🎤 Toggle Microphone (on/off) — Default: ON
- 📷 Toggle Camera (on/off) — Default: ON
- 🔴 Akhiri Sesi — Konfirmasi dialog sebelum end

**WebRTC Flow:**
1. User A (pembuat room) sudah di room → setup peer connection sebagai "offerer"
2. User B (yang join) masuk → setup peer connection sebagai "answerer"
3. Signaling melalui Laravel WebSocket (Pusher/Reverb)
4. ICE candidates exchanged via signaling
5. Peer connection established
6. Video/audio streaming dimulai
7. TURN server digunakan sebagai fallback

**Timer:**
- Timer mulai saat kedua user connected
- Timer berjalan terus sampai sesi diakhiri
- Format: HH:MM:SS

**Mengakhiri Sesi:**
1. Salah satu user klik "Akhiri Sesi"
2. Muncul dialog konfirmasi: "Yakin ingin mengakhiri sesi?"
3. Jika ya → WebRTC connection ditutup
4. Room status berubah ke "Selesai"
5. Durasi sesi dicatat
6. Redirect ke halaman feedback/reward

---

### 2.8 Post-Session Flow

**Route:** `/rooms/{id}/complete`

#### 2.8.1 Jika User adalah Pembelajar

```
┌──────────────────────────────────────────────────────────┐
│                  SESI SELESAI! 🎉                        │
│                                                          │
│  Durasi: 15 menit 32 detik                               │
│  Topik: "Belajar React State Management"                 │
│  Partner: @alice (Pengajar)                              │
│                                                          │
│  ────────────────────────────────────────                 │
│                                                          │
│  + 30 EXP (sesi belajar)                                 │
│  [Animated EXP bar filling up]                           │
│                                                          │
│  ────────────────────────────────────────                 │
│                                                          │
│  Bagaimana sesi belajarmu?                               │
│                                                          │
│  ┌──────────┐ ┌────────────────┐ ┌────────────────┐      │
│  │   😊     │ │      🌟       │ │      😐       │      │
│  │  Puas    │ │ Sangat         │ │ Kurang         │      │
│  │          │ │ Membantu       │ │ Membantu       │      │
│  └──────────┘ └────────────────┘ └────────────────┘      │
│                                                          │
│  + 5 EXP (memberikan feedback)                           │
│                                                          │
│        [ Kembali ke Dashboard ]                          │
└──────────────────────────────────────────────────────────┘
```

**Setelah feedback diberikan:**
- Pembelajar dapat +5 EXP (feedback bonus)
- Jika "Puas" → Pengajar dapat +20 EXP bonus
- Jika "Sangat Membantu" → Pengajar dapat +30 EXP bonus
- Jika "Kurang Membantu" → Pengajar tidak dapat bonus

#### 2.8.2 Jika User adalah Pengajar

```
┌──────────────────────────────────────────────────────────┐
│                  SESI SELESAI! 🎉                        │
│                                                          │
│  Durasi: 15 menit 32 detik                               │
│  Topik: "Belajar React State Management"                 │
│  Partner: @johndoe (Pembelajar)                          │
│                                                          │
│  ────────────────────────────────────────                 │
│                                                          │
│  + 50 EXP (sesi mengajar)                                │
│  [Animated EXP bar filling up]                           │
│                                                          │
│  Menunggu feedback dari @johndoe...                      │
│  (Jika mendapat feedback positif, kamu akan              │
│   mendapat bonus EXP!)                                   │
│                                                          │
│        [ Kembali ke Dashboard ]                          │
└──────────────────────────────────────────────────────────┘
```

**Jika pengajar mendapat bonus EXP (dari feedback):**
- Notifikasi visual muncul di dashboard
- Animasi reward EXP

---

### 2.9 Level Up Flow

```
Kapan saja EXP bertambah → Cek apakah EXP cukup untuk level up

Jika LEVEL UP:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│              🎊 LEVEL UP! 🎊                             │
│                                                          │
│          [Animasi Celebratory / Confetti]                 │
│                                                          │
│              Level 1 → Level 2                           │
│         "Anak Baru" → "Pencari Ilmu"                     │
│                                                          │
│              [Animasi badge baru]                         │
│                                                          │
│             [ Lanjutkan ]                                │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Level up terjadi secara instant setelah EXP cukup.**

---

### 2.10 Badge Unlock Flow

```
Kapan saja kondisi badge terpenuhi:

┌──────────────────────────────────────────────────────────┐
│                                                          │
│          🏅 BADGE BARU UNLOCKED!                         │
│                                                          │
│          [Animasi badge muncul]                          │
│                                                          │
│          "Langkah Pertama"                               │
│          Menyelesaikan sesi pertama                       │
│                                                          │
│             [ Keren! ]                                   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### 2.11 Leaderboard

**Route:** `/leaderboard`

```
┌──────────────────────────────────────────────────────────┐
│                    🏆 LEADERBOARD                        │
│                                                          │
│  [EXP Tertinggi] [Pengajar Terbaik] [Pelajar Aktif] [Streak] │
│                                                          │
│  ── EXP TERTINGGI ──────────────────────────────────     │
│                                                          │
│  🥇 1. @alice      ████████████████  1,250 EXP          │
│  🥈 2. @bob        ██████████████    1,100 EXP          │
│  🥉 3. @charlie    ████████████      980 EXP            │
│     4. @diana      ██████████        850 EXP            │
│     5. @eve        ████████          720 EXP            │
│     6. @frank      ██████            600 EXP            │
│     7. @grace      █████             510 EXP            │
│     8. @hank       ████              420 EXP            │
│     9. @ivy        ███               330 EXP            │
│    10. @jack       ██                250 EXP            │
│                                                          │
│  ── Posisi Kamu ─────────────────────────────────────    │
│     15. @kamu      █                 150 EXP            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Tabs:**
1. **EXP Tertinggi** — Semua user, ranked by total EXP
2. **Pengajar Terbaik** — Hanya pengajar, ranked by total sesi mengajar
3. **Pelajar Paling Aktif** — Hanya pembelajar, ranked by total sesi belajar
4. **Streak Terpanjang** — Semua user, ranked by current streak

**Fitur tambahan:**
- Posisi user saat ini selalu ditampilkan di bawah Top 10
- Highlight jika user masuk Top 10

---

## 3. Navigation Structure

### 3.1 Navbar (Authenticated)

```
Logo | Dashboard | Jelajah Room | Leaderboard | [Avatar ▼]
                                                  │
                                                  ├── Profile
                                                  └── Logout
```

### 3.2 Route Map

| Route                    | Halaman               | Auth Required | Role       |
| ------------------------ | --------------------- | ------------- | ---------- |
| `/`                      | Landing Page          | ❌            | —          |
| `/login`                 | Login                 | ❌            | —          |
| `/register`              | Register              | ❌            | —          |
| `/onboarding`            | Onboarding            | ✅            | Semua      |
| `/dashboard`             | Dashboard             | ✅            | Semua      |
| `/rooms`                 | Jelajah Room          | ✅            | Semua      |
| `/rooms/create`          | Buat Room             | ✅            | Semua      |
| `/rooms/{id}`            | Detail Room (Waiting) | ✅            | Owner      |
| `/rooms/{id}/session`    | Video Call Session    | ✅            | Participants|
| `/rooms/{id}/complete`   | Post-Session          | ✅            | Participants|
| `/leaderboard`           | Leaderboard           | ✅            | Semua      |
| `/profile`               | Edit Profile          | ✅            | Semua      |

---

## 4. Error States & Edge Cases

### 4.1 Empty States

| Halaman        | Empty State Message                                        |
| -------------- | ---------------------------------------------------------- |
| Jelajah Room   | "Belum ada room tersedia. Buat room pertamamu! 🚀"         |
| Room Aktif     | "Kamu belum punya room aktif. Buat atau join room! 📚"     |
| Riwayat        | "Belum ada aktivitas. Mulai sesi pertamamu! 🎯"            |
| Badges         | "Belum ada badge. Selesaikan sesi pertamamu untuk unlock! 🏅"|
| Leaderboard    | "Belum ada data. Jadi yang pertama di leaderboard! 🏆"     |

### 4.2 Error States

| Situasi                          | Handling                                          |
| -------------------------------- | ------------------------------------------------- |
| Room sudah penuh saat join       | Toast error: "Room sudah penuh"                   |
| WebRTC connection gagal          | Tampilkan status "Mencoba menghubungkan..." + retry|
| Partner disconnect saat sesi     | Tampilkan dialog: "Partner terputus. Akhiri sesi?"|
| User refresh saat video call     | Reconnect otomatis via WebRTC renegotiation       |
| User membuat room saat sudah punya room aktif | Tolak: "Kamu sudah punya room aktif" |

### 4.3 Loading States

- Semua halaman menggunakan **loading skeleton** saat fetch data
- Tombol menggunakan **loading spinner** saat submit
- Transisi halaman menggunakan **smooth page transition**
