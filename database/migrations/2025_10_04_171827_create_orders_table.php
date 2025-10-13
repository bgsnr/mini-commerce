<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Kolom Total dan Status (sudah bagus)
            $table->decimal('total', 10, 2);
            $table->enum('status', ['pending','diproses','dikirim','selesai','batal'])->default('pending');
            
            // === KOLOM BARU YANG DISARANKAN ===
            $table->string('recipient_name'); // Untuk 'nama lengkap'
            $table->string('recipient_phone'); // Untuk 'kontak'
            $table->text('address_line_1'); // Untuk 'alamat lengkap'
            $table->text('address_line_2')->nullable(); // Untuk 'alamat detail' (opsional)
            $table->string('postal_code'); // Untuk 'kode pos'
            $table->text('notes')->nullable(); // Untuk 'keterangan' (opsional)
            $table->string('payment_method'); // Untuk 'Pembayaran'
            $table->decimal('shipping_cost', 10, 2)->default(0); // Biaya Pengiriman
            $table->decimal('subtotal', 10, 2); // Subtotal sebelum ongkir/pajak
        
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
