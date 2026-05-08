# 🛠️ TECH_STACK — PintarBareng

> **Technology Stack Document**
> Versi: 1.0 | Tanggal: 8 Mei 2026

---

## 1. Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                   │
│                                                         │
│  React 19 + Inertia.js + TailwindCSS + shadcn/ui        │
│  WebRTC (native browser API)                            │
│  Framer Motion (animasi)                                │
└─────────────────┬───────────────────────────────────────┘
                  │ Inertia Protocol (XHR, bukan REST API)
                  │
┌─────────────────▼───────────────────────────────────────┐
│                      SERVER                             │
│                                                         │
│  Laravel 12 (PHP 8.3+)                                  │
│  Inertia.js Server-Side Adapter                         │
│  Laravel Reverb (WebSocket for signaling)               │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                    DATABASE & SERVICES                   │
│                                                         │
│  MySQL 8.0                                              │
│  TURN Server (coturn / metered.ca)                      │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Stack

### 2.1 Frontend

| Teknologi        | Versi     | Tujuan                                              |
| ---------------- | --------- | --------------------------------------------------- |
| **React**        | 19.x      | UI library utama                                    |
| **Inertia.js**   | 2.x       | Client-side adapter — bridge antara Laravel & React  |
| **TailwindCSS**  | 4.x       | Utility-first CSS framework                         |
| **shadcn/ui**    | latest    | Pre-built accessible component library              |
| **Framer Motion**| 11.x     | Animasi & micro-interactions                        |
| **Lucide React** | latest    | Icon library (digunakan oleh shadcn/ui)             |
| **TypeScript**   | 5.x       | Type safety untuk React components                  |

#### Kenapa Stack Ini?

- **React + Inertia.js**: Tidak perlu build REST API terpisah. Inertia membuat Laravel seolah-olah SPA tanpa API layer. Ini menghemat waktu development yang sangat krusial untuk timeline 1 bulan.
- **TailwindCSS + shadcn/ui**: Rapid UI development dengan konsistensi desain. shadcn/ui components bisa di-customize sepenuhnya.
- **Framer Motion**: Library animasi paling powerful untuk React. Essential untuk gamifikasi (EXP bar, level up, badge unlock animations).
- **TypeScript**: Mengurangi bug dan meningkatkan developer experience.

### 2.2 Backend

| Teknologi             | Versi | Tujuan                                               |
| --------------------- | ----- | ---------------------------------------------------- |
| **Laravel**           | 12.x  | PHP framework utama                                  |
| **PHP**               | 8.3+  | Runtime backend                                      |
| **Inertia.js**        | 2.x   | Server-side adapter                                  |
| **Laravel Reverb**    | 1.x   | First-party WebSocket server (untuk WebRTC signaling)|
| **Laravel Echo**      | 1.x   | Client-side WebSocket library                        |

#### Kenapa Stack Ini?

- **Laravel 12**: Framework PHP paling mature, dengan ekosistem lengkap (auth, ORM, migration, seeding, etc).
- **Laravel Reverb**: WebSocket server bawaan Laravel, tidak perlu Pusher atau layanan pihak ketiga. Self-hosted. Gratis. Digunakan untuk WebRTC signaling.
- **Inertia.js Server-side**: Mengembalikan response sebagai Inertia pages, bukan JSON API. Controller tetap menulis logic seperti biasa.

### 2.3 Runtime & Tooling

| Tool          | Versi  | Tujuan                                         |
| ------------- | ------ | ---------------------------------------------- |
| **Bun**       | 1.x    | JavaScript runtime & package manager           |
| **Vite**      | 6.x    | Frontend build tool (bundled with Laravel)     |
| **Composer**  | 2.x    | PHP package manager                            |

#### Kenapa Bun?

- **Lebih cepat dari npm/yarn** untuk install dan build
- **Compatible dengan npm registry** — semua package npm bisa digunakan
- **Built-in bundler** — bisa digunakan sebagai alternative tapi kita pakai Vite (Laravel default)

### 2.4 Database

| Teknologi | Versi | Tujuan            |
| --------- | ----- | ----------------- |
| **MySQL** | 8.0+  | Primary database  |

#### Kenapa MySQL?

- Default dan paling supported oleh Laravel
- Familiar dan mudah di-deploy
- Cukup untuk skala aplikasi lomba

### 2.5 Real-time Communication

| Teknologi          | Tujuan                                              |
| ------------------ | --------------------------------------------------- |
| **WebRTC**         | Peer-to-peer video/audio call (native browser API)  |
| **Laravel Reverb** | Signaling server (SDP offer/answer, ICE candidates) |
| **Laravel Echo**   | Client-side WebSocket untuk signaling               |
| **TURN Server**    | NAT traversal fallback                              |

#### WebRTC Architecture

```
User A Browser                        User B Browser
     │                                      │
     │  1. Create Offer (SDP)                │
     │──────────► Laravel Reverb ──────────►│
     │            (WebSocket)               │
     │                                      │
     │  2. Create Answer (SDP)              │
     │◄────────── Laravel Reverb ◄──────────│
     │                                      │
     │  3. Exchange ICE Candidates          │
     │◄──────────► Laravel Reverb ◄────────►│
     │                                      │
     │  4. Peer Connection Established      │
     │◄════════════════════════════════════►│
     │      Direct P2P Video/Audio          │
     │                                      │
     │  (Fallback: via TURN server)         │
     │◄═══► TURN Server ◄═════════════════►│
```

#### TURN Server Options

| Opsi               | Biaya  | Kelebihan                    | Kekurangan            |
| ------------------ | ------ | ---------------------------- | --------------------- |
| **metered.ca**     | Free tier | Tidak perlu setup, gratis | Limit bandwidth       |
| **Coturn (self-hosted)** | Gratis | Full control         | Perlu setup di GCloud |
| **Google STUN**    | Gratis | Built-in, selalu tersedia    | Hanya STUN, bukan TURN|

**Rekomendasi:** Pakai **metered.ca** free tier untuk development & demo lomba + Google STUN servers sebagai primary. Ini cukup untuk demo.

### 2.6 Deployment

| Teknologi             | Tujuan                                    |
| --------------------- | ----------------------------------------- |
| **Google Cloud Run**  | Hosting aplikasi Laravel + React          |
| **Google Cloud SQL**  | Managed MySQL database                    |
| **Docker**            | Containerisasi aplikasi                   |

#### Deployment Architecture

```
┌────────────────────────────────────────────┐
│              Google Cloud                  │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │          Cloud Run                   │  │
│  │                                      │  │
│  │  ┌─────────────────────────┐         │  │
│  │  │  Laravel App Container  │         │  │
│  │  │  - PHP 8.3 + Nginx     │         │  │
│  │  │  - Inertia SSR         │         │  │
│  │  │  - Laravel Reverb      │         │  │
│  │  └───────────┬─────────────┘         │  │
│  └──────────────┼───────────────────────┘  │
│                 │                          │
│  ┌──────────────▼───────────────────────┐  │
│  │        Cloud SQL (MySQL)             │  │
│  └──────────────────────────────────────┘  │
│                                            │
└────────────────────────────────────────────┘
```

> **Catatan:** Laravel Reverb memerlukan persistent WebSocket connection. Cloud Run mendukung WebSocket, tetapi perlu konfigurasi timeout yang tepat. Alternatif: gunakan Compute Engine jika WebSocket bermasalah di Cloud Run.

---

## 3. Key Dependencies (Composer)

```json
{
  "require": {
    "php": "^8.3",
    "laravel/framework": "^12.0",
    "inertiajs/inertia-laravel": "^2.0",
    "laravel/reverb": "^1.0",
    "tightenco/ziggy": "^2.0"
  },
  "require-dev": {
    "laravel/pint": "^1.0",
    "pestphp/pest": "^3.0"
  }
}
```

## 4. Key Dependencies (Bun / package.json)

```json
{
  "dependencies": {
    "@inertiajs/react": "^2.0",
    "react": "^19.0",
    "react-dom": "^19.0",
    "framer-motion": "^11.0",
    "laravel-echo": "^1.0",
    "pusher-js": "^8.0",
    "lucide-react": "latest",
    "clsx": "^2.0",
    "tailwind-merge": "^2.0"
  },
  "devDependencies": {
    "@types/react": "^19.0",
    "@types/react-dom": "^19.0",
    "typescript": "^5.0",
    "@tailwindcss/vite": "^4.0",
    "tailwindcss": "^4.0",
    "vite": "^6.0",
    "@vitejs/plugin-react": "^4.0"
  }
}
```

## 5. Development Environment

| Tool             | Tujuan                                |
| ---------------- | ------------------------------------- |
| **Laragon/XAMPP** | Local PHP + MySQL (Windows)          |
| **Bun**          | Package manager + JS runtime          |
| **Vite dev server** | Frontend HMR                       |
| **php artisan serve** | Laravel dev server                |
| **Laravel Reverb** | Local WebSocket server              |

### Development Commands

```bash
# Install dependencies
composer install
bun install

# Run development servers (3 terminals)
php artisan serve          # Laravel @ localhost:8000
bun run dev                # Vite HMR @ localhost:5173
php artisan reverb:start   # WebSocket @ localhost:8080
```

---

## 6. Tidak Digunakan (Keputusan Sadar)

| Teknologi            | Alasan Tidak Digunakan                                  |
| -------------------- | ------------------------------------------------------- |
| REST API             | Tidak perlu karena pakai Inertia.js                     |
| Pusher               | Diganti Laravel Reverb (self-hosted, gratis)            |
| Socket.io            | Laravel Echo + Reverb sudah cukup                       |
| Redux/Zustand        | Inertia.js sudah handle state via page props            |
| Next.js              | Overkill, Laravel + Inertia sudah cukup                 |
| PostgreSQL           | MySQL sudah cukup dan lebih familiar                    |
| Redis                | Tidak diperlukan untuk skala lomba                      |
| Agora/Twilio/Daily   | Pakai WebRTC native untuk menghindari biaya & dependency|
