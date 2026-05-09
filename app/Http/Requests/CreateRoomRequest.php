<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
            'category'    => ['required', 'string', 'in:pemrograman,matematika,bahasa,sains,desain,bisnis,musik,lainnya'],
            'tags'        => ['nullable', 'array', 'max:5'],
            'tags.*'      => ['string', 'max:30'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required'    => 'Judul room wajib diisi.',
            'title.max'         => 'Judul room maksimal 100 karakter.',
            'category.required' => 'Pilih kategori room.',
            'category.in'       => 'Kategori tidak valid.',
            'description.max'   => 'Deskripsi maksimal 500 karakter.',
            'tags.max'          => 'Maksimal 5 tag.',
            'tags.*.max'        => 'Setiap tag maksimal 30 karakter.',
        ];
    }
}
