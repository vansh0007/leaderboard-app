<?php
namespace App\Jobs;

use App\Models\User;
use App\Models\Winner;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DetermineWinnerJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        Log::info('DetermineWinnerJob started at '.now());

        try {
            $topUsers = User::withCount('winners')
                ->orderBy('points', 'desc')
                ->take(2)
                ->get();

            Log::debug('Top users:', $topUsers->toArray());

            if ($topUsers->isEmpty()) {
                Log::warning('No users found to determine winner');
                return;
            }

            // Only declare winner if there's a clear leader
            if ($topUsers->count() === 1 || $topUsers[0]->points > $topUsers[1]->points) {
                $winner = Winner::create([
                    'user_id' => $topUsers[0]->id,
                    'points' => $topUsers[0]->points
                ]);

                Log::info('New winner declared:', $winner->toArray());
            } else {
                Log::info('No winner declared - tie detected between:', [
                    $topUsers[0]->only(['id', 'name', 'points']),
                    $topUsers[1]->only(['id', 'name', 'points'])
                ]);
            }
        } catch (\Exception $e) {
            Log::error('DetermineWinnerJob failed: '.$e->getMessage());
            throw $e; // Will mark job as failed
        }
    }
}
