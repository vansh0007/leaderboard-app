<?php

namespace App\Http\Controllers;

use App\Models\Winner;

class WinnerController extends Controller
{
    public function index(): \Illuminate\Pagination\LengthAwarePaginator
    {
        return Winner::with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    public function stats(): \Illuminate\Database\Eloquent\Collection
    {
        return Winner::with('user:id,name')
            ->selectRaw('user_id, count(*) as wins, max(points) as highest_score')
            ->groupBy('user_id')
            ->orderBy('wins', 'desc')
            ->get();
    }
}
