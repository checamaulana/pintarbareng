<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoomRequest;
use App\Models\Room;
use App\Services\RoomService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RoomController extends Controller
{
    public function __construct(private RoomService $roomService) {}

    public function index(Request $request): Response
    {
        $filters = [
            'category' => $request->get('category'),
            'search'   => $request->get('search'),
        ];

        $rooms = $this->roomService->getAvailableRooms($filters);

        return Inertia::render('Rooms/Index', [
            'rooms'   => $rooms,
            'filters' => $filters,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Rooms/Create');
    }

    public function store(CreateRoomRequest $request): RedirectResponse
    {
        $room = $this->roomService->create($request->user(), $request->validated());

        return redirect()->route('rooms.show', $room)
            ->with('success', 'Room berhasil dibuat! Menunggu partner...');
    }

    public function show(Room $room): Response
    {
        $room->load(['creator', 'partner']);

        return Inertia::render('Rooms/Show', [
            'room' => $room,
        ]);
    }

    public function join(Request $request, Room $room): RedirectResponse
    {
        try {
            $this->roomService->join($request->user(), $room);
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('rooms.show', $room)
            ->with('success', 'Berhasil join room!');
    }

    public function cancel(Request $request, Room $room): RedirectResponse
    {
        try {
            $this->roomService->cancel($request->user(), $room);
        } catch (\RuntimeException $e) {
            return back()->with('error', $e->getMessage());
        }

        return redirect()->route('rooms.index')
            ->with('success', 'Room berhasil dibatalkan.');
    }
}
