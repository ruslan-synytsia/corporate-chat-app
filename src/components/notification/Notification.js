import React from 'react';
import style from './Notification.module.css';

export const Notification = ({ notifications, userId }) => {
    const notification = notifications.find(notification => notification.userId === userId)
    if (notification && notification.countMessages !== 0) {
      return (
        <span className={style.Notification}>
          {notification.countMessages}
        </span>
      )
    }
}
