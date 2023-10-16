import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import LeftMenuChat from "./LeftMenuChat";
import MainChat from "./MainChat"; 

const LeftMenu = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const USER_ID = 1;
  const api_url = "https://pleasing-hopefully-tetra.ngrok-free.app/api";

  useEffect(() => {
    axios.get(api_url + "/chats/")
      .then(response => {
        const filteredChats = response.data.filter(chat => chat.participants.includes(USER_ID));
        setChats(filteredChats);
      })
      .catch(error => {
        console.error('Ошибка при получении данных с сервера:', error);
      });
  }, []);

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  }

  return (
    <div className="left-menu">
      <div className="chats-container">
        {chats.map(chat => (
          <LeftMenuChat key={chat.id} chat_id={chat.id} chat_name={chat.name} onChatClick={handleChatClick} />
        ))}
      </div>
      {selectedChatId && <MainChat chat_id={selectedChatId} />}
    </div>
  );
}

export default LeftMenu;
