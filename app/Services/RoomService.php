<?php

namespace App\Services;

use App\Events\RoomJoined;
use App\Models\Room;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RoomService
{
    public function create(User $user, array $data): Room
    {
        return Room::create([
            'title'       => $data['title'],
            'description' => $data['description'] ?? null,
            'category'    => $data['category'],
            'tags'        => $data['tags'] ?? [],
            'status'      => 'waiting',
            'creator_id'  => $user->id,
        ]);
    }

    public function join(User $user, Room $room): Room
    {
        if ($room->status !== 'waiting') {
            throw new \RuntimeException('Room tidak tersedia untuk di-join.');
        }

        if ($room->creator_id === $user->id) {
            throw new \RuntimeException('Tidak bisa join room yang kamu buat sendiri.');
        }

        $room->update([
            'partner_id' => $user->id,
            'status'     => 'active',
        ]);

        $room->load(['creator', 'partner']);

        broadcast(new RoomJoined($room, $user))->toOthers();

        return $room;
    }

    public function cancel(User $user, Room $room): void
    {
        if ($room->creator_id !== $user->id) {
            throw new \RuntimeException('Hanya creator yang bisa membatalkan room.');
        }

        $room->update(['status' => 'cancelled']);
    }

    public function getAvailableRooms(array $filters = []): LengthAwarePaginator
    {
        $query = Room::with(['creator'])
            ->where('status', 'waiting')
            ->latest();

        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        return $query->paginate(12)->withQueryString();
    }

    public function getUserActiveRoom(User $user): ?Room
    {
        return Room::with(['creator', 'partner'])
            ->where(function ($q) use ($user) {
                $q->where('creator_id', $user->id)
                    ->orWhere('partner_id', $user->id);
            })
            ->whereIn('status', ['waiting', 'active'])
            ->latest()
            ->first();
    }
}
