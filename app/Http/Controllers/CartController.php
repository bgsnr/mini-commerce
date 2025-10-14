<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login');
        }

        $cartItems = Cart::with('product')->where('user_id', $userId)->get();
        $cartItems->each(function ($item) {
            $item->product->append('image_url');
        });

        $subtotal = $cartItems->sum(fn($item) => ($item->product ? $item->product->price * $item->quantity : 0));
        $delivery = 7000;
        $total = $subtotal + $delivery;

        return Inertia::render('cart', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'delivery' => $delivery,
            'total' => $total,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|not_in:0',
        ]);

        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login');
        }

        $product = Product::find($request->product_id);
        if (!$product) {
            return redirect()->back()->withErrors(['msg' => 'Produk tidak ditemukan']);
        }

        $addQty = (int) $request->quantity;

        // Cek stok tersedia
        if ($product->stock < $addQty) {
            return redirect()->back()->withErrors([
                'quantity' => 'Stok produk tidak mencukupi. Tersisa ' . $product->stock . ' item.'
            ]);
        }

        // Ambil item keranjang jika sudah ada
        $cart = Cart::where('user_id', $userId)
            ->where('product_id', $product->id)
            ->first();

        if ($cart) {
            $cart->quantity += $addQty;
            $cart->save();
        } else {
            Cart::create([
                'user_id' => $userId,
                'product_id' => $product->id,
                'quantity' => $addQty,
            ]);
        }

        // **Tidak mengurangi stok di sini** karena stok hanya berkurang saat pesanan dibuat

        return redirect()->back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    public function update(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login');
        }

        $product = Product::find($request->product_id);
        if (!$product) {
            return redirect()->back()->withErrors(['msg' => 'Produk tidak ditemukan']);
        }

        // Cek stok
        if ($request->quantity > $product->stock) {
            return redirect()->back()->withErrors([
                'quantity' => 'Stok produk tidak mencukupi. Maksimal ' . $product->stock . ' item.'
            ]);
        }

        Cart::updateOrCreate(
            ['user_id' => $userId, 'product_id' => $product->id],
            ['quantity' => $request->quantity]
        );

        return redirect()->back(303);
    }

    public function remove($id)
    {
        $userId = Auth::id();
        if (!$userId) {
            return redirect()->route('login');
        }

        $deleted = Cart::where('id', $id)
            ->where('user_id', $userId)
            ->delete();

        if (!$deleted) {
            return redirect()->back()->withErrors(['msg' => 'Item tidak ditemukan atau bukan milik Anda']);
        }

        return redirect()->back()->with('success', 'Item berhasil dihapus dari keranjang');
    }
}
