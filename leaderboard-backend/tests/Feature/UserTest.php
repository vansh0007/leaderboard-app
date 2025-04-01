<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_creation()
    {
        $response = $this->postJson('/api/users', [
            'name' => 'Test User',
            'age' => 25,
            'address' => '123 Test St'
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'name',
                'age',
                'address',
                'created_at',
                'updated_at'
            ])
            ->assertJson([
                'name' => 'Test User',
                'age' => 25,
                'address' => '123 Test St'
            ]);

        // Verify points in database
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'points' => 0
        ]);
    }

    public function test_points_update()
    {
        $user = User::factory()->create(['points' => 0]);

        $response = $this->patchJson("/api/users/{$user->id}/points", [
            'operation' => 'increment'
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('points', 1);
    }
}