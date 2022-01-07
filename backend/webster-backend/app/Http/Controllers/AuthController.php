<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'registration']]);
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
          'login' => 'required|string|min:6',
          'email' => 'required|email',
          'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
             return response()->json($validator->errors(), 401);
        }
        if (!$token = auth()->attempt($validator->validated())) {
            $message = [
               'error' => "Unauthorized",
               'message' => 'Login or password are incorrect'
            ];
            return response()->json($message, 401);
        }

        return $this->createNewToken($token);
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
