<?php

namespace App\Http\Controllers;
use App\Models\Project;
use Illuminate\Http\Request;


class ProjectController extends Controller
{
    public function get_project(Request $request, $id) {
        $user = auth()->user();
        if($user){

            if($project = Project::find($id))
                return response()->json($project, 200);
                return response()->json(['error' => 'No information'], 400);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_user_projects(Request $request) {
        $user = auth()->user();
        if($user){
            return Project::where('user_id',$user->id)->paginate(10);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_all_projects(Request $request) {
        if(auth()->user()){
            return Project::where('public', true)->paginate(10);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function new_project(Request $request) {
        $user = auth()->user();

        if($user) {
            $project = new Project;
            $project->user_id = $user->id;
            $project->data = json_encode([]);
            if($request->public)
                $project->public = true;

            if($request->title)
                $project->title = $request->title;


            if($request["preview"]){
                $imageName = "progect_id_{$project->id}.".$request->preview->extension();
                $request->preview->move(public_path('storage/projects_preview'), $imageName);
                $path = 'storage/projects_preview/'.$imageName;
                $project->update(['preview' => $path]);
                $project->preview = asset($path);
            }
            
            $project->content = asset("storage/standart_project_background.png");
            $project->save();
            return response()->json(['project' =>Project::find($project->id),
            'redirect_to' => url("api/projects/{$project->id}")], 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }


    # TODO: fix saving if project id does not exist
    # (redirect user to this id fix this problem)
    public function save_project(Request $request, $id) {
        $user = auth()->user();

        if ($user) {
            if (!($project = $user->projects->find($id))){
                $project = new Project;
                $project->user_id = $user->id;
            }

            if (!$request->data || !$request->content)
                return response()->json(['error' => 'Could not data or content'], 400);

            $project->data = json_encode($request->data);

            if ($request->title)
                $project->title = $request->title;

            if ($request->public)
                $project->public = intval($request->public);

            $project->save();

            if ($request["preview"]){
                $imageName = "progect_id_{$project->id}.".$request->preview->extension();
                $request->preview->move(public_path('storage/projects_preview'), $imageName);
                $path = 'storage/projects_preview/'.$imageName;
                $project->update(['preview' => $path]);
                $project->preview = asset($path);
            }

            $background_image = "content_progect_id_{$project->id}.".$request->content->extension();
            $request->content->move(public_path('storage/projects_content'), $background_image);
            $path = 'storage/projects_content/'.$background_image;
            $project->update(['content' => $path]);
            $project->content = asset($path);

            $project->save();



            return response()->json(['project' =>Project::find($project->id),
            'redirect_to' => url("api/projects/{$project->id}")], 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
