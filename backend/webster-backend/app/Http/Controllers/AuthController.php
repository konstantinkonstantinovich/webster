<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request) {
        if (!$token = auth()->attempt($request->all())) {
            $message = [
               "error" => 'Unauthorized',
               "message" => 'Login or password are incorrect'
            ];
            return response()->json($message, 401);
        }

        return $this->createNewToken($token);
    }

    public function register(Request $request) {
        // $validator = Validator::make($request->all(), [
        //     "login" => 'required|string',
        //     "email" => 'required|string|email|max:100|unique:users',
        //     "password" => 'required|string|confirmed|min:6'
        // ]);
        //
        // if($validator->fails()){
        //     return response()->json($validator->errors()->toJson(), 400);
        // }

        $user = new User();
        $user->login = $request["login"];
        $user->email = $request["email"];
        $user->password = bcrypt($request["password"]);
        $user->save();

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    protected function createNewToken($token){
      return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth()->factory()->getTTL() * 60,
        'user' => auth()->user()
      ]);
    }
}
