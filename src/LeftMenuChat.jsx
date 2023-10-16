import React from "react";
import logo from './logo.svg';

const LeftMenuChat = (props) => {
  const handleChatClick = () => {
    // Вызываем функцию, переданную из родительского компонента, и передаем chat_id
    props.onChatClick(props.chat_id);
  }

  return (
    <div className="left_menu_chat" onClick={handleChatClick}>
      <div className="left_menu_chat_user_img_container">
        <img className="root_user_avatar" width={100} height={100} src={logo} alt="ava" />
      </div>
      <div className="left_menu_chat_user_name">
        {props.chat_name}
      </div>
    </div>
  )
}

export default LeftMenuChat;
