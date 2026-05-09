<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Services\RoomService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(private RoomService $roomService) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        // Load recent activity logs (5 terbaru)
        $recentActivities = $user->activityLogs()
            ->latest()
            ->take(5)
            ->get();

        // Load semua badge + status unlocked per user
        $allBadges  = Badge::orderBy('tier', 'asc')->orderBy('condition_value', 'asc')->get();
        $userBadges = $user->userBadges()->with('badge')->get()->keyBy('badge_id');

        $achievements = $allBadges->map(function (Badge $badge) use ($userBadges) {
            $userBadge = $userBadges->get($badge->id);

            return [
                'badge'       => $badge,
                'is_unlocked' => $userBadge !== null,
                'unlocked_at' => $userBadge?->unlocked_at?->toISOString(),
            ];
        })->values();

        // Active/waiting room milik user
        $activeRoom = $this->roomService->getUserActiveRoom($user);

        // Stats
        $stats = [
            'total_sessions' => 0, // TODO: dihitung dari session_logs di Phase 5+
            'total_exp'      => $user->exp,
            'streak'         => $user->streak,
            'level'          => $user->level,
            'role'           => $user->role,
        ];

        return Inertia::render('Dashboard', [
            'recentActivities' => $recentActivities,
            'activeRoom'       => $activeRoom,
            'achievements'     => $achievements,
            'stats'            => $stats,
        ]);
    }
}
