import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";

const MainChat = (props) => {
  const CHAT_ID = props.chat_id;
  const [messages, setMessages] = useState([]);
  const api_url = "https://pleasing-hopefully-tetra.ngrok-free.app/api";

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

  // Создайте портал для рендеринга в корневой элемент .App
  return ReactDOM.createPortal(
    <div className="main_chat">
      <div className="chat_information">
        <div className="chat_name">
          {props.chat_name}
        </div>
      </div>
      <div className="messages_container">
        {messages.map(message => (
          <div key={message.id} className="message">
            <p>{message.content}</p>
            <p>Отправлено: {message.created_at}</p>
          </div>
        ))}
      </div>
    </div>,
    document.getElementById("portal-root") // Указать ID корневого элемента, куда нужно рендерить
  );
}

export default MainChat;

