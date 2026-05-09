<?php

namespace App\Enums;

enum UserRole: string
{
    case LEARNER = 'learner';
    case TEACHER = 'teacher';

    public function label(): string
    {
        return match($this) {
            self::LEARNER => 'Pembelajar',
            self::TEACHER => 'Pengajar',
        };
    }
}
