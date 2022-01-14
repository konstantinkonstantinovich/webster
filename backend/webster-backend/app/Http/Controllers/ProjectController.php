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
            $projects = Project::where('user_id',$user->id);
            if ($request['search']) {
                $projects->where('title', 'Like', '%' . $request['search'] . '%');
            }
            return $projects->paginate(18);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_all_projects(Request $request) {
        if(auth()->user()){
            $projects = Project::where('public', true);
            if ($request['search']) {
                $projects->where('title', 'Like', '%' . $request['search'] . '%');
            }
            return $projects->paginate(18);
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

            $project->content = asset("storage/standart_project_background.png");
            $project->save();
            if($request["preview"]){
                $imageName = "progect_id_{$project->id}.".$request->preview->extension();
                $request->preview->move(public_path('storage/'), $imageName);
                $path = 'storage/'.$imageName;
                $project->update(['preview' => $path]);
                $project->preview = asset($path);
                $project->save();
            }
            
    
            
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
                $request->preview->move(public_path('storage/'), $imageName);
                $path = 'storage/'.$imageName;
                $project->update(['preview' => $path]);
                $project->preview = asset($path);
            }

            $background_image = "content_progect_id_{$project->id}.".$request->content->extension();
            $request->content->move(public_path('storage'), $background_image);
            $path = 'storage/'.$background_image;
            $project->update(['content' => $path]);
            $project->content = asset($path);

            $project->save();



            return response()->json(['project' =>Project::find($project->id),
            'redirect_to' => url("api/projects/{$project->id}")], 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
