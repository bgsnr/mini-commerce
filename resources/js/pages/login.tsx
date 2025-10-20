import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import "../styles/Auth.css";
import Swal from "sweetalert2";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/login", {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "Login berhasil!",
          timer: 1500,
          timerProgressBar: true,
        });
      },
      onError: () => {
        Toast.fire({
          icon: "error",
          title: "Login gagal!",
          text: "Cek email dan passwordmu.",
        });
      },
    });
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-content">
        <div className="auth-container">
          <h2>login</h2>
          <form onSubmit={handleSubmit}>
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
                placeholder="masukkan password"
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
            {errors.password && <p className="error">{errors.password}</p>}

            <p className="switch-text">
              belum memiliki akun?{" "}
              <Link href="/register" className="link">
                registrasi
              </Link>
            </p>

            <button type="submit" className="auth-btn" disabled={processing}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
