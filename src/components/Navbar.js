import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Navbar.css';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const menu = useRef(null); 
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole'); 
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/login'); 
    };

    const items = !isAuthenticated
        ? [{ label: 'Iniciar sesión', icon: 'pi pi-sign-in', command: () => navigate('/login') }]
        : userRole === 'admin'
        ? [
              { label: 'Añadir Hotel', icon: 'pi pi-plus', command: () => navigate('/add-hotel') },
              { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: handleLogout },
          ]
        : [
              { label: 'Ver reservas', icon: 'pi pi-calendar', command: () => navigate('/reservations') },
              { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: handleLogout },
          ];

    return (
        <div className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                TravelEase
            </div>
            <div className="navbar-user-icon">
                <i
                    className="pi pi-user"
                    style={{ fontSize: '2rem', color: '#f97316' }}
                    onClick={(e) => menu.current.toggle(e)} 
                ></i>
                <Menu model={items} popup ref={menu} />
            </div>
        </div>
    );
};

export default Navbar;
