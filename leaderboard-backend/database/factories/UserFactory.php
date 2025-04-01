<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'age' => $this->faker->numberBetween(10, 80),
            'points' => $this->faker->numberBetween(0, 100),
            'address' => $this->faker->address,
            'qr_code' => 'qrcodes/qr_' . Str::random(10) . '.png',
        ];
    }
}
