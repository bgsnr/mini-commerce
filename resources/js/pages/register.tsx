import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import "../styles/Auth.css";
import Swal from "sweetalert2";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/register", {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "Registrasi berhasil!",
        }).then(() => {
          router.visit("/login");
        });
      },
      onError: () => {
        Toast.fire({
          icon: "error",
          title: "Registrasi gagal! Cek data yang dimasukkan.",
        });
      },
    });
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-content">
        <div className="auth-container">
          <h2>registrasi</h2>
          <form onSubmit={handleSubmit}>
            <label>nama</label>
            <input
              type="text"
              placeholder="masukkan nama"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>email</label>
            <input
              type="email"
              placeholder="masukkan email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="buat password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-icon"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <label>konfirmasi password</label>
            <div className="password-field">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="ulangi password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="toggle-icon"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <p className="switch-text">
              sudah punya akun?{" "}
              <Link href="/login" className="link">
                login
              </Link>
            </p>

            <button
              type="submit"
              className="auth-btn"
              disabled={processing}
            >
              daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
