import React, { useState, useEffect } from 'react';
import style from './Menu.module.css';
import myImage from '../../images/menu.svg';

export const Menu = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isChecked) {
      setShowMenu(true);
    } else {
      timeoutId = setTimeout(() => {
        setShowMenu(false);
      }, 750);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isChecked]);

  return (
    <div className={`${style.Menu} ${showMenu ? style.showMenu : ''}`}>
      <div className={style.Menu_button}></div>
      <input 
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        type="checkbox" 
      />
      <div className={style.Menu_icon}>
        <img src={myImage} alt="" />
      </div>
      <div className={style.Menu_content}>
        <ul>
          <li><button>Account</button></li>
          <li><button>Peaple</button></li>
          <li><button>Contacts</button></li>
          <li><button>Conversations</button></li>
          <li><button>Topics</button></li>
          <li><button>About</button></li>
        </ul>
      </div>
    </div>
  )
}
