<?php

namespace App\Http\Controllers\Admin;

use App\Facades\DataTable;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filters = request()->query('filters', []);
        $sort = str_replace(
            ['name', 'is_active'],
            ['name', 'is_active'],
            request()->query('col')
        );
        $data = DataTable::query(User::query())
            ->allowedFilters(['name', 'is_active'])
            ->allowedSorts(['name', 'is_active'])
            ->searchable(['name', 'email'])
            ->applySort($sort)
            ->applyFilters($filters)
            ->make();

        $response = collect([
            'data' => $data->items(),
            'meta' => collect($data)->except('data'),
        ]);

        return Inertia::render('admin/users/index', [
            'data' => $response
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
