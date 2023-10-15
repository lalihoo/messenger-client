import React, { useState } from "react";
import axios from "axios";

const MainChat = (props) => {
  const [message, setMessage] = useState("");
  const CHAT_ID = 1;
  const [messages, setMessages] = useState([]);

  // Обработчик для отправки сообщения
  const sendMessage = () => {
    const postData = {
      content: message,
      chat: CHAT_ID,
      sender: 1, // Замените на актуальный ID отправителя
    };

    // URL сервера, куда отправляем POST-запрос
    const serverUrl = "https://pleasing-hopefully-tetra.ngrok-free.app/api";

    // Выполняем POST-запрос
    axios
      .post(serverUrl + '/messages/', postData)
      .then((response) => {
        // Обработка успешного ответа от сервера, если необходимо
        console.log("Успешно отправлен POST-запрос", response.data);
        // Обновляем состояние, чтобы отразить новое сообщение в списке
        setMessages([...messages, response.data]);
        setMessage(""); // Очищаем поле ввода сообщения
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка при выполнении POST-запроса", error);
      });
  };

  return (
    <div className="main_chat">
      <div className="chat_information">
        <div className="chat_name">{props.chat_name}</div>
      </div>
      <div className="messages_container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.content}</p>
            <p>Отправлено: {message.created_at}</p>
          </div>
        ))}
      </div>
      <div className="message_input">
        <input
          type="text"
          placeholder="Введите сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default MainChat;
