/**
 * TypeScript types untuk PintarBareng
 * Sesuai dengan PRD dan FRONTEND_GUIDELINES
 */

import type { RoomCategory, RoomStatus, UserRole } from '@/lib/constants';

/* =============================================
   USER
   ============================================= */

export interface User {
    id: number;
    name: string;
    email: string;
    username: string | null;
    bio: string | null;
    role: UserRole | null;
    skill_tags: string[];
    avatar_color: string;
    exp: number;
    level: number;
    streak: number;
    is_onboarded: boolean;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

/* =============================================
   ROOM
   ============================================= */

export interface Room {
    id: number;
    title: string;
    description: string | null;
    category: RoomCategory;
    tags: string[];
    status: RoomStatus;
    creator_id: number;
    partner_id: number | null;
    created_at: string;
    updated_at: string;
    // Relations
    creator?: User;
    partner?: User;
}

/* =============================================
   SESSION LOG
   ============================================= */

export interface SessionLog {
    id: number;
    room_id: number;
    learner_id: number;
    teacher_id: number;
    started_at: string;
    ended_at: string | null;
    duration_seconds: number | null;
    created_at: string;
    // Relations
    room?: Room;
    learner?: User;
    teacher?: User;
}

/* =============================================
   FEEDBACK
   ============================================= */

export interface Feedback {
    id: number;
    session_id: number;
    giver_id: number;
    receiver_id: number;
    type: 'puas' | 'membantu' | 'kurang';
    created_at: string;
    // Relations
    giver?: User;
    receiver?: User;
}

/* =============================================
   BADGE
   ============================================= */

export interface Badge {
    id: number;
    slug: string;
    name: string;
    description: string;
    icon: string;
    condition_type: 'sessions' | 'streak' | 'exp' | 'feedback' | 'special';
    condition_value: number;
    tier: 'bronze' | 'silver' | 'gold';
    created_at: string;
}

export interface UserBadge {
    id: number;
    user_id: number;
    badge_id: number;
    unlocked_at: string;
    badge?: Badge;
}

/* =============================================
   ACTIVITY LOG
   ============================================= */

export interface ActivityLog {
    id: number;
    user_id: number;
    type: 'session_completed' | 'badge_unlocked' | 'level_up' | 'streak_updated' | 'exp_gained';
    description: string;
    meta: Record<string, unknown> | null;
    created_at: string;
}

/* =============================================
   LEADERBOARD
   ============================================= */

export interface LeaderboardEntry {
    rank: number;
    user: User;
    value: number;
}

/* =============================================
   INERTIA SHARED DATA
   ============================================= */

export interface SharedData {
    name: string;
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string;
        error?: string;
        info?: string;
    };
    [key: string]: unknown;
}

/* =============================================
   PAGINATED RESPONSE
   ============================================= */

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
