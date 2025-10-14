<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function show()
    {
        $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index');
        }

        $subtotal = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);
        $delivery = 7000;
        $total = $subtotal + $delivery;

        return Inertia::render('checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
            'delivery' => $delivery,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'recipient_name' => 'required|string|max:255',
            'recipient_phone' => 'required|string|max:20',
            'address_line_1' => 'required|string',
            'address_line_2' => 'nullable|string',
            'postal_code' => 'required|string|max:10',
            'notes' => 'nullable|string',
            'payment_method' => 'required|string',
        ]);

        $cartItems = Cart::with('product')->where('user_id', Auth::id())->get();
        if ($cartItems->isEmpty()) {
            return redirect()->route('home')->withErrors('Keranjang Anda kosong.');
        }

        $subtotal = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);
        $delivery = 7000;
        $total = $subtotal + $delivery;

        DB::transaction(function () use ($validated, $cartItems, $subtotal, $delivery, $total) {
            $order = Order::create(array_merge($validated, [
                'user_id' => Auth::id(),
                'subtotal' => $subtotal,
                'shipping_cost' => $delivery,
                'total' => $total,
            ]));

            foreach ($cartItems as $item) {
                $product = $item->product;

                // Kurangi stok saat pesanan dibuat
                if ($product->stock >= $item->quantity) {
                    $product->stock -= $item->quantity;
                    $product->save();
                } else {
                    throw new \Exception("Stok produk {$product->name} tidak cukup.");
                }

                $order->items()->create([
                    'product_id' => $item->product_id,
                    'qty' => $item->quantity,
                    'price' => $product->price,
                ]);
            }

            Cart::where('user_id', Auth::id())->delete();
        });

        return redirect()->route('home')->with('success', 'Pesanan berhasil dibuat!');
    }
}
