import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../context/SocketProvider';
import { useSelector } from 'react-redux';
import { ChatMessage } from '../chatMessage/ChatMessage';
import style from './Room.module.css';

export const Room = ({ isRoomOpen, setRoomOpen }) => {
  const messagesContainerRef = useRef(null);
  const content = useSelector((state) => state.chatData.content);

  const [newMessage, setNewMessage] = useState({
    roomId: null,
    userId: null,
    login: null,
    text: '',
    recipient: null
  });
  const [messages, setMessages] = useState([]);
  const [isDownloaded, setDownloaded] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    socket.on('get_private_room_data', room => {
      setNewMessage((prevState) => ({ ...prevState, roomId: room._id }));
    });

    socket.on('get_all_private_room_messages', messages => {
      console.log(messages)
      setMessages(messages);
      setDownloaded(true);
    });

    socket.on('get_new_private_message', message => {
      console.log('get_new_private_message', message)
      setMessages((prevState) => ([ ...prevState, message ]));
    });

    // Return a function to clear the listener when unmounted
    return () => {
      socket.off('get_private_room_data');
      socket.off('get_all_private_room_messages');
      socket.off('get_new_private_message');
    }
  });

  useEffect(() => {
    if (content) {
      setNewMessage((prevState) => ({ ...prevState, userId: content.userId, login: content.login }));
    }
  }, [content]);

  useEffect(() => {
    // We track updates in the array of messages (requests) and scroll down
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [isDownloaded, messages]);

  const sendMessage = () => {
    socket.emit('set_new_private_message', newMessage);
    setNewMessage((prevState) => ({ ...prevState, text: '', recipient: null }));
  };

  const closeModal = () => {
    setRoomOpen(false);
    setDownloaded(false);
  };

  return (
    isRoomOpen && (
      <div className={style.room_overlay}>
        <div className={style.room_content}>
          <div className={style.room_window} ref={messagesContainerRef}>
            { messages ? <ChatMessage type={'private'} currentUser={content.login} messages={messages} /> : null }
          </div>
          <div className={style.room_input}>
            <input
              type="text"
              placeholder='Enter Your Message'
              onChange={e => setNewMessage((prevState) => ({ ...prevState, text: e.target.value }))}
              value={newMessage.text}
            />
          </div>
          <div className={style.room_btn}>
            <button onClick={sendMessage}>Send</button>
          </div>
          <button className={style.room_close} onClick={closeModal}>Close</button>
        </div>
      </div>
    )
  );
};