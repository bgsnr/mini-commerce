<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            $table->decimal('total', 10, 2);
            $table->enum('status', ['pending','diproses','dikirim','selesai','batal'])->default('pending');
            $table->string('recipient_name');
            $table->string('recipient_phone');
            $table->text('address_line_1');
            $table->text('address_line_2')->nullable();
            $table->string('postal_code');
            $table->text('notes')->nullable();
            $table->string('payment_method');
            $table->decimal('shipping_cost', 10, 2)->default(0);
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('orders');
    }
};
