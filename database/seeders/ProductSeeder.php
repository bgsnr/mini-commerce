<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Ayam Geprek Spesial',
                'price' => 26000,
                'stock' => 10,
                'category_id' => 1,
                'image' => 'ayam_geprek_spesial.jpg',
                'description' => '- Paket ayam geprek spesial dengan sambal bawang khas. 
- Dapat free es teh manis.
- Tuliskan level pedas di keterangan pesanan (jika tidak menulis, akan diberi level 1).
- Pilih bagian ayam di keterangan pesanan (jika tidak menulis, akan diberi random).
- Sebaiknya segera dikonsumsi maksimal 5 jam setelah checkout.
- Pesanan lebih dari 10 item akan membutuhkan waktu lebih lama, mohon bersabar.',
                'is_active' => true,
                'created_at' => now(),
            ],
            [
                'name' => 'Ayam Geprek Sambal Matah',
                'price' => 18000,
                'stock' => 12,
                'category_id' => 1,
                'image' => 'ayam_geprek_matah.jpg',
                'description' => '- Ayam geprek dengan sambal matah khas Bali yang segar dan pedas.
- Dapat free es teh manis.
- Tuliskan level pedas di keterangan pesanan (jika tidak menulis, akan diberi level 1).
- Tuliskan bagian ayam di keterangan pesanan (jika tidak menulis, akan diberi random).
- Sebaiknya segera dikonsumsi maksimal 5 jam setelah checkout.
- Pesanan lebih dari 10 item akan membutuhkan waktu lebih lama, mohon bersabar.',
                'is_active' => true,
                'created_at' => now(),
            ],
            [
                'name' => 'Es Kuwut',
                'price' => 7000,
                'stock' => 20,
                'category_id' => 3,
                'image' => 'es_kuwut.jpg',
                'description' => '- Minuman segar berbahan dasar kelapa, melon, dan selasih.
- Dihidangkan dingin, sangat cocok diminum setelah makan pedas.
- Tidak disarankan untuk dikirim jarak jauh.
- Sebaiknya dikonsumsi segera setelah diterima.',
                'is_active' => true,
                'created_at' => now(),
            ],
            [
                'name' => 'Mendoan',
                'price' => 1000,
                'stock' => 15,
                'category_id' => 2,
                'image' => 'mendoan.jpg',
                'description' => '- Tempe goreng setengah matang khas Banyumas yang gurih dan lembut.
- Disajikan hangat lebih nikmat.
- Dapat tambahan sambal kecap khas geprek house.
- Sebaiknya segera dikonsumsi maksimal 4 jam setelah checkout.',
                'is_active' => true,
                'created_at' => now(),
            ],
        ]);
    }
}
