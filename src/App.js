import React, { useState } from 'react';
import './App.css';
import './css/main-chat.css'
import LeftMenu from './menu/LeftMenu';
import RegistrationForm from './Registration';
import AuthenticationForm from './Authentication';
import axios from 'axios';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(false);
  const api_url = "https://pleasing-hopefully-tetra.ngrok-free.app/api";
  const handleSuccessfulAuthentication = (data, fromAuth = false) => {
    setAuthenticated(true);
    if (fromAuth === false) {
      setUserData(data); // Устанавливаем данные в состояние
    } else {  
      // Выполняем запрос к API
      axios.get(api_url + '/get_user_data/')
        .then(response => {
          // Обрабатываем успешный ответ от API и устанавливаем данные в состояние
          setUserData(response.data);
        })
        .catch(error => {
          // Обрабатываем ошибку, если запрос к API не удался
          console.error("Ошибка при запросе к API:", error);
        });
    }
  };

  return (
    <div className="App">
      {authenticated ? (
        <>
          <LeftMenu user_id={userData.user_id} username={userData.username}/>
          <div className='main-chat-container' id="portal-root">
          </div>
        </>
      ) : (
        <>
          <RegistrationForm onSuccessfulAuthentication={handleSuccessfulAuthentication} />
          <AuthenticationForm onSuccessfulAuthentication={handleSuccessfulAuthentication}/>
        </>
      )}
    </div>
  );
}

export default App;
