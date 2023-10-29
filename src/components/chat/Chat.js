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

  useEffect(() => {
    socket.on('get_public_all_messages', (allMessages) => {
      setRequests(allMessages);
    });
    socket.on('get_public_message', (message) => {
      setRequests((prevMessages) => [...prevMessages, message]);
    });
  }, []);

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
    console.log('updatedMessageInput: ', updatedMessageInput)
    setMessageInput(updatedMessageInput);
  };

  return (
    <div className={style.Chat}>
      <h2>Public Chat</h2>
      <div className={style.Chat_content} ref={messagesContainerRef}>
        {
          content && requests ? 
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
