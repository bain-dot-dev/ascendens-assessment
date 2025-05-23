<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(){
        return inertia::render('Projects/Index', []);
    }

    public function create(){
        return inertia::render('Projects/Create', []);
    }
}
