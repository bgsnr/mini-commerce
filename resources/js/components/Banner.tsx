import React from "react";
import { Link } from "@inertiajs/react";
import "../styles/Banner.css";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  image_url: string;
};

export default function Banner({ products }: { products: Product[] }) {
  return (
    <div className="best-seller-banner">
      <div className="swiper flex gap-5 overflow-x-auto no-scrollbar">
        {products.map((item) => (
          <Link key={item.id} href={`/produk/${item.id}`} className="banner-card min-w-[250px] relative">
            <img
              src={item.image_url}
              alt={item.name}
              className="product-image object-cover"
            />
            <span className="product-name">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
