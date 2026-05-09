<?php

namespace App\Http\Controllers;

use App\Http\Requests\OnboardingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;

class OnboardingController extends Controller
{
    public function role(): Response
    {
        return Inertia::render('Onboarding/Role');
    }

    public function storeRole(Request $request): RedirectResponse
    {
        $request->validate([
            'role' => ['required', Rule::enum(UserRole::class)],
        ]);

        $request->user()->update([
            'role' => $request->role,
        ]);

        return redirect()->route('onboarding.setup');
    }

    public function setup(): Response
    {
        return Inertia::render('Onboarding/Setup');
    }

    public function storeSetup(OnboardingRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        $user->update([
            'username' => $request->username,
            'bio' => $request->bio,
            'skill_tags' => json_encode($request->skill_tags ?? []),
            'is_onboarded' => true,
            'avatar_color' => $this->generateRandomColor(),
        ]);

        return redirect()->route('dashboard');
    }

    private function generateRandomColor(): string
    {
        $colors = ['red', 'blue', 'green', 'yellow', 'purple', 'indigo', 'pink', 'orange'];
        return $colors[array_rand($colors)];
    }
}
