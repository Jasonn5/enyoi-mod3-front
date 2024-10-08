import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import Navbar from '../components/Navbar';
import '../styles/AddHotel.css';
import ApiFetch from '../services/api';

const AddHotel = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState(''); 
    const [pricePerNight, setPricePerNight] = useState(0);
    const [rating, setRating] = useState(0);
    const [imageUrl, setImageUrl] = useState(''); 
    const [amenities, setAmenities] = useState('');
    const [cancellationPolicy, setCancellationPolicy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !address || !pricePerNight || !rating || !imageUrl || !amenities || !cancellationPolicy) {
            setErrorMessage('Por favor, completa todos los campos');
            return;
        }

        try {
            const response = await ApiFetch('/hotels', {
                method: 'POST',
                body: {
                    name,
                    address, 
                    pricePerNight,
                    rating,
                    imageUrl,
                    amenities,
                    cancellationPolicy,
                },
            });

            if (response.ok) {
                navigate('/'); 
            } else {
                setErrorMessage('Error al añadir el hotel. Intenta nuevamente.');
            }
        } catch (error) {
            setErrorMessage('Hubo un error en la conexión. Intenta de nuevo.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="add-hotel-container">
                <h1>Añadir nuevo hotel</h1>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nombre del Hotel</label>
                        <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del Hotel" />
                    </div>

                    <div className="input-group">
                        <label>Dirección</label>
                        <InputText value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Dirección" />
                    </div>

                    <div className="input-group">
                        <label>Precio por Noche</label>
                        <InputNumber value={pricePerNight} onValueChange={(e) => setPricePerNight(e.value)} min={50} max={1000} mode="currency" currency="USD" placeholder="Precio por noche" />
                    </div>

                    <div className="input-group">
                        <label>Calificación (Rating)</label>
                        <InputNumber value={rating} onValueChange={(e) => setRating(e.value)} min={1} max={5} placeholder="Calificación" />
                    </div>

                    <div className="input-group">
                        <label>Amenities</label>
                        <InputText value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="Amenidades" />
                    </div>

                    <div className="input-group">
                        <label>Política de Cancelación</label>
                        <InputText value={cancellationPolicy} onChange={(e) => setCancellationPolicy(e.target.value)} placeholder="Política de Cancelación" />
                    </div>

                    <div className="input-group">
                        <label>URL de Imagen</label>
                        <InputText value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="URL de la imagen del hotel" />
                    </div>

                    <Button type="submit" label="Añadir Hotel" className="p-button" />
                </form>
            </div>
        </div>
    );
};

export default AddHotel;
