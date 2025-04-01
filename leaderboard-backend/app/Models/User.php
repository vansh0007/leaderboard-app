<?php

// app/Models/User.php
namespace App\Models;

use App\Jobs\GenerateQRCodeJob;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class User extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'age', 'points', 'address', 'qr_code'];
    protected static function booted(): void
    {
        static::created(function ($user) {
            GenerateQRCodeJob::dispatchSync($user);
        });
    }

    public function winners(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Winner::class);
    }

    public function getQrCodeUrlAttribute(): ?string
    {
        return $this->qr_code ? Storage::url($this->qr_code) : null;
    }
}
