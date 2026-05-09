<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            // === BRONZE ===
            [
                'slug'            => 'langkah-pertama',
                'name'            => 'Langkah Pertama',
                'description'     => 'Selesaikan sesi pertamamu.',
                'icon'            => '👣',
                'condition_type'  => 'sessions',
                'condition_value' => 1,
                'tier'            => 'bronze',
            ],
            [
                'slug'            => 'bintang-5',
                'name'            => 'Bintang 5',
                'description'     => 'Selesaikan 5 sesi belajar atau mengajar.',
                'icon'            => '⭐',
                'condition_type'  => 'sessions',
                'condition_value' => 5,
                'tier'            => 'bronze',
            ],

            // === SILVER ===
            [
                'slug'            => 'guru-sejati',
                'name'            => 'Guru Sejati',
                'description'     => 'Selesaikan 10 sesi mengajar.',
                'icon'            => '🎓',
                'condition_type'  => 'sessions',
                'condition_value' => 10,
                'tier'            => 'silver',
            ],
            [
                'slug'            => 'murid-rajin',
                'name'            => 'Murid Rajin',
                'description'     => 'Selesaikan 10 sesi belajar.',
                'icon'            => '📚',
                'condition_type'  => 'sessions',
                'condition_value' => 10,
                'tier'            => 'silver',
            ],
            [
                'slug'            => 'semangat-membara',
                'name'            => 'Semangat Membara',
                'description'     => 'Pertahankan streak 7 hari berturut-turut.',
                'icon'            => '🔥',
                'condition_type'  => 'streak',
                'condition_value' => 7,
                'tier'            => 'silver',
            ],

            // === GOLD ===
            [
                'slug'            => 'tak-terbendung',
                'name'            => 'Tak Terbendung',
                'description'     => 'Streak luar biasa selama 30 hari berturut-turut.',
                'icon'            => '⚡',
                'condition_type'  => 'streak',
                'condition_value' => 30,
                'tier'            => 'gold',
            ],
            [
                'slug'            => 'bintang-kelas',
                'name'            => 'Bintang Kelas',
                'description'     => 'Terima 10 feedback "Puas" dari pelajar.',
                'icon'            => '🌟',
                'condition_type'  => 'feedback',
                'condition_value' => 10,
                'tier'            => 'gold',
            ],
            [
                'slug'            => 'legenda',
                'name'            => 'Legenda',
                'description'     => 'Capai level tertinggi (Level 5).',
                'icon'            => '👑',
                'condition_type'  => 'exp',
                'condition_value' => 5,
                'tier'            => 'gold',
            ],
        ];

        foreach ($badges as $badge) {
            Badge::updateOrCreate(['slug' => $badge['slug']], $badge);
        }
    }
}
