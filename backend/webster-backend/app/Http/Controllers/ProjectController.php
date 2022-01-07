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

    public function get_user_projects(Request $request) {
        $user = auth()->user();
        if($user){
            return $user->projects();
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_all_projects(Request $request) {
        if(auth()->user()){
            return Projects::paginate(20);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
