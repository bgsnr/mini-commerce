<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        // 1. Ambil query 'search' dari request. Jika tidak ada, default-nya string kosong.
        $searchQuery = $request->query('search', '');

        // 2. Query ke database produk
        $products = Product::query()
            // Eager load relasi kategori agar tidak terjadi N+1 problem
            ->with('category')
            // Terapkan filter HANYA JIKA ada query pencarian
            ->when($searchQuery, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                             ->orWhereHas('category', function ($q) use ($search) {
                                 $q->where('name', 'like', "%{$search}%");
                             });
            })
            // Ambil produk yang aktif saja
            ->where('is_active', true)
            // Urutkan berdasarkan yang terbaru
            ->latest()
            // Paginasi hasil agar tidak berat saat data banyak
            ->paginate(12)
            // Append query string agar filter tetap ada saat pindah halaman paginasi
            ->withQueryString();

        // 3. Kembalikan data ke komponen React via Inertia
        return Inertia::render('Products/Index', [
            'products' => $products,
            // Kirim juga query pencarian kembali ke frontend
            // agar bisa ditampilkan di input search
            'filters' => ['search' => $searchQuery],
        ]);
    }
    
    public function show($id)
    {
        $product = \App\Models\Product::findOrFail($id);

        return \Inertia\Inertia::render('productDetail', [
            'product' => $product
        ]);
    }
}