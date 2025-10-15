<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function show($id)
    {
        $category = Category::with('products')->find($id);

        if (!$category) {
            return Inertia::render('CategoryDetail', [
                'category' => [
                    'id' => null,
                    'name' => 'Kategori Tidak Ditemukan',
                ],
                'products' => [],
            ]);
        }

        $products = $category->products->map(function ($p) {
            return [
                'id' => $p->id,
                'name' => $p->name,
                'price' => $p->price,
                'image_url' => asset('images/' . $p->image),
            ];
        });

        return Inertia::render('CategoryDetail', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
            ],
            'products' => $products,
        ]);
    }
}
