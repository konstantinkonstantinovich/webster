<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function get_project(Request $request, $id) {
        $user = auth()->user();
        if($user){
            $project = Project::where('id', '=', intval($id))->first();
            return $project;
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_all_projects(Request $request) {
        $user = auth()->user();
        if($user){
            $projects = Project::all();
            return $projects;
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
