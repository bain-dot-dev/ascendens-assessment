<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('tasks', 'members')->get()->map(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'status' => $project->status,
                'tasks' => [
                    'completed' => $project->tasks->where('completed', true)->count(),
                    'total' => $project->tasks->count(),
                ],
                'members' => $project->members->map(fn ($m) => ['initials' => $m->initials])->toArray(),
                'due_date' => $project->due_date ? $project->due_date->toDateString() : null,
            ];
        });

        // Check if this is an AJAX request (from your frontend refresh calls)
        if (request()->expectsJson()) {
            return response()->json($projects);
        }

        // Return Inertia response for initial page load
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:Planning,In Progress,On Hold,Completed,Cancelled',
                'due_date' => 'required|date',
            ]);

            $project = Project::create([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'status' => $validated['status'],
                'due_date' => $validated['due_date'],
                'owner_id' => Auth::id(),
            ]);

            // Load relationships for consistent response
            $project->load('tasks', 'members');
            
            $formattedProject = [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'status' => $project->status,
                'tasks' => [
                    'completed' => $project->tasks->where('completed', true)->count(),
                    'total' => $project->tasks->count(),
                ],
                'members' => $project->members->map(fn ($m) => ['initials' => $m->initials])->toArray(),
                'due_date' => $project->due_date ? $project->due_date->toDateString() : null,
            ];

            return response()->json([
                'message' => 'Project created successfully',
                'project' => $formattedProject
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Project creation failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, Project $project)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:Planning,In Progress,On Hold,Completed,Cancelled',
                'due_date' => 'required|date',
            ]);

            $project->update([
                'name' => $validated['name'],
                'description' => $validated['description'] ?? '',
                'status' => $validated['status'],
                'due_date' => $validated['due_date'],
                'owner_id' => Auth::id(),
            ]);

            // Load relationships for consistent response
            $project->load('tasks', 'members');
            
            $formattedProject = [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'status' => $project->status,
                'tasks' => [
                    'completed' => $project->tasks->where('completed', true)->count(),
                    'total' => $project->tasks->count(),
                ],
                'members' => $project->members->map(fn ($m) => ['initials' => $m->initials])->toArray(),
                'due_date' => $project->due_date ? $project->due_date->toDateString() : null,
            ];

            return response()->json([
                'message' => 'Project updated successfully',
                'project' => $formattedProject
            ]);
        } catch (\Exception $e) {
            \Log::error('Project update failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Project $project)
    {
        try {
            $project->delete();
            return response()->json(['message' => 'Project deleted successfully']);
        } catch (\Exception $e) {
            \Log::error('Project deletion failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(Project $project)
    {
        $project->load('tasks', 'members');
        
        $formattedProject = [
            'id' => $project->id,
            'name' => $project->name,
            'description' => $project->description,
            'status' => $project->status,
            'tasks' => [
                'completed' => $project->tasks->where('completed', true)->count(),
                'total' => $project->tasks->count(),
            ],
            'members' => $project->members->map(fn ($m) => ['initials' => $m->initials])->toArray(),
            'due_date' => $project->due_date ? $project->due_date->toDateString() : null,
        ];

        return response()->json($formattedProject);
    }
}