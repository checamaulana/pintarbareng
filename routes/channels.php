<?php

use App\Models\Room;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('room.{roomId}', function ($user, int $roomId) {
    $room = Room::find($roomId);

    if (!$room) {
        return false;
    }

    return $room->creator_id === $user->id || $room->partner_id === $user->id;
});
