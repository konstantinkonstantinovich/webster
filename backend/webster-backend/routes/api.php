<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GoogleController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/registration', [AuthController::class, 'register']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getAuthenticatedUser']);
});

Route::group([
    'middleware' => 'api'

], function ($router) {
    Route::get('/projects/{id}', [ProjectController::class, 'get_project']);
    Route::get('/projects', [ProjectController::class, 'get_all_projects']);
    Route::get('/user/projects', [ProjectController::class, 'get_user_projects']);
    Route::post('/projects/{id}/save', [ProjectController::class, 'save_project']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'

], function ($router) {
    Route::get('/delete', [UserController::class, 'user_delete']);
    Route::get('/profile', [UserController::class, 'user_profile']);
    Route::get('/profile/{user_id}', [UserController::class, 'user_profile']);
    Route::post('/update', [UserController::class, 'user_update']);
    Route::post('/forgot_password', [UserController::class, 'forgot_password']);
    Route::post('/reset_password_link/{token}', [UserController::class, 'reset_password']);
});

Route::group([
    'middleware' => ['web'],
    'prefix' => 'google',
    'name' => 'google.'
],function(){
    Route::get('login', [GoogleController::class, 'login_with_google'])->name('login');
    Route::any('callback', [GoogleController::class, 'callback_from_google'])->name('callback');
});
