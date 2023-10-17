import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import '../css/main-chat.css'

const MainChat = (props) => {
  const CHAT_ID = props.chat_id;
  const [messages, setMessages] = useState([]);
  const api_url = "https://pleasing-hopefully-tetra.ngrok-free.app/api";

  // Функция для форматирования даты и времени
  const formatDateTime = (isoDate) => {
    const dateTime = new Date(isoDate);
    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    return `${day}.${month} ${hours}:${minutes}`;
  }

  useEffect(() => {
    axios.get(api_url + '/messages/')
      .then(response => {
        const filteredMessages = response.data.filter(message => message.chat === CHAT_ID);
        setMessages(filteredMessages);
      })
      .catch(error => {
        console.error('Ошибка при получении данных с сервера:', error);
      });
  }, [CHAT_ID]);

  return ReactDOM.createPortal(
    <div className="main_chat">
      <div className="chat_information">
        <div className="chat_name">
          {props.chat_name}
        </div>
      </div>
      <div className="messages_container">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender === props.user_id ? 'usermessage' : ''}`}
          >
            <p className="message_text">{message.content}</p>
            <p className="message_data">{formatDateTime(message.created_at)}</p>
          </div>
        ))}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
}

export default MainChat;
