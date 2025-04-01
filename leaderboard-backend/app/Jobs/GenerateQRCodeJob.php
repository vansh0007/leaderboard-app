<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class GenerateQRCodeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
    public function handle(): void
    {
        try {
            $url = "https://api.qrserver.com/v1/create-qr-code/";
            $params = [
                'size' => '150x150',
                'data' => $this->user->address,
            ];

            $response = Http::get($url, $params);

            if ($response->successful()) {
                $filename = 'qrcodes/user_' . $this->user->id . '_' . now()->timestamp . '.png';

                // Ensure directory exists
                Storage::makeDirectory('public/qrcodes');

                // Save the image
                Storage::put('public/' . $filename, $response->body());

                // Update user record
                $this->user->update(['qr_code' => $filename]);
            } else {
                Log::error("QR Generation Failed for User {$this->user->id}", [
                    'status' => $response->status(),
                    'response' => $response->body()
                ]);
            }
        } catch (\Exception $e) {
            Log::error("QR Generation Exception for User {$this->user->id}: " . $e->getMessage());
        }
    }
}
