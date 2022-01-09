<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Mail;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator;

class AuthController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request) {

        if (auth()->user()) {
            return response()->json(auth()->user(), 200);
        }
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $token = auth()->attempt($validator->validated());
        if (!$token) {
            $message = [
               "error" => 'Unauthorized',
               "message" => 'Login or password are incorrect'
            ];
            return response()->json($message, 401);
        }

        return response()->json($this->createNewToken($token));
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            "login" => 'required|string',
            "email" => 'required|string|email|max:100|unique:users',
            "password" => 'required|string|confirmed|min:6'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User();
        $user->login = $request->login;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        $path = route('verify_email', ['token' => Str::random(20)]);
        $data = [
          'email' => $user->email,
          'path' => $path
        ];

        Mail::send('mail', $data, function ($m) use ($user) {
            $m->subject('Varify mail!');
            $m->to($user->email);
        });

        return response()->json(
          [
            // 'token' => $this->createNewToken(JWTAuth::fromUser($user)),
            'route' => route('verify_email', ['token' => Str::random(20)])
          ],201
        );
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }


    protected function createNewToken($token) {
      return [
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth()->factory()->getTTL() * 60,
        'user' => auth()->user()
      ];
    }

    public function getAuthenticatedUser() {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }
}
