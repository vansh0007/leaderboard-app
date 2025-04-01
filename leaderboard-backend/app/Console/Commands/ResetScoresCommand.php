<?php
namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ResetScoresCommand extends Command
{
    protected $signature = 'leaderboard:reset-scores';
    protected $description = 'Reset all user scores to 0';

    public function handle()
    {
        User::query()->update(['points' => 0]);
        $this->info('All user scores have been reset to 0.');
        return 0;
    }
}
