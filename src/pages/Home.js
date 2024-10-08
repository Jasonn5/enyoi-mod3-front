import React, { useState, useEffect } from 'react';
import { Slider } from 'primereact/slider';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import Navbar from '../components/Navbar';  
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import ApiFetch from '../services/api'; 

const Home = () => {
    const [hotels, setHotels] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([50, 300]);
    const [selectedRating, setSelectedRating] = useState(null);
    const navigate = useNavigate(); 

    const ratings = [
        { label: '4.5+', value: 4.5 },
        { label: '4.0+', value: 4.0 },
        { label: '3.5+', value: 3.5 },
        { label: '3.0+', value: 3.0 }
    ];

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await ApiFetch('/hotels', {
                    method: 'GET',
                });
                if (response.ok) {
                    setHotels(response.data); 
                } else {
                    console.error('Error al obtener los hoteles:', response.data);
                }
            } catch (error) {
                console.error('Error al obtener los hoteles:', error);
            }
        };

        fetchHotels();
    }, []); 

    const filteredHotels = hotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = parseInt(hotel.pricePerNight) >= priceRange[0] && parseInt(hotel.pricePerNight) <= priceRange[1];
        const matchesRating = selectedRating ? hotel.rating >= selectedRating : true;
        return matchesSearch && matchesPrice && matchesRating;
    });

    const handleCardClick = (hotelId) => {
        navigate(`/hotel/${hotelId}`);
    };

    return (
        <div>
            <Navbar />

            <div className="home-container">
                <div className="search-header">
                    <div className="background-image">
                        <h1>Find the perfect place to stay</h1>

                        <div className="filters-container">
                            <input
                                type="text"
                                className="search-box"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="price-slider">
                                <Slider
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.value)}
                                    range
                                    min={50}
                                    max={300}
                                />
                                <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                            </div>
                            <div className="rating-dropdown">
                                <Dropdown
                                    value={selectedRating}
                                    options={ratings}
                                    onChange={(e) => setSelectedRating(e.value)}
                                    placeholder="Rating"
                                />
                            </div>
                            <Button label="Search" icon="pi pi-search" className="p-button" />
                        </div>
                    </div>
                </div>

                <div className="hotels-grid">
                    {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                            <Card
                                key={hotel.id}
                                title={hotel.name}
                                subTitle={`${hotel.rating} reviews`}
                                className="p-card"
                                onClick={() => handleCardClick(hotel.id)}
                                style={{ cursor: 'pointer' }} 
                            >
                                <img src={hotel.imageUrl} alt={hotel.name} style={{ width: "100%", borderRadius: '8px' }} />
                                <div className="hotel-price">${hotel.pricePerNight}/night</div>
                            </Card>
                        ))
                    ) : (
                        <p>No hotels found matching your criteria.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
