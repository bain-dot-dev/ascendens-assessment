<?php


use App\Http\Controllers\ProjectController;

// Route::apiResource('projects', ProjectController::class); 
Route::resource('projects', ProjectController::class);
Route::get('/projects', [ProjectController::class, 'index']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::put('/projects/{project}', [ProjectController::class, 'update']);
Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

