<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
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
    Route::get('/progects', [ProjectController::class, 'get_all_projects']);
    Route::get('/progects/{id}', [ProjectController::class, 'get_project']);
    Route::get('/user/progects', [ProjectController::class, 'get_user_projects']);
    Route::post('/progects/{id}/save', [ProjectController::class, 'save_project']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'

], function ($router) {
    Route::get('/profile', [UserController::class, 'user_profile']);
    Route::get('/profile/{user_id}', [UserController::class, 'user_profile']);
    Route::post('/update', [UserController::class, 'user_update']);

    Route::get('/avatar/{user_id}', [UserController::class, 'get_avatar']);
    Route::post('/forgot_password', [UserController::class, 'forgot_password']);
    Route::post('/reset_password_link/{token}', [UserController::class, 'reset_password']);
});
