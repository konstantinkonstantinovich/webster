<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Mail;

class VerificationController extends Controller
{
    public function verify(Request $request, $token) {
      $user = User::where('remember_token', '=', $token)->first();
      if ($user) {
          $user->update(['email_verified_at' => date('Y-m-d H:i:s')]);
          return response()->json(['user' => $user, 'success'=> 'Your email was successfully verify!'], 302);
      }
      return response()->json(['error' => 'Unauthorized'], 401)
    }
}
