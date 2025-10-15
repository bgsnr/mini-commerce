import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import Navbar from "../components/Navbar";
import LogoutModal from "../components/logoutmodal";
import "../styles/Profile.css";

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

export default function Profile() {
  const { props } = usePage<InertiaProps>();
  const user = props.auth?.user;
  const { post } = useForm();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    post("/logout");
    setShowModal(false);
  };

  if (!user) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="not-logged-in">
          <h3>kamu belum login</h3>
          <p>silakan login dulu untuk melihat profilmu.</p>
          <button className="login-btn" onClick={() => router.visit("/login")}>
            log in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <h2>profil</h2>

        <label>nama</label>
        <input type="text" value={user.name} readOnly />

        <label>email</label>
        <input type="text" value={user.email} readOnly />

        <button onClick={() => setShowModal(true)} className="logout-btn">
          log out
        </button>

        <LogoutModal
          show={showModal}
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
