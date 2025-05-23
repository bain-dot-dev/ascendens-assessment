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
        Schema::create('tasks', function (Blueprint $table) {
             $table->uuid('id')->primary();
        $table->string('title');
        $table->text('description')->nullable();

        // Status enum field: pending, done, ongoing
        $table->enum('status', ['pending', 'done', 'ongoing'])->default('pending');

        $table->date('dueDate')->nullable();
        $table->uuid('user_id'); // foreign key if you're associating with users
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        $table->timestamps();

        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
