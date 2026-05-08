# 📄 PRD — PintarBareng

> **Product Requirements Document**
> Versi: 1.0 | Tanggal: 8 Mei 2026 | Author: Solo Developer

---

## 1. Ringkasan Proyek

**PintarBareng** adalah platform web peer-to-peer learning yang mempertemukan orang yang ingin belajar dengan orang yang ingin mengajar secara real-time melalui video call. Platform ini menggunakan gamifikasi untuk membuat proses belajar-mengajar terasa seru, rewarding, dan membuat ketagihan.

### Konteks Lomba

| Item               | Detail                                              |
| ------------------- | --------------------------------------------------- |
| **Nama Lomba**      | JuaraVibecoding                                     |
| **Penyelenggara**   | Google                                              |
| **Timeline**        | 1 bulan                                             |
| **Tim**             | Solo developer                                      |
| **Deliverable**     | Video penggunaan aplikasi                           |
| **Deploy**          | Google Cloud                                        |

### Kriteria Penilaian Lomba

| Kriteria              | Bobot | Strategi PintarBareng                                                    |
| ---------------------- | ----- | ------------------------------------------------------------------------ |
| **Masalah / Problem**  | 30%   | Menyelesaikan gap akses belajar peer-to-peer yang terjangkau & real-time |
| **Solusi / UX**        | 40%   | UI delightful, gamified, intuitif — ini prioritas tertinggi              |
| **Keunikan**           | 30%   | Gamifikasi ala RPG + P2P learning = kombinasi unik                       |

---

## 2. Problem Statement

### Masalah yang Diselesaikan

1. **Akses tutoring mahal** — Les privat tidak terjangkau semua orang.
2. **Belajar sendiri itu kesepian** — Banyak orang stuck saat belajar mandiri dan butuh bantuan real-time.
3. **Orang yang ingin berbagi ilmu tidak punya platform** — Banyak orang ahli di bidangnya tapi tidak punya wadah untuk mengajar secara informal.
4. **Motivasi belajar rendah** — Tanpa feedback dan reward, motivasi belajar cepat turun.

### Solusi

PintarBareng menyediakan platform dimana siapa saja bisa:
- **Membuat room belajar** dan mendapatkan bantuan real-time via video call
- **Mengajar orang lain** dan mendapatkan pengakuan melalui EXP & level
- **Merasa termotivasi** melalui sistem gamifikasi yang membuat belajar terasa seperti bermain game

---

## 3. Target Audiens

| Segmen                  | Deskripsi                                                          |
| ----------------------- | ------------------------------------------------------------------ |
| **Pelajar / Mahasiswa** | Butuh bantuan belajar mata pelajaran atau skill tertentu           |
| **Self-learner**        | Orang yang belajar mandiri (coding, bahasa, dll) dan sering stuck  |
| **Ahli / Profesional**  | Orang yang ingin berbagi ilmu dan mendapat pengakuan               |

---

## 4. User Roles

### 4.1 Pembelajar

- Role dipilih saat **registrasi** dan bersifat **permanen**
- Bisa membuat room belajar
- Bisa melihat & join room yang dibuat orang lain
- Mendapatkan EXP dari menyelesaikan sesi belajar
- Memberikan feedback ke pengajar setelah sesi

### 4.2 Pengajar

- Role dipilih saat **registrasi** dan bersifat **permanen**
- Bisa membuat room mengajar
- Bisa melihat & join room yang dibuat orang lain
- Mendapatkan EXP dari menyelesaikan sesi mengajar
- Mendapatkan bonus EXP dari feedback positif

### Aturan Role

- **Satu akun = satu role** (tidak bisa switch atau dual-role)
- Pilihan role bersifat **final** setelah registrasi
- Dashboard sama secara layout, data yang ditampilkan berbeda per role

---

## 5. Functional Requirements

### 5.1 Authentication

| ID     | Requirement                                          | Prioritas |
| ------ | ---------------------------------------------------- | --------- |
| AUTH-1 | User dapat register dengan email + password          | WAJIB     |
| AUTH-2 | User memilih role (Pembelajar/Pengajar) saat register| WAJIB     |
| AUTH-3 | User dapat login dengan email + password             | WAJIB     |
| AUTH-4 | User dapat logout                                    | WAJIB     |
| AUTH-5 | Tidak ada email verification                         | —         |
| AUTH-6 | Tidak ada forgot password                            | —         |

### 5.2 Onboarding (Setelah Register)

| ID    | Requirement                                     | Prioritas |
| ----- | ----------------------------------------------- | --------- |
| OB-1  | User mengisi nama lengkap                       | WAJIB     |
| OB-2  | User mengisi username                           | WAJIB     |
| OB-3  | User mendapat default avatar (auto-generated)   | WAJIB     |
| OB-4  | User mengisi bio/deskripsi diri                 | WAJIB     |
| OB-5  | User mengisi skill tags (opsional)              | OPSIONAL  |

### 5.3 Dashboard

| ID     | Requirement                                     | Prioritas |
| ------ | ----------------------------------------------- | --------- |
| DSH-1  | Menampilkan profile card (avatar, nama, level)  | WAJIB     |
| DSH-2  | Menampilkan EXP bar dengan animasi              | WAJIB     |
| DSH-3  | Menampilkan total sesi (belajar ATAU mengajar)  | WAJIB     |
| DSH-4  | Menampilkan badges/achievements yang dimiliki   | WAJIB     |
| DSH-5  | Menampilkan riwayat aktivitas                   | WAJIB     |
| DSH-6  | Menampilkan room aktif milik user               | WAJIB     |
| DSH-7  | Menampilkan daily streak counter                | WAJIB     |

### 5.4 Room Belajar

| ID     | Requirement                                             | Prioritas |
| ------ | ------------------------------------------------------- | --------- |
| RM-1   | User (kedua role) dapat membuat room                    | WAJIB     |
| RM-2   | Room memiliki field: judul, deskripsi, kategori, tags   | WAJIB     |
| RM-3   | Kategori bersifat fixed list (predefined)               | WAJIB     |
| RM-4   | Room bersifat 1-on-1 (max 2 orang)                     | WAJIB     |
| RM-5   | User lain yang join saat room penuh akan ditolak         | WAJIB     |
| RM-6   | Room memiliki status: Menunggu, Berlangsung, Selesai, Dibatalkan | WAJIB |
| RM-7   | Kedua user bisa memulai dan mengakhiri sesi             | WAJIB     |
| RM-8   | Room bersifat instant (buat sekarang, tunggu join)      | WAJIB     |
| RM-9   | Daftar room bisa difilter berdasarkan kategori          | WAJIB     |
| RM-10  | Daftar room bisa difilter berdasarkan tag skill         | WAJIB     |

### Kategori Room (Fixed List)

1. Pemrograman
2. Matematika
3. Bahasa Inggris
4. Desain
5. Sains

### 5.5 Video Call

| ID     | Requirement                                       | Prioritas |
| ------ | ------------------------------------------------- | --------- |
| VC-1   | Video call real-time menggunakan WebRTC P2P       | WAJIB     |
| VC-2   | Kualitas video target: 720p                       | WAJIB     |
| VC-3   | Toggle mic on/off                                 | WAJIB     |
| VC-4   | Toggle camera on/off                              | WAJIB     |
| VC-5   | Timer sesi berjalan                               | WAJIB     |
| VC-6   | Status koneksi ditampilkan                        | WAJIB     |
| VC-7   | TURN server sebagai fallback untuk NAT/firewall   | WAJIB     |
| VC-8   | Tidak ada screen sharing                          | —         |
| VC-9   | Tidak ada whiteboard                              | —         |
| VC-10  | Tidak ada recording                               | —         |
| VC-11  | Tidak ada in-room chat                            | —         |

### 5.6 Gamifikasi — EXP & Level

| ID     | Requirement                                           | Prioritas |
| ------ | ----------------------------------------------------- | --------- |
| GM-1   | EXP didapat dengan fixed amount per sesi selesai      | WAJIB     |
| GM-2   | Level progression bersifat exponential                | WAJIB     |
| GM-3   | Pengajar langsung naik level setelah sesi pertama     | WAJIB     |
| GM-4   | Daily streak dihitung dari login harian               | WAJIB     |
| GM-5   | Streak memberikan bonus EXP                           | WAJIB     |
| GM-6   | Animated EXP bar                                      | WAJIB     |
| GM-7   | Level up animation                                    | WAJIB     |
| GM-8   | Achievement/badge unlock                              | WAJIB     |

### Level Pembelajar

| Level | Nama            | EXP Required |
| ----- | --------------- | ------------ |
| 1     | Anak Baru       | 0            |
| 2     | Pencari Ilmu    | 100          |
| 3     | Tukang Grinding | 300          |
| 4     | Haus Ilmu       | 700          |
| 5     | Hacker          | 1500         |

### Level Pengajar

| Level | Nama            | EXP Required |
| ----- | --------------- | ------------ |
| 1     | NPC Baik Hati   | 0            |
| 2     | Calon Kage      | 50           |
| 3     | Kage            | 250          |
| 4     | Sepuh           | 600          |
| 5     | Anomali         | 1300         |

> **Catatan:** Level 2 pengajar sengaja dibuat rendah (50 EXP) agar pengajar langsung naik level setelah sesi pertama. EXP per sesi mengajar = 50.

### EXP Values

| Aksi                          | EXP Diberikan |
| ----------------------------- | ------------- |
| Menyelesaikan sesi belajar    | 30            |
| Menyelesaikan sesi mengajar   | 50            |
| Feedback "Puas" (bonus guru)  | 20            |
| Feedback "Sangat Membantu"    | 30            |
| Daily streak (per hari)       | 10            |
| Memberikan feedback           | 5             |

### Contoh Achievements/Badges

| Badge                  | Kondisi                               |
| ---------------------- | ------------------------------------- |
| Langkah Pertama        | Menyelesaikan sesi pertama            |
| Bintang 5              | Menyelesaikan 5 sesi                  |
| Guru Sejati            | Menyelesaikan 10 sesi mengajar        |
| Murid Rajin            | Menyelesaikan 10 sesi belajar         |
| Semangat Membara       | Streak 7 hari berturut-turut          |
| Tak Terbendung         | Streak 30 hari berturut-turut         |
| Bintang Kelas          | Menerima 10 feedback "Puas"           |
| Legenda                | Mencapai level 5                      |

### 5.7 Feedback

| ID     | Requirement                                                | Prioritas |
| ------ | ---------------------------------------------------------- | --------- |
| FB-1   | Feedback hanya dari pembelajar ke pengajar                 | WAJIB     |
| FB-2   | Feedback berupa single choice: Puas / Sangat Membantu / Kurang Membantu | WAJIB |
| FB-3   | Tidak ada text field feedback                              | —         |
| FB-4   | Feedback bersifat private (tidak tampil di profil)         | WAJIB     |
| FB-5   | Feedback "Puas" memberikan bonus EXP ke pengajar           | WAJIB     |
| FB-6   | Muncul animasi reward saat pengajar mendapat bonus EXP     | WAJIB     |

### 5.8 Leaderboard

| ID     | Requirement                                    | Prioritas |
| ------ | ---------------------------------------------- | --------- |
| LB-1   | Leaderboard bersifat global                    | WAJIB     |
| LB-2   | Menampilkan Top 10                             | WAJIB     |
| LB-3   | Kategori: EXP tertinggi                        | WAJIB     |
| LB-4   | Kategori: Pengajar terbaik (most sessions)     | WAJIB     |
| LB-5   | Kategori: Pelajar paling aktif (most sessions) | WAJIB     |
| LB-6   | Kategori: Streak terpanjang                    | WAJIB     |
| LB-7   | Tidak ada opt-out dari leaderboard             | —         |

---

## 6. Non-Functional Requirements

| Aspek            | Requirement                                               |
| ---------------- | --------------------------------------------------------- |
| **Performance**  | Halaman load < 2 detik, animasi 60fps                     |
| **Responsive**   | Desktop-first, responsive ke tablet & mobile              |
| **Browser**      | Chrome, Firefox, Edge (modern browsers)                   |
| **Platform**     | Web only, tidak ada mobile app                            |
| **Keamanan**     | Auth berbasis session (Laravel default), CSRF protection  |
| **Deploy**       | Google Cloud (Cloud Run atau Compute Engine)              |

---

## 7. Yang TIDAK Termasuk (Out of Scope)

- ❌ Email verification
- ❌ Forgot password
- ❌ OAuth login (Google/GitHub)
- ❌ Screen sharing
- ❌ Whiteboard
- ❌ Recording sesi
- ❌ In-room text chat
- ❌ Notifikasi (in-app, email, push)
- ❌ Admin dashboard
- ❌ Sistem moderasi
- ❌ Sistem report user
- ❌ Monetisasi / pembayaran
- ❌ Batas sesi per hari
- ❌ Batasan umur
- ❌ Room scheduling (jadwal)
- ❌ Group learning (lebih dari 2 orang)
- ❌ Dual-role per akun

---

## 8. Success Metrics (Untuk Demo Lomba)

| Metric                                | Target                                |
| ------------------------------------- | ------------------------------------- |
| Semua fitur core berfungsi end-to-end | ✅                                    |
| UX terasa intuitif dan delightful     | ✅                                    |
| Animasi gamifikasi smooth & engaging  | ✅                                    |
| Video call berfungsi real-time        | ✅                                    |
| Deploy live di Google Cloud           | ✅                                    |
| Video demo menunjukkan full flow      | ✅                                    |
