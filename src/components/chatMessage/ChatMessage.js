import React from 'react';
import style from './ChatMessage.module.css';

export const ChatMessage = ({ type, currentUser, messages, copyUsernameToInput }) => {
  let currentTimestamp = null;

  // Helpers
  // =============================================================================
  const timeToLocale = (timestamp) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  }

  const dateToLocale = (timestamp) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);
    const number = date.getDate();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${number} ${months[month]} ${year}, ${days[day]}`;
  }

  // Private chat option
  if (type === 'private') {
    return messages.map((message) => {
      const { timestamp, login, text } = message;

      const currentDate = dateToLocale(timestamp);

      const shouldRenderTimestamp = currentTimestamp !== currentDate;
      currentTimestamp = currentDate;

      if (shouldRenderTimestamp) {
        return (
          <div className={style.Message} key={timestamp}>
            <span className={style.Message_timestamp}>{currentTimestamp}</span>
            <div className={currentUser !== login ? style.Message_message_recipient : style.Message_message}>
              <span className={style.Message_message_time}>{timeToLocale(timestamp)}</span>
              {
                currentUser !== login ? <span>{login}</span> : null
              }
              {text}
            </div>
          </div>
        );
      } else {
        return (
          <div className={style.Message} key={timestamp}>
            <div className={currentUser !== login ? style.Message_message_recipient : style.Message_message}>
              <span className={style.Message_message_time}>{timeToLocale(timestamp)}</span>
              {
                currentUser !== login ? <span>{login}</span> : null
              }
              {text}
            </div>
          </div>
        );
      }
    });
  }

  // Public chat option =================
  if (type === 'public') {
    return messages.map((message) => {
      const { timestamp, login, recipient, text } = message;

      const currentDate = dateToLocale(timestamp);

      const shouldRenderTimestamp = currentTimestamp !== currentDate;
      currentTimestamp = currentDate;

      if (shouldRenderTimestamp) {
        return (
          <div className={style.Message} key={timestamp}>
            <span className={style.Message_timestamp}>{currentTimestamp}</span>
            <div className={currentUser !== login ? style.Message_message_recipient : style.Message_message}>
              <span className={style.Message_message_time}>{timeToLocale(timestamp)}</span>
              {
                currentUser !== login ? 
                  <span 
                    className={style.Message_message_user_recipient} 
                    onClick={() => copyUsernameToInput(login)}>
                      {login}
                    </span> 
                    : 
                    <span className={style.Message_message_user_me}>{login}</span>
              }
              <span 
                className={currentUser === recipient ? style.ChatMessage_me : null}
              >
                {text}
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div className={style.Message} key={timestamp}>
            <div className={currentUser !== login ? style.Message_message_recipient : style.Message_message}>
              <span className={style.Message_message_time}>{timeToLocale(timestamp)}</span>
              {
                currentUser !== login ? 
                  <span 
                    className={style.Message_message_user_recipient} 
                    onClick={() => copyUsernameToInput(login)}>
                      {login}
                    </span> 
                    : 
                    <span className={style.Message_message_user_me}>{login}</span>
              }
              <span 
                className={currentUser === recipient ? style.ChatMessage_me : null}
              >
                {text}
              </span>
            </div>
          </div>
        );
      }
    });
  }
}