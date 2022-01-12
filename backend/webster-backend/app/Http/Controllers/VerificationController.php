<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Mail;
use Tymon\JWTAuth\Exceptions\JWTException;

class VerificationController extends Controller
{
    public function verify(Request $request, $token) {
      $user = User::where('remember_token', '=', $token)->first();
      if ($user) {
          $user->email_verified_at = date('Y-m-d H:i:s');
          $user->save();
          Mail::send('success', ['email'=> $user->email], function ($m) use ($user) {
              $m->subject('Success verification!');
              $m->to($user->email);
          });
          $response = [
              'user' => $user,
              'success'=> 'Your email was successfully verify!',
              'token' => JWTAuth::fromUser($user)
          ];
          return response()->json($response, 200);
      }
      return response()->json(['error' => 'Unauthorized'], 401);
    }
}
