<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('badges', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('description');
            $table->string('icon');         // emoji atau teks ikon
            $table->string('condition_type'); // sessions, streak, exp, feedback, special
            $table->unsignedInteger('condition_value')->default(0);
            $table->string('tier');         // bronze, silver, gold
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('badges');
    }
};
