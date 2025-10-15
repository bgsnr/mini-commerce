import React from "react";
import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import "../styles/Home.css";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  image_url: string;
  category_id?: number;
};

type Category = {
  id: number;
  name: string;
  products: Product[];
};

type Props = {
  categories: Category[];
  bestSeller: Product[];
};

export default function Home({ categories, bestSeller }: Props) {
  return (
    
    <div>
      <Navbar />
      <Banner products={bestSeller} />

      <section className="hero">
        <h1>
          TEMUKAN MAKANAN MURAH <br /> SESUAI SELERAMU
        </h1>
      </section>

      {categories.map((category) => (
        <div key={category.id} className="section">
          <div className="section-header">
            <h2>{category.name}</h2>
            <Link href={`/category/${category.id}`}>lihat semua</Link>
          </div>

          <div className="product-grid">
            {category.products.map((p) => (
              <Link
                key={p.id}
                href={`/produk/${p.id}`}
                className="product-card"
              >
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="product-image object-cover"
                />
                <div className="product-info">
                  <p>{p.name}</p>
                  Rp{Number(p.price).toLocaleString("id-ID")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
