<?php

use App\Jobs\DetermineWinnerJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');



Artisan::command('determine:winner', function () {
    dispatch(new DetermineWinnerJob());
})->purpose('Determine the winner based on highest points');

Schedule::command('determine:winner')
    ->everyMinute()
    ->name('determine_winner')
    ->withoutOverlapping();
