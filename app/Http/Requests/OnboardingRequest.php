<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OnboardingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $this->user()->id],
            'bio' => ['nullable', 'string', 'max:500'],
            'skill_tags' => ['nullable', 'array', 'max:5'],
            'skill_tags.*' => ['string', 'max:50'],
        ];
    }
}
