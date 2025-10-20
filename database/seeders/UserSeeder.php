<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'User Satu',
                'email' => 'user1@kulineria.test',
                'password' => Hash::make('user123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'User Dua',
                'email' => 'user2@kulineria.test',
                'password' => Hash::make('user123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]
    );
    }
}
