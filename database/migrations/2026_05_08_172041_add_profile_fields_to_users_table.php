<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('learner'); // learner, teacher
            $table->string('username')->unique()->nullable();
            $table->text('bio')->nullable();
            $table->json('skill_tags')->nullable();
            $table->string('avatar_color')->nullable();
            $table->integer('exp')->default(0);
            $table->integer('level')->default(1);
            $table->integer('streak')->default(0);
            $table->boolean('is_onboarded')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'role',
                'username',
                'bio',
                'skill_tags',
                'avatar_color',
                'exp',
                'level',
                'streak',
                'is_onboarded'
            ]);
        });
    }
};
