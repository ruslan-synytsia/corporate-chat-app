import React, { useState, useEffect } from 'react';
import style from './Menu.module.css';
import arrow from '../../images/menu.svg';
import { ListUsers } from '../listUsers/ListUsers';

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
    <div className={style.Mobile_menu}>
      <input type='checkbox' />
      <div className={style.Mobile_menu_btn}>
        <img src={arrow} alt="" />
      </div>
      <div className={style.Mobile_menu_content}>
        <ListUsers />
      </div>
    </div>
  )
}
