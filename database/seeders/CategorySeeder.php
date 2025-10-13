<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'makanan berat', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'cemilan', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'minuman', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
