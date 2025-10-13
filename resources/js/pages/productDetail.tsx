// resources/js/pages/product-detail.tsx
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import "../styles/ProductDetail.css";
import Swal from "sweetalert2";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  description: string;
};

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      Toast.fire({
        icon: "warning",
        title: `Stok produk hanya ${product.stock} item.`,
      });
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (product.stock <= 0) {
      Toast.fire({
        icon: "error",
        title: "Produk ini sedang habis stoknya.",
      });
      return;
    }

    if (quantity > product.stock) {
      Toast.fire({
        icon: "warning",
        title: `Jumlah melebihi stok. Maksimal ${product.stock}.`,
      });
      setQuantity(product.stock);
      return;
    }

    setSubmitting(true);

    router.post(
      "/cart/add",
      {
        product_id: product.id,
        quantity,
      },
      {
        onSuccess: () => {
          setSubmitting(false);
          Toast.fire({
            icon: "success",
            title: `${product.name} berhasil ditambahkan ke keranjang 🛒`,
          });
          router.reload();
        },
        onError: (errors) => {
          setSubmitting(false);
          Toast.fire({
            icon: "error",
            title: "Terjadi kesalahan saat menambahkan produk.",
          });
          console.error("Add to cart error:", errors);
        },
      }
    );
  };

  return (
    <div className="product-detail-page">
      <Navbar />

      <div className="product-detail-container">
        <div className="product-image-wrapper">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-detail-image"
          />
        </div>

        <div className="product-info-wrapper">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">
            Rp{Number(product.price).toLocaleString("id-ID")}
          </p>

          <p className="product-stock">
            Stok tersedia:{" "}
            <strong style={{ color: product.stock > 0 ? "green" : "red" }}>
              {product.stock > 0 ? product.stock : "Habis"}
            </strong>
          </p>

          <div className="quantity-box">
            <button onClick={decreaseQty} disabled={quantity <= 1 || submitting}>
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={increaseQty}
              disabled={quantity >= product.stock || submitting}
            >
              +
            </button>

            <button
              className="add-to-cart"
              onClick={addToCart}
              disabled={product.stock === 0 || submitting}
            >
              {submitting
                ? "Memproses..."
                : product.stock === 0
                ? "Stok Habis"
                : "Masukkan Keranjang"}
            </button>
          </div>

          <div className="product-description">
            <h3>Deskripsi</h3>
            <p style={{ whiteSpace: "pre-line" }}>{product.description}</p>
          </div>

          <Link href="/" className="back-btn">
            ← Kembali
          </Link>
        </div>
      </div>
    </div>
  );
}
