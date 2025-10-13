import React, { useState, useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import "../styles/Cart.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  image_url: string;
};

type CartItem = {
  id: number;
  product_id: number;
  quantity: number;
  product: Product;
};

type CartProps = {
  cartItems: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
};

export default function Cart({ cartItems, subtotal, delivery, total }: CartProps) {
  const [localCartItems, setLocalCartItems] = useState(cartItems);

  const { setData, post, delete: destroy, errors } = useForm({
    product_id: 0,
    quantity: 0,
  });

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);


  useEffect(() => {
    if (errors.quantity) {
      alert(errors.quantity);
    }
  }, [errors]);

  const handleRemove = (id: number) => {
    destroy(`/cart/${id}`);
  };

  const handleQuantityChange = (item: CartItem, type: "plus" | "minus") => {
    const newQuantity =
      type === "plus" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    if (newQuantity === item.quantity) return;

    // Update UI langsung
    setLocalCartItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
    );

    setData({
      product_id: item.product_id,
      quantity: newQuantity,
    });

    post("/cart/update", {
      preserveScroll: true,
      preserveState: true,
      onError: () => {
        // Kembalikan ke semula kalau gagal
        setLocalCartItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, quantity: item.quantity } : i))
        );
      },
    });
  };

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h2>keranjang belanja</h2>

        {localCartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Keranjangmu masih kosong</p>
            <Link href="/" className="back-link">
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-table">
              <div className="cart-header">
                <span>product</span>
                <span>harga</span>
                <span>jumlah</span>
                <span></span>
              </div>

              {localCartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="product-info">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="product-image object-cover"
                    />
                    <span className="product-name">{item.product.name}</span>
                  </div>

                  <div className="product-price">
                    Rp {item.product.price.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item, "minus")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, "plus")}>+</button>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="remove-btn"
                  >
                    hapus item
                  </button>
                </div>
              ))}
            </div>
                      
            <div className="cart-summary">
              <div className="summary-item">
                <span>subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="summary-item">
                <span>delivery</span>
                <span>Rp {delivery.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="summary-item total">
                <span>total</span>
                <span>Rp {total.toLocaleString("id-ID", { maximumFractionDigits: 0 })}</span>
              </div>

              <Link href="/checkout" className="checkout-btn">
                checkout
              </Link>
            </div>
                      
          </>
        )}
      </div>
    </div>
  );
}