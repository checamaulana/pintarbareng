<?php

namespace App\Http\Middleware;

use App\Models\Room;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRoomParticipant
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Room|null $room */
        $room = $request->route('room');

        if (!$room instanceof Room) {
            abort(404);
        }

        $user = $request->user();

        if ($room->creator_id !== $user->id && $room->partner_id !== $user->id) {
            abort(403, 'Anda bukan peserta room ini.');
        }

        return $next($request);
    }
}
