<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'tags',
        'status',
        'creator_id',
        'partner_id',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function scopeWaiting($query)
    {
        return $query->where('status', 'waiting');
    }

    public function isWaiting(): bool
    {
        return $this->status === 'waiting';
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}
