# 🎨 FRONTEND_GUIDELINES — PintarBareng

> **Frontend Design & Development Guidelines**
> Versi: 1.0 | Tanggal: 8 Mei 2026

---

## 1. Design Philosophy

### Core Principles

1. **Delightful** — Setiap interaksi harus terasa menyenangkan
2. **Gamified** — UI harus terasa seperti game tanpa kehilangan fungsi
3. **Modern & Clean** — Minimalis tapi tidak membosankan
4. **Responsive** — Desktop-first, tapi tetap indah di mobile
5. **Fast** — Performa ringan, loading cepat, animasi smooth

### Design Inspiration

| Platform      | Yang Diambil                                    |
| ------------- | ----------------------------------------------- |
| **Duolingo**  | Gamifikasi, warna ceria, progress tracking      |
| **GitHub**    | Contribution graph, streak, achievement cards   |
| **Notion**    | Simplicity, whitespace, clean typography        |
| **Discord**   | Real-time feel, room/channel concept            |

---

## 2. Color System

### Primary Palette

```css
/* Brand Colors */
--primary-50:  #EEF2FF;   /* Lightest - backgrounds */
--primary-100: #E0E7FF;
--primary-200: #C7D2FE;
--primary-300: #A5B4FC;
--primary-400: #818CF8;
--primary-500: #6366F1;   /* Main brand - Indigo */
--primary-600: #4F46E5;   /* Hover states */
--primary-700: #4338CA;   /* Active states */
--primary-800: #3730A3;
--primary-900: #312E81;   /* Darkest */
```

### Accent Colors (Gamifikasi)

```css
/* EXP & Progress */
--exp-gradient-from: #F59E0B;  /* Amber */
--exp-gradient-to:   #EF4444;  /* Red-Orange */

/* Level Up */
--levelup-gradient-from: #8B5CF6;  /* Purple */
--levelup-gradient-to:   #EC4899;  /* Pink */

/* Streak */
--streak-color: #F97316;  /* Orange fire */

/* Feedback */
--feedback-puas:     #10B981;  /* Emerald green */
--feedback-membantu: #6366F1;  /* Indigo */
--feedback-kurang:   #6B7280;  /* Gray */

/* Badge */
--badge-gold:   #F59E0B;
--badge-silver: #9CA3AF;
--badge-bronze: #D97706;
--badge-locked: #374151;
```

### Semantic Colors

```css
/* Status */
--success: #10B981;   /* Green */
--warning: #F59E0B;   /* Amber */
--error:   #EF4444;   /* Red */
--info:    #3B82F6;   /* Blue */

/* Room Status */
--room-waiting:    #F59E0B;   /* Amber - menunggu */
--room-active:     #10B981;   /* Green - berlangsung */
--room-completed:  #6B7280;   /* Gray - selesai */
--room-cancelled:  #EF4444;   /* Red - dibatalkan */
```

### Neutral Colors

```css
--neutral-50:  #F9FAFB;
--neutral-100: #F3F4F6;
--neutral-200: #E5E7EB;
--neutral-300: #D1D5DB;
--neutral-400: #9CA3AF;
--neutral-500: #6B7280;
--neutral-600: #4B5563;
--neutral-700: #374151;
--neutral-800: #1F2937;
--neutral-900: #111827;
--neutral-950: #030712;
```

### Background

```css
/* Light mode (default) */
--bg-primary:   #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary:  #F3F4F6;

/* Card */
--bg-card:        #FFFFFF;
--bg-card-hover:  #F9FAFB;
--border-card:    #E5E7EB;
```

> **Catatan:** Hanya light mode. Tidak ada dark mode untuk menyederhanakan development.

---

## 3. Typography

### Font Family

```css
/* Primary Font - Clean, modern, readable */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

/* Heading accent (opsional, untuk gamifikasi elements) */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
--font-heading: 'Space Grotesk', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Element     | Font          | Size     | Weight   | Line Height | Usage                  |
| ----------- | ------------- | -------- | -------- | ----------- | ---------------------- |
| **h1**      | Space Grotesk | 36px     | 700      | 1.2         | Page titles            |
| **h2**      | Space Grotesk | 28px     | 700      | 1.3         | Section headers        |
| **h3**      | Space Grotesk | 22px     | 600      | 1.3         | Card titles            |
| **h4**      | Inter         | 18px     | 600      | 1.4         | Sub-section headers    |
| **body**    | Inter         | 16px     | 400      | 1.5         | Default text           |
| **body-sm** | Inter         | 14px     | 400      | 1.5         | Secondary text         |
| **caption** | Inter         | 12px     | 500      | 1.4         | Labels, meta info      |
| **badge**   | Inter         | 11px     | 700      | 1.0         | Badge/tag text         |

---

## 4. Spacing & Layout

### Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

### Layout Rules

| Element          | Rule                                                  |
| ---------------- | ----------------------------------------------------- |
| **Container**    | max-width: 1280px, centered, padding: 0 24px          |
| **Grid**         | CSS Grid atau Flexbox, gap: 24px default               |
| **Cards**        | padding: 24px, border-radius: 16px                    |
| **Buttons**      | padding: 12px 24px, border-radius: 12px               |
| **Inputs**       | padding: 12px 16px, border-radius: 10px               |
| **Page padding** | padding-y: 32px                                       |
| **Navbar height**| 64px                                                  |

### Border Radius

```css
--radius-sm:   8px;   /* Small elements, tags */
--radius-md:   12px;  /* Buttons, inputs */
--radius-lg:   16px;  /* Cards */
--radius-xl:   20px;  /* Large cards, modals */
--radius-full: 9999px; /* Avatars, pills */
```

---

## 5. Component Design Rules

### 5.1 Cards

```
┌──────────────────────────────┐
│  border: 1px solid #E5E7EB  │
│  border-radius: 16px        │
│  padding: 24px              │
│  background: white          │
│  box-shadow: 0 1px 3px      │
│    rgba(0,0,0,0.05)         │
│                              │
│  On Hover:                   │
│    box-shadow: 0 4px 12px   │
│      rgba(0,0,0,0.1)        │
│    transform: translateY    │
│      (-2px)                  │
│    transition: 200ms ease   │
└──────────────────────────────┘
```

### 5.2 Buttons

| Variant      | Style                                                     |
| ------------ | --------------------------------------------------------- |
| **Primary**  | bg: primary-600, text: white, hover: primary-700          |
| **Secondary**| bg: transparent, border: neutral-300, hover: neutral-100  |
| **Ghost**    | bg: transparent, hover: neutral-100                       |
| **Danger**   | bg: red-600, text: white, hover: red-700                  |
| **Success**  | bg: emerald-600, text: white, hover: emerald-700          |

Semua button:
- `border-radius: 12px`
- `font-weight: 600`
- `transition: all 200ms ease`
- `cursor: pointer`
- Loading state: spinner icon + disabled

### 5.3 Inputs

- `border: 1px solid neutral-300`
- `border-radius: 10px`
- `padding: 12px 16px`
- `focus: ring-2 ring-primary-500/20, border-primary-500`
- `transition: border-color 150ms ease`
- Label di atas input, font-weight: 500

### 5.4 Avatar

- Ukuran: 40px (sm), 56px (md), 80px (lg), 120px (xl)
- Default: Generated initials dengan background warna random dari palette
- `border-radius: 9999px` (full circle)
- Border: 2px solid white + shadow

### 5.5 Badges/Tags

```
┌──────────────┐
│  Pemrograman │  ← Category badge
└──────────────┘
- bg: primary-100
- text: primary-700
- padding: 4px 12px
- border-radius: 9999px
- font-size: 12px
- font-weight: 600

┌──────────────┐
│  react       │  ← Skill tag
└──────────────┘
- bg: neutral-100
- text: neutral-700
- padding: 4px 10px
- border-radius: 8px
- font-size: 12px
```

### 5.6 Room Card

```
┌────────────────────────────────────────────────┐
│                                                │
│  📗 "Butuh bantuan React state management"     │
│                                                │
│  Lorem ipsum dolor sit amet, consectetur       │
│  adipiscing elit. Sed do eiusmod...            │
│                                                │
│  [Pemrograman]  [react] [hooks] [state]        │
│                                                │
│  👤 @johndoe • Pembelajar   ⏳ Menunggu         │
│                                                │
│                          [ Join Room →]         │
│                                                │
└────────────────────────────────────────────────┘

- Rounded corners (16px)
- Subtle border
- Hover: slight elevation
- Status indicator colored dot
- Category as colored badge
- Tags as neutral pills
```

---

## 6. Gamifikasi UI Components

### 6.1 EXP Bar

```
Level 2 "Pencari Ilmu"
████████████████░░░░░░░░░░░░░░  150 / 300 EXP
                                   ↗ Next: "Tukang Grinding"

- Height: 12px
- border-radius: 9999px
- Background track: neutral-200
- Fill: linear-gradient(to right, #F59E0B, #EF4444)
- Animated fill on EXP gain (spring animation)
- Glow effect saat mendekati level up
```

### 6.2 Level Badge

```
┌─────────────┐
│  ⭐ Lv. 2   │
│  Pencari    │
│  Ilmu      │
└─────────────┘

- Gradient background sesuai level
- Level 1: Gray gradient
- Level 2: Blue gradient
- Level 3: Green gradient
- Level 4: Purple gradient
- Level 5: Gold gradient + subtle glow
```

### 6.3 Streak Counter

```
🔥 7 hari berturut-turut!

- Fire emoji + count
- Animated flame saat streak aktif
- Warna: orange gradient
- Pulse animation jika streak > 7
```

### 6.4 Achievement/Badge Card

```
┌──────────────────────┐     ┌──────────────────────┐
│  🏅                  │     │  🔒                  │
│  Langkah Pertama     │     │  ???                  │
│                      │     │                      │
│  "Menyelesaikan      │     │  "Terus berjuang     │
│   sesi pertama"      │     │   untuk unlock!"     │
│                      │     │                      │
│  ✅ Unlocked         │     │  Locked              │
└──────────────────────┘     └──────────────────────┘

- Unlocked: Full color, slight gold glow
- Locked: Grayscale, dashed border, opacity 0.6
```

---

## 7. Animation Guidelines

### 7.1 Micro-interactions (Framer Motion)

| Interaksi            | Animasi                                         | Duration |
| -------------------- | ----------------------------------------------- | -------- |
| Page transition      | Fade + slide up                                 | 300ms    |
| Card hover           | Scale(1.02) + shadow increase                   | 200ms    |
| Button press         | Scale(0.97)                                     | 100ms    |
| Modal open           | Fade in + scale from 0.95                       | 250ms    |
| Modal close          | Fade out + scale to 0.95                        | 200ms    |
| Toast notification   | Slide in from top-right                         | 300ms    |
| List items           | Staggered fade-in (50ms delay each)             | 300ms    |

### 7.2 Gamifikasi Animations

| Interaksi            | Animasi                                         | Duration |
| -------------------- | ----------------------------------------------- | -------- |
| EXP gain             | Bar fills with spring physics + number count-up | 800ms    |
| Level up             | Full-screen confetti + scale pulse              | 1500ms   |
| Badge unlock         | Badge flies in + glow pulse                     | 1000ms   |
| Streak increment     | Fire emoji bounce + number flip                 | 500ms    |
| Feedback reward      | Coin/star burst animation                       | 800ms    |

### 7.3 Loading States

| Element              | Loading State                                   |
| -------------------- | ----------------------------------------------- |
| Cards                | Skeleton shimmer (pulse animation)              |
| Text                 | Skeleton bars with rounded corners              |
| Avatar               | Circle skeleton                                 |
| EXP bar              | Pulsing gradient                                |
| Buttons (submitting) | Spinner icon + disabled state                   |

### 7.4 Empty States

Setiap empty state harus memiliki:
- Ilustrasi atau emoji besar (centered)
- Pesan yang friendly dan encouraging
- CTA button untuk aksi yang relevan

Contoh:
```
         🚀
  Belum ada room tersedia
  
  Jadilah yang pertama membuat room!
  
  [ Buat Room Pertamamu ]
```

---

## 8. Responsive Breakpoints

```css
/* Desktop-first approach */
--breakpoint-xl:  1280px;  /* Large desktop */
--breakpoint-lg:  1024px;  /* Desktop */
--breakpoint-md:  768px;   /* Tablet */
--breakpoint-sm:  640px;   /* Large mobile */
--breakpoint-xs:  475px;   /* Mobile */
```

### Responsive Rules

| Breakpoint    | Layout Changes                                        |
| ------------- | ----------------------------------------------------- |
| **≥ 1280px**  | Full layout, sidebar visible                          |
| **≥ 1024px**  | Dashboard grid 3 columns                              |
| **≥ 768px**   | Dashboard grid 2 columns, navbar intact               |
| **< 768px**   | Single column, hamburger menu, bottom nav for key actions |
| **< 640px**   | Full-width cards, stacked layout                      |

### Video Call Responsive

| Breakpoint    | Video Layout                                          |
| ------------- | ----------------------------------------------------- |
| **≥ 768px**   | Side-by-side video (large + small PiP)                |
| **< 768px**   | Stacked (partner video full, self video small overlay) |

---

## 9. Component Architecture

### 9.1 Folder Structure

```
resources/js/
├── app.tsx                    # Inertia app entry
├── ssr.tsx                    # SSR entry (opsional)
├── types/                     # TypeScript types
│   ├── index.d.ts
│   └── models.ts              # User, Room, Badge types
├── Components/                # Reusable components
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   └── toast.tsx
│   ├── layout/                # Layout components
│   │   ├── AppLayout.tsx      # Main authenticated layout
│   │   ├── GuestLayout.tsx    # Unauthenticated layout
│   │   ├── Navbar.tsx
│   │   └── MobileNav.tsx
│   ├── gamification/          # Gamifikasi components
│   │   ├── ExpBar.tsx
│   │   ├── LevelBadge.tsx
│   │   ├── StreakCounter.tsx
│   │   ├── AchievementCard.tsx
│   │   ├── LevelUpModal.tsx
│   │   ├── BadgeUnlockModal.tsx
│   │   └── ExpGainToast.tsx
│   ├── room/                  # Room components
│   │   ├── RoomCard.tsx
│   │   ├── RoomFilters.tsx
│   │   ├── RoomForm.tsx
│   │   ├── RoomStatus.tsx
│   │   └── WaitingState.tsx
│   ├── video/                 # Video call components
│   │   ├── VideoPlayer.tsx
│   │   ├── VideoControls.tsx
│   │   ├── SessionTimer.tsx
│   │   ├── ConnectionStatus.tsx
│   │   └── EndSessionDialog.tsx
│   ├── feedback/              # Feedback components
│   │   ├── FeedbackModal.tsx
│   │   └── RewardAnimation.tsx
│   ├── leaderboard/           # Leaderboard components
│   │   ├── LeaderboardTable.tsx
│   │   ├── LeaderboardTabs.tsx
│   │   └── RankCard.tsx
│   └── shared/                # Shared components
│       ├── Avatar.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSkeleton.tsx
│       ├── PageHeader.tsx
│       └── StatCard.tsx
├── Pages/                     # Inertia pages
│   ├── Landing.tsx
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── SelectRole.tsx
│   ├── Onboarding/
│   │   └── Setup.tsx
│   ├── Dashboard/
│   │   └── Index.tsx
│   ├── Rooms/
│   │   ├── Index.tsx          # Jelajah room
│   │   ├── Create.tsx         # Buat room
│   │   ├── Show.tsx           # Room detail / waiting
│   │   ├── Session.tsx        # Video call
│   │   └── Complete.tsx       # Post-session
│   ├── Leaderboard/
│   │   └── Index.tsx
│   └── Profile/
│       └── Edit.tsx
├── hooks/                     # Custom React hooks
│   ├── useWebRTC.ts           # WebRTC connection logic
│   ├── useEcho.ts             # Laravel Echo wrapper
│   ├── useTimer.ts            # Session timer
│   └── useGamification.ts     # EXP, level, badge logic
├── lib/                       # Utility functions
│   ├── utils.ts               # cn(), formatters
│   ├── webrtc.ts              # WebRTC helpers
│   └── constants.ts           # Categories, levels, etc
└── styles/
    └── app.css                # Tailwind + custom styles
```

### 9.2 Component Naming Convention

- **PascalCase** untuk semua component files
- **Prefix sesuai domain**: `RoomCard`, `ExpBar`, `VideoPlayer`
- **Suffix untuk tipe**: `*Modal`, `*Dialog`, `*Toast`, `*Skeleton`

### 9.3 Props Convention

```tsx
// Selalu gunakan interface untuk props
interface RoomCardProps {
  room: Room;
  onJoin?: (roomId: number) => void;
  isLoading?: boolean;
}

// Destructure props
export function RoomCard({ room, onJoin, isLoading }: RoomCardProps) {
  // ...
}
```

---

## 10. Accessibility (A11y)

| Rule                                    | Implementation                        |
| --------------------------------------- | ------------------------------------- |
| Keyboard navigable                      | All interactive elements focusable    |
| Focus visible                           | Custom focus ring (primary-500/20)    |
| ARIA labels                             | All buttons, icons, inputs            |
| Color contrast                          | Minimum 4.5:1 for text               |
| Screen reader support                   | Via shadcn/ui (Radix primitives)      |
| Semantic HTML                           | Proper heading hierarchy, landmarks   |

---

## 11. Performance Guidelines

| Rule                                    | Implementation                        |
| --------------------------------------- | ------------------------------------- |
| Lazy load pages                         | Inertia code-splitting per page       |
| Optimize images                         | WebP format, lazy loading             |
| Minimize bundle                         | Tree-shaking, no unused imports       |
| Memoize expensive renders               | React.memo, useMemo where needed      |
| Debounce search inputs                  | 300ms debounce                        |
| Skeleton loading                        | Show immediately, no blank screens    |
