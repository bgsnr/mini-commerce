import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Search, User, ShoppingCart } from "lucide-react";
import "../styles/Navbar.css";
import Swal from "sweetalert2";

type InertiaProps = {
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
      role: string;
    } | null;
  };
};

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { props } = usePage<InertiaProps>();
  const user = props.auth?.user;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim() !== "") {
        router.get("/search", { q: query });
      }
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
  if (!user) {
    e.preventDefault(); // hentikan link default

    Swal.fire({
      icon: "warning",
      title: "Anda belum login!",
      text: "Silakan login terlebih dahulu untuk melihat keranjang.",
      showCancelButton: true,
      confirmButtonText: "Login Sekarang",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        router.visit("/login", {
          preserveScroll: true,
          preserveState: true,
        });
      }
    });
  }
};

  return (
    <header className="main-header">
      <Link href="/" preserveScroll preserveState className="logo">
        KULINERIA
      </Link>

      <div className="search-bar">
        <Search className="search-icon" size={20} color="#808080" />
        <nav>
          <input
            type="text"
            placeholder="Cari produk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </nav>
      </div>

      <nav className="header-nav">
        <Link href="/profile">
          <User size={24} color="white" />
        </Link>

        <Link href="/cart" onClick={handleCartClick}>
          <ShoppingCart size={24} color="white" />
        </Link>
      </nav>
    </header>
  );
}
