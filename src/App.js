import React, { useState } from 'react';
import './App.css';
import './css/main-chat.css'
import LeftMenu from './menu/LeftMenu';
import RegistrationForm from './Registration';
import AuthenticationForm from './Authentication';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(false);

  const handleSuccessfulAuthentication = (data) => {
    setAuthenticated(true);
    setUserData(data); // Устанавливаем данные в состояние
  }

  return (
    <div className="App">
      {authenticated ? (
        <>
        {console.log(userData)}
          <LeftMenu user_id={userData.data.user_id} username={userData.data.username}/>
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
