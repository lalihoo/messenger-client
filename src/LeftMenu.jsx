import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import LeftMenuChat from "./LeftMenuChat";



const LeftMenu = () => {
    const [chats, setChats] = useState([]);

    const USER_ID = 1;
    const api_url = "https://pleasing-hopefully-tetra.ngrok-free.app/api"

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


    return (
        <div className="left-menu">
            <div className="root_user_information_container">
                <div className="root_user_avatar_container">
                    <img className="root_user_avatar" width={100} height={100} src={logo} alt="ava" />
                </div>
                <div className="search_container">
                    <input className="chat_search_input"></input>
                </div>
            </div>
            <div className="chats-container">
                {chats.map(chat => (
                    <LeftMenuChat chat_name={chat.name}></LeftMenuChat>
                ))}
            </div>
        </div>
    );
}

export default LeftMenu;