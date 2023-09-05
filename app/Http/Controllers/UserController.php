<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return User::all();
        return Auth::user();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return User::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function get_user(Request $req){
        try {
            $users = User::get();
            return $users;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function register_insert(Request $req){
        // return $req;
        try {
            $user = new User;
            $user->name = strtoupper($req->name);
            $user->username = strtoupper($req->username);
            $user->password = Hash::make($req->password);
            $user->save();
            return 'success';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
        
    }
    public function register_update(Request $req){
        // return $req;
        try {
            $user = User::find($req->id);
            $user->name = strtoupper($req->name);
            $user->username = strtoupper($req->username);
            $user->password = Hash::make($req->password);
            $user->save();
            return 'success';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function register_delete(Request $req){
        // return $req;
        try {
            $user = User::find($req->id);
            $user->delete();
            return 'success';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
