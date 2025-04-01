<?php

use App\Jobs\GenerateQRCodeJob;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $users = User::whereNull('qr_code')->get();

        foreach ($users as $user) {
            GenerateQRCodeJob::dispatch($user);
        }
    }
};
