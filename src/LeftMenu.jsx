import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import LeftMenuChat from "./LeftMenuChat";
import MainChat from "./MainChat";

const LeftMenu = (props) => {
    const [chats, setChats] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [selectedChatName, setSelectedChatName] = useState(null);

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

    const handleChatClick = (chatId, chatName) => {
        setSelectedChatId(chatId);
        setSelectedChatName(chatName);
    }

    return (
        <div className="left-menu">
            <div className="left-menu-info">
                <div className='current-user-information'>
                    <div className='current-user-profile-image-container'>
                        <img className='currentu-user-profile-image' alt="avatar" width={100} height={100} src={logo}></img>
                    </div>
                    <div className='current-user-profile-name'>
                        Name__TEST
                    </div>
                </div>
            </div>
            <div className="chats-container">
                {chats.map(chat => (
                    <LeftMenuChat key={chat.id} chat_id={chat.id} chat_name={chat.name} onChatClick={handleChatClick} />
                ))}
            </div>
            {selectedChatId && selectedChatName && <MainChat chat_name={selectedChatName} chat_id={selectedChatId} />}
        </div>
    );
}

export default LeftMenu;
