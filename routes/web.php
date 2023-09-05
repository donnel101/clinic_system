<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

require __DIR__.'/auth.php';


Route::middleware(['auth'])->group(function() {
    /*  
    |
    | Some Routes needed to be before the route with "{any?}" parameter.
    | So that it will be found first, after entering the route.
    | if route is found before the "{any?}" it will be initiate and the interpreter wont continue to next line of code.
    */

    Route::get('/auth-user', [AuthenticatedSessionController::class, 'show']);
    Route::get('/get_user', [UserController::class, 'index'] );

    Route::post('/register_insert', [UserController::class, 'register_insert']);
    Route::post('/register_update', [UserController::class, 'register_update']);
    Route::post('/register_delete', [UserController::class, 'register_delete']);
    
    Route::get('/{any?}', [SpaController::class, 'index'])->where('any', '.*');
});
