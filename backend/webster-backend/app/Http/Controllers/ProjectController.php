<?php

namespace App\Http\Controllers;
use App\Models\Project;
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
            return $user->projects->paginate(10);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_all_projects(Request $request) {
        if(auth()->user()){
            return Projects::where('public', true)->paginate(20);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    # TODO: fix saving if project id does not exist
    # (redirect user to this id fix this problem)
    public function save_project(Request $request, $id) {
        $user = auth()->user();

        if($user) {
            if(!($project = $user->projects->find($id))){
                $project = new Project;
                $project->user_id = $user->id;
            }


            $project->data = json_encode($request->data);
            if($request->public)
                $project->public = intval($request->public);
           
            if($request["preview"]){
                $imageName = 'progect_id_'.$project->id.'.'.$request->preview->extension();
                $request->preview->move(public_path('storage/projects_preview'), $imageName);
                $path = 'storage/projects_preview/'.$imageName;
                $project->update(['preview' => $path]);
                $project->preview = asset($path);
            }
            $project->save();
            return response()->json(Project::find($project->id), 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
