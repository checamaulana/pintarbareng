<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;

class StreakService
{
    public function updateStreak(User $user): void
    {
        $lastLogin = $user->last_login_at;

        if (!$lastLogin) {
            $user->update([
                'streak' => 1,
                'last_login_at' => now(),
            ]);
            return;
        }

        $lastLoginDate = Carbon::parse($lastLogin)->startOfDay();
        $today = now()->startOfDay();

        $diffInDays = $lastLoginDate->diffInDays($today);

        if ($diffInDays == 1) {
            // Logged in yesterday, increment streak
            $user->increment('streak');
            $user->update(['last_login_at' => now()]);
        } elseif ($diffInDays > 1) {
            // Missed a day, reset streak
            $user->update([
                'streak' => 1,
                'last_login_at' => now(),
            ]);
        } else {
            // Logged in today, just update last login
            $user->update(['last_login_at' => now()]);
        }
    }
}
