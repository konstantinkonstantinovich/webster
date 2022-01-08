<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use  Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function user_update(Request $request) {
        $user = auth()->user();

        if($user) {
            $user->update([
                'login'=>$request->login,
                'full_name'=>$request->full_name,
            ]);
            if($request["avatar"]){
                $imageName = auth()->user()->getKey().'name.'.$request->avatar->extension();
                $request->avatar->move(public_path('storage/images'), $imageName);
                $path = 'storage/images/'.$imageName;
                auth()->user()->update(['avatar' => $path]);
                $user->avatar = asset($path);
            }

            return response()->json($user, 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function get_avatar(Request $request, $user_id) {
        if(auth()->user()) {
            $find_user = User::find($user_id);
            if($find_user && $find_user->avatar){
                return asset($find_user->avatar);
            }
            return response()->json(['error' => 'No information'], 400);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function forgot_password(Request $request){
      $user = User::where('email', '=', $request->only(['email']))->first();
      $token = Str::random(20);
      $user->remember_token = $token;
      $user->save();
      Mail::send('reset', ['token' => $token], function ($m) use ($user) {
          $m->subject('Reset password!');
          $m->to($user->email);
      });
      return response()->json(['Success' => 'Token was sended to your email!'], 200);
    }

    public function reset_password(Request $request, $token){
        $user = User::where('remember_token', '=', $token)->first();
        $user->update([
            'remember_token' => NULL,
            'password' => Hash::make($request->all()['password'])
        ]);
        return response()->json(['Success' => 'Password was reset!'], 200);
    }

    public function user_profile(Request $request, $user_id = null) {
        if(!$user_id && !(auth()->user()))
            return response()->json(['error' => 'No information'], 400);

        if(!$user_id) {
            $user = auth()->user();
        }
        else{
            $user = User::find($user_id);
        }
        $user->avatar = asset($user->avatar);

        return response()->json($user, 200);
    }
}
