import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const signupUrl = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;

  const handleRegister = async () => {
    setErrorMessage('');
    
    if (email && password) {
      try {
        const response = await fetch(signupUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
          alert("Registro Realizado con Exito")
          navigate('/login'); 
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Error al registrar');
        }
      } catch (error) {
        setErrorMessage('Error en la conexión. Intenta de nuevo.');
      }
    } else {
      setErrorMessage('Todos los campos son obligatorios.');
    }
  };

  return (
    <div className="register-container">
      <h1>Regístrate</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="input-container">
        <label htmlFor="email">Correo electrónico</label>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="password">Contraseña</label>
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false} 
        />
      </div>

      <Button label="Registrarse" className="p-button" onClick={handleRegister} />

      <p>
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Register;
