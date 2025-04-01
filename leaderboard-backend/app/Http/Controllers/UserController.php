<?php

namespace App\Http\Controllers;

use App\Jobs\GenerateQRCodeJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()

    {
        \Log::info('GET /users request received');
        return User::orderBy('points', 'desc')->get();
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:1',
            'address' => 'required|string',
        ]);

        $user = User::create($validated);

        // Dispatch job to generate QR code
        GenerateQRCodeJob::dispatch($user);

        return response()->json($user, 201);
    }

    public function updatePoints(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $user = User::findOrFail($id);
        $operation = $request->input('operation');

        if ($operation === 'increment') {
            $user->increment('points');
        } elseif ($operation === 'decrement') {
            $user->decrement('points');
        }

        return response()->json($user);
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        $user = User::findOrFail($id);
        if ($user->qr_code) {
            Storage::delete('public/qrcodes/' . $user->qr_code);
        }
        $user->delete();

        return response()->json(null, 204);
    }

    public function groupedByScore(): \Illuminate\Http\JsonResponse
    {
        $groups = User::selectRaw('points, GROUP_CONCAT(name) as names, AVG(age) as average_age')
            ->groupBy('points')
            ->orderBy('points', 'desc')
            ->get()
            ->mapWithKeys(function ($item) {
                return [
                    $item->points => [
                        'names' => explode(',', $item->names),
                        'average_age' => (float) $item->average_age
                    ]
                ];
            });

        return response()->json($groups);
    }
}
