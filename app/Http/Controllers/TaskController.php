<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(){
        return inertia::render('Tasks/Index', []);
    }

    public function create(){
        return inertia::render('Tasks/Create', []);
    }
}
