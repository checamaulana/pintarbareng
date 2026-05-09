<?php

use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\OnboardingController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store']);

    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

    Route::get('onboarding/role', [OnboardingController::class, 'role'])->name('onboarding.role');
    Route::post('onboarding/role', [OnboardingController::class, 'storeRole']);

    Route::get('onboarding/setup', [OnboardingController::class, 'setup'])->name('onboarding.setup');
    Route::post('onboarding/setup', [OnboardingController::class, 'storeSetup']);

    Route::middleware('onboarded')->group(function () {
        Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

        // Rooms
        Route::get('/rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('/rooms/create', [RoomController::class, 'create'])->name('rooms.create');
        Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('/rooms/{room}', [RoomController::class, 'show'])->name('rooms.show');
        Route::post('/rooms/{room}/join', [RoomController::class, 'join'])->name('rooms.join');
        Route::post('/rooms/{room}/cancel', [RoomController::class, 'cancel'])->name('rooms.cancel');
    });
});
