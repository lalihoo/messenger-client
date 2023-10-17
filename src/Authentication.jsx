import React, { useState } from 'react';
import axios from 'axios';

const Authentication = ({ onSuccessfulAuthentication }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const api_url = "https://pleasing-hopefully-tetra.ngrok-free.app/api";
    const handleAuthentication = async () => {
        try {
            const response = await axios.post(
                `${api_url}/auth/`,
                `username=${username}&password=${password}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    withCredentials: true, // Отправка cookies с запросом
                }
            );
            // Обработка успешной аутентификации
            console.log('Authentication successful', response.data);

            // Вызываем функцию для обработки успешной аутентификации
            onSuccessfulAuthentication(response.data);
        } catch (error) {
            // Обработка ошибки аутентификации
            console.error('Authentication failed', error.response.data);
        }
    };


    return (
        <div>
            <h2>Authentication</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuthentication}>Authenticate</button>
        </div>
    );
};

export default Authentication;
