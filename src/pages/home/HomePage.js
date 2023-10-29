import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchChatData } from '../../redux-store/chatSlice';
import { fetchListUsers } from '../../redux-store/chatSlice';
import { setAccessFromComp } from '../../redux-store/authSlice';
import { useSocket } from '../../context/SocketProvider';
import style from './HomePage.module.css';
// import { Menu } from '../../components/menu/Menu';
import { Chat } from '../../components/chat/Chat';
import { ListUsers } from '../../components/listUsers/ListUsers';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();
  const { loading, accessData, content } = useSelector((state) => state.chatData);
  const { accessAuth } = useSelector((state) => state.authData);

  const [data, setData] = useState({
    username: null,
    last_name: null,
    login: null,
    email: null
  })

  useEffect(() => {
    console.log('Home Page')
    dispatch(fetchChatData());
    dispatch(fetchListUsers());
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(setAccessFromComp(accessData))
  }, [accessData]);

  useEffect(() => {
    if (!accessAuth && !loading) {
      navigate('/')
    }
  }, [accessAuth]);

  useEffect(() => {
    if (content) {
      setData({
        username: content.username,
        last_name: content.last_name,
        login: content.login,
        email: content.email
      });
      socket.emit('setUserId', content.userId);
    }
  }, [content]);

  return (
    <div className={style.Home_page}>
      {/* <Menu /> */}
      <div className={style.Home_page_col_1}>
        <div className={style.content}>
          <Chat />
        </div>
      </div>
      <div className={style.Home_page_col_2}>
        <div className={style.content}>
          <ListUsers />
        </div>
      </div>
    </div>
  )
}
