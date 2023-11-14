import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketProvider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListUsers } from '../../redux-store/chatSlice';
import style from './ListUsers.module.css';
import { Room } from '../room/Room';
import { Notification } from '../notification/Notification';

export const ListUsers = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const content = useSelector((state) => state.chatData.content);
  const usersList = useSelector((state) => state.chatData.usersList);
  const [updatedUsersList, setUpdatedUsersList] = useState([]);
  const [onlineIds, setOnlineIds] = useState([]);
  const [favoriteUserIds, setFavoriteUserIds] = useState([]);
  const [users, setUsers] = useState([]);
  const [isRoomOpen, setRoomOpen] = useState(false);
  const [active, setActive] = useState('online');
  const [notifications, setNotifications] = useState([]); 

  useEffect(() => {
    const handleSetOnlineUserIds = (onlineUserIds) => {
      if (onlineUserIds.length > 0) {
        dispatch(fetchListUsers());
        setOnlineIds(onlineUserIds);
      }
    };

    const handleSetFavoriteUsersIds = (favoriteIds) => {
      if (favoriteIds.length > 0) {
        setFavoriteUserIds(favoriteIds)
      }
    };

    const handleNewPrivateMessageNotification = (notification) => {
      console.log('notification', notification);
    
      setNotifications(prevState => {
        // Создаем копию предыдущего состояния массива
        const updatedNotifications = [...prevState];
    
        // Ищем объект в массиве, у которого совпадают userId, roomId и recipientId
        const existingNotification = updatedNotifications.find(
          item => item.userId === notification.userId
            && item.roomId === notification.roomId
            && item.recipientId === notification.recipientId
        );
    
        if (existingNotification) {
          // Если существует, увеличиваем countMessages
          existingNotification.countMessages = notification.countMessages;
        } else {
          // В противном случае, добавляем новый объект в массив
          updatedNotifications.push(notification);
        }
    
        return updatedNotifications;
      });
    };    

    const handleAllPrivateMessageNotifications = (notifications) => {
      console.log(notifications)
      if (notifications.length > 0) {
        setNotifications(notifications)
      }
    };

    socket.on('set_online_user_ids', handleSetOnlineUserIds);
    socket.on('set_favorite_users_ids', handleSetFavoriteUsersIds);
    socket.on('set_new_private_message_notification', handleNewPrivateMessageNotification);
    socket.on('set_all_private_message_notifications', handleAllPrivateMessageNotifications);

    return () => {
      socket.off('set_online_user_ids', handleSetOnlineUserIds);
      socket.off('set_favorite_users_ids', handleSetFavoriteUsersIds);
      socket.off('set_new_private_message_notification', handleNewPrivateMessageNotification);
      socket.off('set_all_private_message_notifications', handleAllPrivateMessageNotifications);
    };
  }, []);

  useEffect(() => {
    if (onlineIds.length > 0) {
      setUpdatedUsersList(usersList)
    }
  }, [usersList]);

  useEffect(() => {
    if (active === 'online' && updatedUsersList.length > 0) {
      setOnline(updatedUsersList, onlineIds);
    }

    if (active === 'favorite' && updatedUsersList.length > 0) {
      const list = updatedUsersList.filter((user) => favoriteUserIds.includes(user._id));
      setUsers(list);
    }
  }, [updatedUsersList, favoriteUserIds, onlineIds]);

  useEffect(() => {
    if (active === 'all' && updatedUsersList.length > 0) {
      setAll(updatedUsersList)
    }
  }, [updatedUsersList, active]);

  useEffect(() => {
    if (active === 'online') {
      setOnline(updatedUsersList, onlineIds)
    }
    if (active === 'all') {
      dispatch(fetchListUsers());
    }
    if (active === 'favorite') {
      socket.emit('get_favorite_users_ids', content.userId)
    }
  }, [onlineIds, active]);

  const createConversation = (currentId, recipientId) => {
    socket.emit('join_to_private_room_with_recepient', { currentId, recipientId });
    socket.emit('reset_private_message_notification', { currentId, recipientId });
    setRoomOpen(true);
  }

  // Set functions
  // =====================================================================
  function setOnline(listUsers, idUsers) {
    const list = listUsers.filter((user) => idUsers.includes(user._id));
    setUsers(list);
  }

  function setAll(listUsers) {
    const list = listUsers.map((user) => user);
    setUsers(list);
  }

  return (
    <div className={style.ListUsers}>
      <Room isRoomOpen={isRoomOpen} setRoomOpen={setRoomOpen} />
      <h2>Connections</h2>
      <nav className={style.ListUsers_nav}>
        <ul>
          <li className={active === 'online' ? style.active : null} onClick={() => setActive('online')}>Online</li>
          <li className={active === 'all' ? style.active : null} onClick={() => setActive('all')}>All</li>
          <li className={active === 'favorite' ? style.active : null} onClick={() => setActive('favorite')}>Favorite</li>
        </ul>
      </nav>
      <ul className={style.ListUsers_list}>
        {content ? <li className={style.myself}>{`${content.username} ${content.last_name} (${content.login})`}</li> : null}
        {
          users.map(user => (
            content.userId !== user._id ?
              <li key={user._id}>
                <span>{`${user.login}`}</span>
                {console.log('notifications', notifications)}
                <Notification notifications={notifications} userId={user._id} />
                <span
                  className={style.send_message}
                  onClick={() => createConversation(content.userId, user._id)}
                >
                  Write me
                </span>
              </li>
              :
              null
          ))
        }
      </ul>
    </div>
  )
}
