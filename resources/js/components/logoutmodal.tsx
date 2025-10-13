import React from "react";
import "../styles/LogoutModal.css";

interface LogoutModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ show, onConfirm, onCancel }: LogoutModalProps) {
  if (!show) return null;

  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <p className="logout-title">yakin ingin keluar?</p>
        <div className="logout-buttons">
          <button onClick={onConfirm} className="btn-yes">Ya</button>
          <button onClick={onCancel} className="btn-no">Tidak</button>
        </div>
      </div>
    </div>
  );
}
