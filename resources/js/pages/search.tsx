import { Link } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import "../styles/Search.css";

// Interface tidak perlu diubah
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface SearchProps {
  q: string;
  products: Product[];
}

// Terima 'props' secara utuh, lalu ambil 'products' saja di dalamnya
export default function SearchPage(props: SearchProps) {
  const { products } = props;
  const productList = products || [];

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-container">
        <h1 className="search-title">search</h1>

        {productList.length === 0 ? (
          <p className="no-results">Tidak ada produk ditemukan</p>
        ) : (
          <div className="product-grid">
            {productList.map((product) => (
              <Link
                key={product.id}
                href={`/produk/${product.id}`}
                className="product-card"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-info">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">
                    Rp{Number(product.price).toLocaleString("id-ID")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}