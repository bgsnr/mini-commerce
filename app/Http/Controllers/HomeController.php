<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    public function index()
    {
        // ambil kategori + 4 produk pertama per kategori
        $categories = Category::with(['products' => function($q) {
            $q->take(4);
        }])->get()->map(function ($category) {
            $category->products->map(function ($product) {
                // Tambahkan URL lengkap ke gambar
                $product->image_url = asset('images/' . $product->image);
                return $product;
            });
            return $category;
        });

        // ambil 5 produk best seller (sementara acak / paling banyak stock)
        $bestSeller = Product::orderBy('stock', 'desc')->take(5)->get()->map(function ($product) {
            $product->image_url = asset('images/' . $product->image);
            return $product;
        });

        return Inertia::render('home', [
            'categories' => $categories,
            'bestSeller' => $bestSeller,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->query('q', '');

        $products = Product::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%");
            })
            ->get()
            ->map(function ($product) {
                $product->image_url = asset('images/' . $product->image);
                return $product;
            });

        return Inertia::render('search', [
            'q' => $query,
            'products' => $products,
        ]);
    }

    // 'cartCount' => \App\Models\Cart::where('user_id', auth()->id())->count(),

}
