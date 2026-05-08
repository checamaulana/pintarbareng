# 🏗️ BACKEND_STRUCTURE — PintarBareng

> **Backend Architecture Document**
> Versi: 1.0 | Tanggal: 8 Mei 2026

---

## 1. Architecture Overview

```
┌────────────────────────────────────────────────────────┐
│                    Laravel 12                          │
│                                                        │
│  Routes → Middleware → Controller → Service → Model    │
│                            │                           │
│                       Inertia::render()                │
│                            │                           │
│                    React Page Component                │
└────────────────────────────────────────────────────────┘
```

**Pattern:** Clean MVC + Service Layer. Tidak pakai Repository pattern (overkill untuk skala ini).

---

## 2. Folder Structure

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── LoginController.php
│   │   │   ├── RegisterController.php
│   │   │   └── LogoutController.php
│   │   ├── OnboardingController.php
│   │   ├── DashboardController.php
│   │   ├── RoomController.php
│   │   ├── SessionController.php
│   │   ├── FeedbackController.php
│   │   ├── LeaderboardController.php
│   │   ├── ProfileController.php
│   │   └── SignalingController.php      # WebRTC signaling via WebSocket
│   ├── Middleware/
│   │   ├── EnsureOnboarded.php          # Redirect ke onboarding jika belum
│   │   └── EnsureRoomParticipant.php    # Cek user adalah peserta room
│   └── Requests/
│       ├── Auth/
│       │   ├── LoginRequest.php
│       │   └── RegisterRequest.php
│       ├── OnboardingRequest.php
│       ├── CreateRoomRequest.php
│       └── FeedbackRequest.php
├── Models/
│   ├── User.php
│   ├── Room.php
│   ├── Session.php
│   ├── Feedback.php
│   ├── Badge.php
│   ├── UserBadge.php
│   └── ActivityLog.php
├── Services/
│   ├── GamificationService.php          # EXP, level up, badge logic
│   ├── StreakService.php                 # Daily streak tracking
│   ├── RoomService.php                  # Room creation, join, status
│   ├── SessionService.php              # Start, end session
│   ├── BadgeService.php                 # Badge check & unlock
│   └── LeaderboardService.php           # Leaderboard queries
├── Enums/
│   ├── UserRole.php                     # Pembelajar, Pengajar
│   ├── RoomStatus.php                   # Waiting, Active, Completed, Cancelled
│   ├── RoomCategory.php                 # Pemrograman, Matematika, etc
│   ├── FeedbackType.php                 # Puas, SangatMembantu, KurangMembantu
│   └── LearnerLevel.php / TeacherLevel.php
├── Events/
│   ├── UserJoinedRoom.php
│   ├── SessionStarted.php
│   ├── SessionEnded.php
│   ├── ExpGained.php
│   ├── LeveledUp.php
│   └── BadgeUnlocked.php
├── Listeners/
│   ├── AwardSessionExp.php
│   ├── CheckLevelUp.php
│   ├── CheckBadgeUnlock.php
│   └── LogActivity.php
└── Providers/
    └── EventServiceProvider.php

database/
├── migrations/
│   ├── 0001_create_users_table.php
│   ├── 0002_create_rooms_table.php
│   ├── 0003_create_sessions_table.php
│   ├── 0004_create_feedbacks_table.php
│   ├── 0005_create_badges_table.php
│   ├── 0006_create_user_badges_table.php
│   └── 0007_create_activity_logs_table.php
├── seeders/
│   ├── DatabaseSeeder.php
│   ├── BadgeSeeder.php
│   └── DemoUserSeeder.php               # User demo untuk video lomba
└── factories/
    ├── UserFactory.php
    └── RoomFactory.php

routes/
├── web.php                              # Semua routes (Inertia)
├── channels.php                         # WebSocket channel authorization
└── console.php
```

---

## 3. Database Schema

### 3.1 users

```sql
CREATE TABLE users (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password        VARCHAR(255) NOT NULL,
    role            ENUM('pembelajar', 'pengajar') NOT NULL,
    name            VARCHAR(50) NULL,
    username        VARCHAR(20) UNIQUE NULL,
    bio             VARCHAR(200) NULL,
    skill_tags      JSON NULL,                    -- ["react", "hooks", "typescript"]
    avatar_color    VARCHAR(7) DEFAULT '#6366F1',  -- Hex color untuk default avatar
    exp             INT UNSIGNED DEFAULT 0,
    level           TINYINT UNSIGNED DEFAULT 1,
    streak_count    INT UNSIGNED DEFAULT 0,
    streak_last_date DATE NULL,                   -- Tanggal terakhir streak dihitung
    total_sessions  INT UNSIGNED DEFAULT 0,
    is_onboarded    BOOLEAN DEFAULT FALSE,
    remember_token  VARCHAR(100) NULL,
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL,
    
    INDEX idx_role (role),
    INDEX idx_exp (exp DESC),
    INDEX idx_streak (streak_count DESC),
    INDEX idx_total_sessions (total_sessions DESC)
);
```

### 3.2 rooms

```sql
CREATE TABLE rooms (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    creator_id      BIGINT UNSIGNED NOT NULL,
    partner_id      BIGINT UNSIGNED NULL,          -- User yang join
    title           VARCHAR(100) NOT NULL,
    description     VARCHAR(500) NOT NULL,
    category        ENUM('pemrograman', 'matematika', 'bahasa_inggris', 'desain', 'sains') NOT NULL,
    tags            JSON NULL,                     -- ["react", "hooks"]
    status          ENUM('waiting', 'active', 'completed', 'cancelled') DEFAULT 'waiting',
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL,
    
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (partner_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created (created_at DESC)
);
```

### 3.3 sessions

```sql
CREATE TABLE sessions_log (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    room_id         BIGINT UNSIGNED NOT NULL,
    started_at      TIMESTAMP NULL,
    ended_at        TIMESTAMP NULL,
    duration_seconds INT UNSIGNED NULL,            -- Dihitung saat sesi selesai
    ended_by        BIGINT UNSIGNED NULL,          -- User yang mengakhiri
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL,
    
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    FOREIGN KEY (ended_by) REFERENCES users(id) ON DELETE SET NULL
);
```

### 3.4 feedbacks

```sql
CREATE TABLE feedbacks (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id      BIGINT UNSIGNED NOT NULL,
    learner_id      BIGINT UNSIGNED NOT NULL,      -- Yang memberikan feedback
    teacher_id      BIGINT UNSIGNED NOT NULL,      -- Yang menerima feedback
    type            ENUM('puas', 'sangat_membantu', 'kurang_membantu') NOT NULL,
    created_at      TIMESTAMP NULL,
    
    FOREIGN KEY (session_id) REFERENCES sessions_log(id) ON DELETE CASCADE,
    FOREIGN KEY (learner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_feedback (session_id, learner_id)
);
```

### 3.5 badges

```sql
CREATE TABLE badges (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug            VARCHAR(50) UNIQUE NOT NULL,    -- "langkah-pertama"
    name            VARCHAR(50) NOT NULL,           -- "Langkah Pertama"
    description     VARCHAR(200) NOT NULL,
    icon            VARCHAR(10) NOT NULL,           -- Emoji: "🏅"
    condition_type  VARCHAR(50) NOT NULL,           -- "sessions_completed", "streak_days"
    condition_value INT NOT NULL,                   -- Misal: 1, 5, 10
    created_at      TIMESTAMP NULL,
    updated_at      TIMESTAMP NULL
);
```

### 3.6 user_badges

```sql
CREATE TABLE user_badges (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    badge_id        BIGINT UNSIGNED NOT NULL,
    unlocked_at     TIMESTAMP NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id)
);
```

### 3.7 activity_logs

```sql
CREATE TABLE activity_logs (
    id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    type            VARCHAR(50) NOT NULL,           -- "session_completed", "level_up", "badge_unlocked", "exp_gained", "streak"
    description     VARCHAR(200) NOT NULL,
    metadata        JSON NULL,                     -- { "exp": 30, "room_title": "..." }
    created_at      TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_created (user_id, created_at DESC)
);
```

### ER Diagram

```
users 1──────M rooms (creator_id)
users 1──────M rooms (partner_id)
rooms 1──────1 sessions_log
sessions_log 1──────1 feedbacks
users M──────M badges (via user_badges)
users 1──────M activity_logs
```

---

## 4. API Routes (Inertia - web.php)

```php
// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/', fn () => Inertia::render('Landing'))->name('landing');
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
    Route::get('/register', [RegisterController::class, 'show'])->name('register');
    Route::post('/register', [RegisterController::class, 'store']);
});

// Auth routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LogoutController::class, 'store'])->name('logout');
    
    // Onboarding (sebelum onboarded)
    Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding');
    Route::post('/onboarding', [OnboardingController::class, 'store']);

    // Main app (setelah onboarded)
    Route::middleware('onboarded')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        
        Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
        Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('/rooms/{room}', [RoomController::class, 'show'])->name('rooms.show');
        Route::post('/rooms/{room}/join', [RoomController::class, 'join'])->name('rooms.join');
        Route::post('/rooms/{room}/cancel', [RoomController::class, 'cancel'])->name('rooms.cancel');
        
        Route::middleware('room.participant')->group(function () {
            Route::get('/rooms/{room}/session', [SessionController::class, 'show'])->name('rooms.session');
            Route::post('/rooms/{room}/session/end', [SessionController::class, 'end'])->name('rooms.session.end');
            Route::get('/rooms/{room}/complete', [SessionController::class, 'complete'])->name('rooms.complete');
        });
        
        Route::post('/rooms/{room}/feedback', [FeedbackController::class, 'store'])->name('feedback.store');
        
        Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard');
        
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    });
});
```

---

## 5. Key Service Logic

### 5.1 GamificationService

```php
class GamificationService
{
    const EXP_SESSION_LEARNER = 30;
    const EXP_SESSION_TEACHER = 50;
    const EXP_FEEDBACK_PUAS = 20;
    const EXP_FEEDBACK_SANGAT_MEMBANTU = 30;
    const EXP_FEEDBACK_GIVEN = 5;
    const EXP_DAILY_STREAK = 10;

    const LEARNER_LEVELS = [1 => 0, 2 => 100, 3 => 300, 4 => 700, 5 => 1500];
    const TEACHER_LEVELS = [1 => 0, 2 => 50, 3 => 250, 4 => 600, 5 => 1300];

    public function addExp(User $user, int $amount, string $reason): void
    {
        $user->increment('exp', $amount);
        $this->checkLevelUp($user);
        // Log activity
    }

    public function checkLevelUp(User $user): ?int
    {
        $levels = $user->role === 'pengajar' 
            ? self::TEACHER_LEVELS 
            : self::LEARNER_LEVELS;
        
        $newLevel = 1;
        foreach ($levels as $level => $expRequired) {
            if ($user->exp >= $expRequired) $newLevel = $level;
        }
        
        if ($newLevel > $user->level) {
            $user->update(['level' => $newLevel]);
            event(new LeveledUp($user, $newLevel));
            return $newLevel;
        }
        return null;
    }
}
```

### 5.2 StreakService

```php
class StreakService
{
    public function recordLogin(User $user): void
    {
        $today = now()->toDateString();
        
        if ($user->streak_last_date === $today) return; // Sudah login hari ini
        
        $yesterday = now()->subDay()->toDateString();
        
        if ($user->streak_last_date === $yesterday) {
            // Lanjutkan streak
            $user->increment('streak_count');
        } else {
            // Reset streak
            $user->update(['streak_count' => 1]);
        }
        
        $user->update(['streak_last_date' => $today]);
        
        // Award streak EXP
        app(GamificationService::class)->addExp($user, 10, 'Daily streak');
    }
}
```

### 5.3 WebSocket Channels (channels.php)

```php
// Room presence channel - untuk mengetahui siapa di room
Broadcast::channel('room.{roomId}', function (User $user, int $roomId) {
    $room = Room::find($roomId);
    return $room && ($room->creator_id === $user->id || $room->partner_id === $user->id);
});

// Signaling channel - untuk WebRTC signaling
Broadcast::channel('signaling.{roomId}', function (User $user, int $roomId) {
    $room = Room::find($roomId);
    return $room && ($room->creator_id === $user->id || $room->partner_id === $user->id);
});
```

---

## 6. Event-Listener Architecture

```
SessionEnded
  ├── AwardSessionExp        → Tambah EXP ke kedua user
  ├── IncrementSessionCount  → Update total_sessions
  ├── CheckBadgeUnlock       → Cek apakah badge baru terbuka
  └── LogActivity            → Catat ke activity_logs

FeedbackGiven
  ├── AwardFeedbackExp       → EXP ke pembelajar (5) + bonus ke pengajar
  ├── CheckBadgeUnlock       → Cek badge "Bintang Kelas"
  └── LogActivity

LeveledUp
  └── LogActivity            → Catat level up ke activity_logs

BadgeUnlocked
  └── LogActivity            → Catat badge unlock
```

---

## 7. Eloquent Model Relationships

```php
// User
hasMany(Room::class, 'creator_id')      // rooms yang dibuat
hasMany(Room::class, 'partner_id')      // rooms yang di-join
hasMany(ActivityLog::class)
belongsToMany(Badge::class, 'user_badges')->withPivot('unlocked_at')
hasMany(Feedback::class, 'learner_id')  // feedback yang diberikan
hasMany(Feedback::class, 'teacher_id')  // feedback yang diterima

// Room
belongsTo(User::class, 'creator')
belongsTo(User::class, 'partner')
hasOne(SessionLog::class)

// SessionLog
belongsTo(Room::class)
hasOne(Feedback::class, 'session_id')

// Badge
belongsToMany(User::class, 'user_badges')->withPivot('unlocked_at')
```

---

## 8. Enums

```php
enum UserRole: string {
    case Pembelajar = 'pembelajar';
    case Pengajar = 'pengajar';
}

enum RoomStatus: string {
    case Waiting = 'waiting';
    case Active = 'active';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
}

enum RoomCategory: string {
    case Pemrograman = 'pemrograman';
    case Matematika = 'matematika';
    case BahasaInggris = 'bahasa_inggris';
    case Desain = 'desain';
    case Sains = 'sains';
}

enum FeedbackType: string {
    case Puas = 'puas';
    case SangatMembantu = 'sangat_membantu';
    case KurangMembantu = 'kurang_membantu';
}
```

---

## 9. Security

| Concern              | Solution                                           |
| -------------------- | -------------------------------------------------- |
| Authentication       | Laravel built-in session auth                      |
| CSRF                 | Laravel CSRF token (auto via Inertia)              |
| Authorization        | Middleware + policy checks                         |
| SQL Injection        | Eloquent ORM (parameterized queries)               |
| XSS                  | React auto-escapes, Inertia handles                |
| Mass Assignment      | `$fillable` on all models                          |
| Rate Limiting        | Laravel rate limiter on auth routes                |
| Room Access          | Middleware cek participant                         |
