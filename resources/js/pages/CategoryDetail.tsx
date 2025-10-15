import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import "../styles/CategoryDetail.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
};

type Category = {
  id: number;
  name: string;
};

type Props = {
  category: Category;
  products: Product[];
};

export default function CategoryDetail({ category, products }: Props) {
  return (
    <>
      <Head title={category.name} />
      <Navbar />

      <div className="category-detail">
        <h1>{category.name}</h1>

        <div className="product-grid">
          {products.length > 0 ? (
            products.map((p) => (
              <Link href={`/produk/${p.id}`} key={p.id} className="product-card">
                <img src={p.image_url} alt={p.name} className="product-image" />
                <div className="product-info">
                  <p>{p.name}</p>
                  <strong>Rp{Number(p.price).toLocaleString("id-ID")}</strong>
                </div>
              </Link>
            ))
          ) : (
            <p className="empty-msg">Belum ada produk di kategori ini.</p>
          )}
        </div>
      </div>
    </>
  );
}
