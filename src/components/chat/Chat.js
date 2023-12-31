import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../context/SocketProvider';
import style from './Chat.module.css';
import { useSelector } from 'react-redux';
import { ChatMessage } from '../chatMessage/ChatMessage';
import { Waiting } from '../waiting/Waiting';

export const Chat = () => {
  const messagesContainerRef = useRef(null);
  const content = useSelector((state) => state.chatData.content);
  const socket = useSocket();

  const [requests, setRequests] = useState([]);
  const [messageInput, setMessageInput] = useState({
    roomId: null,
    userId: null,
    login: null,
    text: '',
    recipient: null
  });

  useEffect(() => {
    const handleGetPublicAllMessages = (allMessages) => {
      setRequests(allMessages);
    };
  
    const handleGetPublicMessage = (message) => {
      setRequests((prevMessages) => [...prevMessages, message]);
    };
  
    socket.on('get_public_all_messages', handleGetPublicAllMessages);
    socket.on('get_public_message', handleGetPublicMessage);

    return () => {
      socket.off('get_public_all_messages', handleGetPublicAllMessages);
      socket.off('get_public_message', handleGetPublicMessage);
    };
  }, []);

  useEffect(() => {
    // We track updates in the array of messages (requests) and scroll down
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [requests]);

  useEffect(() => {
    if (content) {
      setMessageInput((prevState) => ({ ...prevState, userId: content.userId, login: content.login }));
    }
  }, [content])

  const sendMessage = () => {
    socket.emit('save_public_message', messageInput);
    setMessageInput((prevState) => ({
      ...prevState,
      text: '',
      recipient: null
    }));
  };

  // Helpers
  // =============================================================================
  const copyUsernameToInput = (login) => {
    const updatedMessageInput = { ...messageInput, text: `${login}, `, recipient: login };
    setMessageInput(updatedMessageInput);
  };

  return (
    <div className={style.Chat}>
      <h2>Public Chat</h2>
      <div className={style.Chat_content} ref={messagesContainerRef}>
        {
          content && requests.length !== 0 ? 
            <ChatMessage 
              type={'public'} 
              currentUser={content.login} 
              messages={requests}
              copyUsernameToInput={copyUsernameToInput}
            /> 
          : 
          <Waiting />
        }
      </div>
      <input
          className={style.Chat_input}
          type="text"
          value={messageInput.text}
          onChange={(e) => setMessageInput((prevState) => ({ ...prevState, text: e.target.value }))}
          placeholder='Your message...'
        />
      <button className={style.Chat_button} onClick={sendMessage}>Send</button>
    </div>
  );
}
