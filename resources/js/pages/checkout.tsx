import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import '../styles/Checkout.css';

export default function Checkout() {
    const { data, setData, post, processing, errors } = useForm({
        recipient_name: '',
        recipient_phone: '',
        address_line_1: '',
        address_line_2: '',
        postal_code: '',
        notes: '',
        payment_method: 'cash',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };

    return (
        <>
            <Head title="Checkout" />
            <Navbar />
            <div className="checkout-page-background">
                <div className="checkout-container">
                    <h1 className="checkout-title">checkout</h1>
                    <form onSubmit={handleSubmit}>
                        <h2 className="form-section-title">Alamat</h2>
                        
                        <div className="form-group">
                            <label htmlFor="recipient_name" className="form-label">nama lengkap</label>
                            <input
                                id="recipient_name"
                                type="text"
                                className="form-input"
                                placeholder="nama lengkap"
                                value={data.recipient_name}
                                onChange={e => setData('recipient_name', e.target.value)}
                            />
                            {errors.recipient_name && <div className="error">{errors.recipient_name}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="recipient_phone" className="form-label">kontak</label>
                            <input
                                id="recipient_phone"
                                type="text"
                                className="form-input"
                                placeholder="nomor telpon"
                                value={data.recipient_phone}
                                onChange={e => setData('recipient_phone', e.target.value)}
                            />
                            {errors.recipient_phone && <div className="error">{errors.recipient_phone}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address_line_1" className="form-label">alamat lengkap</label>
                            <input
                                id="address_line_1"
                                type="text"
                                className="form-input"
                                placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan"
                                value={data.address_line_1}
                                onChange={e => setData('address_line_1', e.target.value)}
                            />
                            {errors.address_line_1 && <div className="error">{errors.address_line_1}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="address_line_2" className="form-label">alamat detail</label>
                            <input
                                id="address_line_2"
                                type="text"
                                className="form-input"
                                placeholder="Gedung, No. Rumah, Blok, Patokan"
                                value={data.address_line_2}
                                onChange={e => setData('address_line_2', e.target.value)}
                            />
                            {errors.address_line_2 && <div className="error">{errors.address_line_2}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code" className="form-label">kode pos</label>
                            <input
                                id="postal_code"
                                type="text"
                                className="form-input"
                                placeholder="kode pos"
                                value={data.postal_code}
                                onChange={e => setData('postal_code', e.target.value)}
                            />
                            {errors.postal_code && <div className="error">{errors.postal_code}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="notes" className="form-label">keterangan</label>
                            <input
                                id="notes"
                                type="text"
                                className="form-input"
                                placeholder="keterangan pesanan"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                            />
                            {errors.notes && <div className="error">{errors.notes}</div>}
                        </div>

                        <h2 className="form-section-title">Pembayaran</h2>
                        <div className="form-group">
                            <select 
                                id="payment_method" 
                                className="form-input"
                                value={data.payment_method} 
                                onChange={e => setData('payment_method', e.target.value)}
                            >
                                <option value="cash">Cash</option>
                            </select>
                        </div>

                        <button type="submit" className="submit-btn" disabled={processing}>
                            buat pesanan
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}