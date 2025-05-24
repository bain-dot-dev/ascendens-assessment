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
        $table->enum('status', ['In Progress', 'Completed', 'To Do', 'In Review', 'Cancelled'])->default('To Do');
        $table->enum('Priority', ['Low', 'Medium', 'High', 'Urgent'])->default('Medium');
        $table->date('dueDate');
        $table->uuid('project_id');
        $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        $table->uuid('assignee_id'); // foreign key if you're associating with users
        $table->foreign('assignee_id')->references('id')->on('users')->onDelete('cascade');
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
