import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';  
import { jwtDecode } from 'jwt-decode' 

import '../styles/Login.css';

const Login = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate(); 
    const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;

    const handleLogin = async () => {
        setErrorMessage(''); 

        if (email && password) {
            try {
                const response = await fetch(loginUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();                    
                    localStorage.setItem('authToken', data.token); 
                    const decodedToken = jwtDecode(data.token);
                    localStorage.setItem('userRole', decodedToken.role);

                    navigate('/');
                } else {
                    setErrorMessage('Credenciales incorrectas, intenta nuevamente.');
                }
            } catch (error) {
                console.error('Error al intentar iniciar sesión:', error);
                setErrorMessage('Error en la conexión. Intenta de nuevo.');
            }
        } else {
            setErrorMessage('Por favor, completa todos los campos.');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            
            <div className="input-container">
                <label htmlFor="email">Correo electrónico</label>
                <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
    
            <div className="input-container">
                <label htmlFor="password">Contraseña</label>
                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
            </div>
    
            <Button label="Iniciar sesión" onClick={handleLogin} className="p-button-rounded p-button-orange" />
            
            <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
        </div>
    );
    
};

export default Login;
