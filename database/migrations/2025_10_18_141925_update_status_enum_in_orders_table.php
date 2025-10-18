<?php

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
        Schema::table('orders', function (Blueprint $table) {
            // Perbarui kolom 'status' untuk menambahkan nilai baru
            $table->enum('status', [
                'pending', 
                'processing', // Nilai baru
                'shipped',    // Nilai baru
                'completed', 
                'cancelled'
            ])->default('pending')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Kembalikan ke definisi lama jika migrasi di-rollback
            $table->enum('status', [
                'pending', 
                'completed', 
                'cancelled'
            ])->default('pending')->change();
        });
    }
};