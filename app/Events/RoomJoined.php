<?php

namespace App\Events;

use App\Models\Room;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoomJoined implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Room $room,
        public User $partner,
    ) {}

    public function broadcastOn(): Channel
    {
        return new PrivateChannel('room.' . $this->room->id);
    }

    public function broadcastAs(): string
    {
        return 'room.joined';
    }

    public function broadcastWith(): array
    {
        return [
            'room_id'     => $this->room->id,
            'room_status' => $this->room->status,
            'partner'     => [
                'id'           => $this->partner->id,
                'name'         => $this->partner->name,
                'username'     => $this->partner->username,
                'avatar_color' => $this->partner->avatar_color,
                'level'        => $this->partner->level,
                'role'         => $this->partner->role,
            ],
        ];
    }
}
