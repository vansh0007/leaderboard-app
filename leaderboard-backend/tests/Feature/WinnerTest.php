<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Winner;
use App\Jobs\DetermineWinnerJob;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DetermineWinnerJobTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_winner_when_clear_leader()
    {
        $leader = User::factory()->create(['points' => 100]);
        User::factory()->create(['points' => 50]);

        (new DetermineWinnerJob())->handle();

        $this->assertDatabaseHas('winners', [
            'user_id' => $leader->id,
            'points' => 100
        ]);
    }

    public function test_no_winner_on_tie()
    {
        User::factory(2)->create(['points' => 100]);

        (new DetermineWinnerJob())->handle();

        $this->assertDatabaseCount('winners', 0);
    }
}