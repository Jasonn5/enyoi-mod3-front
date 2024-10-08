import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiFetch from '../services/api'; 

const HotelDetails = () => {
    const hotelId= useParams()["id"];
    console.log(hotelId)
    const [hotel, setHotel] = useState(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await ApiFetch(`/hotels/${hotelId}`, { method: 'GET' });
                if (response.ok) {
                    setHotel(response.data);
                } else {
                    console.error('Error al obtener los detalles del hotel:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener los detalles del hotel:', error);
            }
        };

        fetchHotelDetails();
    }, [hotelId]);

    if (!hotel) {
        return <div>Cargando detalles del hotel...</div>;
    }

    return (
        <div>
            <h1>{hotel.name}</h1>
            <p>{hotel.address}</p>
            <p>Precio por noche: ${hotel.pricePerNight}</p>
            <p>Rating: {hotel.rating}</p>
            <img src={hotel.imageUrl} alt={hotel.name} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
    );
};

export default HotelDetails;
